import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loginOtpVerify } from "../api/authApi";

const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const phone = location.state?.phone;
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    try {
      await loginOtpVerify(phone, otp);
      setStatus("Login successful");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    }
  };

  if (!phone || !email) {
    return <p>Invalid access</p>;
  }

  return (
    <div className="container">
      <h2>Verify OTP</h2>

      {/* ✅ REQUIRED MESSAGE */}
      <p className="info">
        OTP sent to registered email: <strong>{email}</strong>
      </p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
        />

        <button type="submit">Verify OTP</button>
      </form>

      {status && <p className="success">{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginOtp;
