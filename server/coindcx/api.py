from fastapi import APIRouter
import httpx, os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "running"}

