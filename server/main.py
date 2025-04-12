from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from coindcx.api import router  # Assuming your routes are defined in api.py

app = FastAPI()

# Allow frontend origin
origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # or ["*"] for all origins (less secure)
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allow all headers
)

app.include_router(router)