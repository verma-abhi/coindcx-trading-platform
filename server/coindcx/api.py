from fastapi import APIRouter
import httpx
from pydantic import BaseModel

import hashlib
import hmac
import time
import json
import os

from dotenv import load_dotenv

load_dotenv()


router = APIRouter()

class TradeRequest(BaseModel):
    side: str  # 'buy' or 'sell'
    market: str  # e.g. 'BTCINR'
    price: float
    quantity: float
    order_type: str  # 'limit' or 'market'


def get_headers(payload):
    timestamp = int(round(time.time() * 1000))
    payload["timestamp"] = timestamp
    body = json.dumps(payload, separators=(",", ":"))
    signature = hmac.new(
        os.getenv("API_SECRET").encode(),
        body.encode(),
        hashlib.sha256
    ).hexdigest()

    headers = {
        "X-AUTH-APIKEY": os.getenv("API_KEY"),
        "X-AUTH-SIGNATURE": signature,
        "X-AUTH-TIMESTAMP": str(timestamp),
        "Content-Type": "application/json"
    }
    return headers, body


@router.get("/health")
async def health_check():
    return {"status": "running"}


@router.get("/balance")
async def get_balance():
    
    payload={}
    headers, body = get_headers(payload)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/users/balances", headers=headers)
    return response.json()

@router.post("/trade")
async def place_order(req: TradeRequest):
    payload = {
        "market": req.market,
        "side": req.side,
        "order_type": req.order_type,
        "price_per_unit": req.price,
        "total_quantity": req.quantity
    }

    headers, body = get_headers(payload)

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.coindcx.com/exchange/v1/orders/create", json=payload, headers=headers)
    return response.json()

@router.get("/orders/open")
async def open_orders():
    payload={}
    headers, body = get_headers(payload)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/orders/active_orders", headers=headers)
    return response.json()

class CancelRequest(BaseModel):
    order_id: str

@router.post("/orders/cancel")
async def cancel_order(req: CancelRequest):
    payload = {id : req.order_id}
    headers, body = get_headers(payload)
    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.coindcx.com/exchange/v1/orders/cancel", json={"id": req.order_id}, headers=headers)
    return response.json()

@router.get("/orders/history")
async def order_history():
    payload = {"limit": 10}
    headers, body = get_headers(payload)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/orders", headers=headers)
    return response.json()
