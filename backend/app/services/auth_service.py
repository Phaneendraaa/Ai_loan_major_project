import random
from app.utils.email_utils import send_otp_email

FAKE_USER_DB = {
    "9063454476": "vamshijoshi25@gmail.com",
    "9123456789": "cgoud129@gmail.com"
}

OTP_STORE = {}


def verify_phone_and_generate_otp(phone):
    if str(phone) not in FAKE_USER_DB:
        return {
            "success": False,
            "message": "Phone number not found"
        }

    otp = str(random.randint(100000, 999999))
    email = FAKE_USER_DB[phone]

    OTP_STORE[phone] = otp

    send_otp_email(email, otp)

    return {
        "success": True,
        "email": email
    }


def verify_otp(phone, otp):
    stored_otp = OTP_STORE.get(phone)

    if stored_otp and stored_otp == otp:
        del OTP_STORE[phone]
        return True

    return False
