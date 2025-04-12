
from dotenv import load_dotenv

import hashlib
import hmac
import time
import json
import os

load_dotenv(dotenv_path=".env")

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