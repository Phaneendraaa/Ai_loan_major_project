import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Config:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # Email (SMTP - Gmail)
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    # OTP
    OTP_EXPIRY_SECONDS = 300  # 5 minutes
