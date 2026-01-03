from flask import jsonify
from app.services.auth_service import (
    verify_phone_and_generate_otp,
    verify_otp
)


def login_number_verify_controller(data):
    phone = data.get("phone")
    print("Type of phone num",type(phone))
    if not phone:
        return jsonify({"error": "Phone number is required"}), 400

    result = verify_phone_and_generate_otp(phone)

    if not result["success"]:
        return jsonify({"error": result["message"]}), 404

    return jsonify({
        "message": "OTP sent to registered email",
        "email": result["email"]
    }), 200


def login_otp_verify_controller(data):
    phone = data.get("phone")
    otp = data.get("otp")

    if not phone or not otp:
        return jsonify({"error": "Phone and OTP are required"}), 400

    if verify_otp(phone, otp):
        return jsonify({"status": "OK"}), 200

    return jsonify({"error": "Invalid OTP"}), 401
