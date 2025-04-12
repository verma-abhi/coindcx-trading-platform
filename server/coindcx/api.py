from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import hashlib
import hmac
import time
import json

router = APIRouter()

class LoginRequest(BaseModel):
    apiKey: str
    apiSecret: str

class TradeRequest(BaseModel):
    side: str
    market: str
    price: float
    quantity: float
    order_type: str

class CancelRequest(BaseModel):
    order_id: str

def get_headers(payload, api_key, api_secret):
    timestamp = int(round(time.time() * 1000))
    payload["timestamp"] = timestamp
    body = json.dumps(payload, separators=(",", ":"))

    signature = hmac.new(
        api_secret.encode(),
        body.encode(),
        hashlib.sha256
    ).hexdigest()

    headers = {
        "X-AUTH-APIKEY": api_key,
        "X-AUTH-SIGNATURE": signature,
        "X-AUTH-TIMESTAMP": str(timestamp),
        "Content-Type": "application/json"
    }

    return headers, body

@router.post("/auth/verify")
async def verify_user(req: LoginRequest):
    payload = {}
    headers, _ = get_headers(payload, req.apiKey, req.apiSecret)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/users/balances", headers=headers)

    # if response.status_code == 200:
    #     return {"message": "Login successful"}
    # else:
    #     raise HTTPException(status_code=401, detail="Invalid API Key or Secret")

@router.get("/health")
async def health_check():
    return {"status": "running"}

@router.get("/balance")
async def get_balance(api_key: str, api_secret: str):
    payload = {}
    headers, _ = get_headers(payload, api_key, api_secret)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/users/balances", headers=headers)
    return response.json()

@router.post("/trade")
async def place_order(req: TradeRequest, api_key: str, api_secret: str):
    payload = {
        "market": req.market,
        "side": req.side,
        "order_type": req.order_type,
        "price_per_unit": req.price,
        "total_quantity": req.quantity
    }

    headers, _ = get_headers(payload, api_key, api_secret)

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.coindcx.com/exchange/v1/orders/create", json=payload, headers=headers)
    return response.json()

@router.get("/orders/open")
async def open_orders(api_key: str, api_secret: str):
    payload = {}
    headers, _ = get_headers(payload, api_key, api_secret)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/orders/active_orders", headers=headers)
    return response.json()

@router.post("/orders/cancel")
async def cancel_order(req: CancelRequest, api_key: str, api_secret: str):
    payload = {"id": req.order_id}
    headers, _ = get_headers(payload, api_key, api_secret)

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.coindcx.com/exchange/v1/orders/cancel", json=payload, headers=headers)
    return response.json()

@router.get("/orders/history")
async def order_history(api_key: str, api_secret: str):
    payload = {"limit": 10}
    headers, _ = get_headers(payload, api_key, api_secret)

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.coindcx.com/exchange/v1/orders", headers=headers)
    return response.json()