import axios from 'axios';


const API_URL = 'http://localhost:6471/api/auth';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};


export const loginUser = async (formData) => {
    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Important for authentication
    });
  
    return response.data;
  };