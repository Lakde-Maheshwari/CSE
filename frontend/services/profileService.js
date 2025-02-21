import axios from "axios";

const API_BASE_URL = "http://localhost:6471/api/profile"; // Change the base URL as needed

// 🔹 Create Profile
export const createProfile = async (profileData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error creating profile:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Get Profile by User ID
export const getProfile = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Update Profile
export const updateProfile = async (userId, profileData, token) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${userId}`, profileData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error.response?.data || error.message);
        throw error;
    }
};
