import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Button from "./button";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new attempt

    try {
      const data = await loginUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/bg4.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 backdrop-blur bg-black/30"></div>

      <div className="relative z-10 p-8 border-gray-700 bg-gray-800 bg-opacity-80 border-2 rounded-md w-full max-w-md">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={HandleLogin} className="p-3">
          <div className="m-auto mb-3">
            <input
              type="text"
              name="email"
              className="w-full p-3 border rounded-md"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="mt-3 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          <div className="mt-3">
            {/* ✅ Fixed Button usage */}
            <Button label="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
