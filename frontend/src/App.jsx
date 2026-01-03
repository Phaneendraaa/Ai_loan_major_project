import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPhone from "./pages/LoginPhone";
import LoginOtp from "./pages/LoginOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPhone />} />
        <Route path="/otp" element={<LoginOtp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
