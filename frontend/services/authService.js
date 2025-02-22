import axios from 'axios';


const API_URL = 'http://localhost:6471/api/auth';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (formData) => {
    const response = await fetch("http://localhost:6471/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include", // Required if using cookies/sessions
    });
  
    if (!response.ok) {
      throw new Error(await response.text());
    }
  
    return response.json();
  };