from flask import Blueprint, request, jsonify
from app.controllers.auth_controller import (
    login_number_verify_controller,
    login_otp_verify_controller
)

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login-number-verify", methods=["POST"])
def login_number_verify():
    data = request.get_json()
    return login_number_verify_controller(data)


@auth_bp.route("/login-otp-verify", methods=["POST"])
def login_otp_verify():
    data = request.get_json()
    return login_otp_verify_controller(data)
