import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app


def send_otp_email(to_email, otp):
    msg = MIMEMultipart()
    msg["From"] = current_app.config["EMAIL_ADDRESS"]
    msg["To"] = to_email
    msg["Subject"] = "Your Login OTP"

    body = f"""
Your OTP for login is: {otp}

This OTP is valid for 5 minutes.
Do not share it with anyone.
"""
    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP(
        current_app.config["EMAIL_HOST"],
        current_app.config["EMAIL_PORT"]
    )
    server.starttls()
    server.login(
        current_app.config["EMAIL_ADDRESS"],
        current_app.config["EMAIL_PASSWORD"]
    )
    server.send_message(msg)
    server.quit()
