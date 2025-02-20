import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn backdrop-filter backdrop-blur-sm">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold transition duration-300">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
