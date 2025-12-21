import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser, sendOtp, verifyOtp } from "../../services/authService";
import "./Login.css";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Add +91 before sending to backend
  const fullMobile = `+91${mobile}`;

  const handleSendOtp = async () => {
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await checkUser(fullMobile);
      if (!res.data.exists) {
        setError("User not registered, please register");
        return;
      }

      await sendOtp(fullMobile);
      setOtpSent(true);
    } catch (err) {
      setError("Unable to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp(fullMobile, otp);
      navigate("/home");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <div className="mobile-input">
        <span className="country-code">+91</span>
        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          maxLength={10}
          disabled={otpSent}
        />
      </div>

      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
        />
      )}

      {error && <p className="error">{error}</p>}

      {!otpSent ? (
        <button onClick={handleSendOtp} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <button onClick={handleVerifyOtp} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      )}
    </div>
  );
};

export default Login;
