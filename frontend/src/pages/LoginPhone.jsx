import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginNumberVerify } from "../api/authApi";

const LoginPhone = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ start loading

    try {
      const res = await loginNumberVerify(phone);

      navigate("/otp", {
        state: {
          phone,
          email: res.data.email,
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // ✅ stop loading (safe)
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="phone-input">
          <span className="country-code">+91</span>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="10"
            required
            disabled={loading} // optional UX
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPhone;
