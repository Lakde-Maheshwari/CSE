import axios from "axios";

const API_BASE_URL = "http://localhost:6471/api/group"; // Change the base URL as needed


export const createGroup = async (GroupData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, GroupData);
        return response.data;
    } catch (error) {
        console.error("Error creating profile:", error.response?.data || error.message);
        throw error;
    }
};
