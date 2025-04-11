from fastapi import FastAPI
from coindcx.api import router as trading_router

app = FastAPI()
app.include_router(trading_router)
