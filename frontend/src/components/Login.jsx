import React, { useState } from "react";
import PasswordInput from "./passwordInput";
import Button from "./button";

const LoginForm = () => {
  const [username, setUsername] = useState(""); // State for storing username
  const [password, setPassword] = useState(""); // State for storing password

  // Handle Login function
  const HandleLogin = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Basic validation for empty fields
    if (!username || !password) {
      console.log("Both fields are required!");
      return;
    }

    // Example login check
    if (username === "admin" && password === "password123") {
      console.log("Login successful");
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/bg4.jpg')] bg-cover bg-center"
      ></div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur bg-black/30"></div>

      {/* Login Box */}
      <div className="relative z-10 p-8 border-gray-700 bg-gray-800 bg-opacity-80 border-2 rounded-md w-full max-w-md">
        <form onSubmit={HandleLogin} className="p-3">
          <div className="w-56 m-auto mb-3">
            <input type="text" className="w-full p-3 border rounded-md" placeholder="Username" />
          </div>
          <div className="mt-3">
            <PasswordInput />
          </div>
          <div className="mt-4">
            <Button label="Login" onClick={HandleLogin} color="blue" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
