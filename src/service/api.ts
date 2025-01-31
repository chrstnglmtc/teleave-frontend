import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login endpoint
export const startLogin = async (phone: string) => {
    const response = await axios.post(`${API_URL}/start-login/${phone}`);
    return response.data;
};

// Phone verification endpoint
export const verifyLogin = async (phone: string, code: string) => {
    const response = await axios.post(`${API_URL}/verify/${phone}/${code}`);
    return response.data;
};

// Get list of groups by user endpoint
export const getGroups = async (phone: string) => {
    const response = await axios.get(`${API_URL}/get_groups/${phone}`);
    return response.data;
};

// Leave selected groups endpoint
export const leaveGroups = async (phone: string, group_ids: number[]) => {
    const response = await axios.post(`${API_URL}/leave_groups/${phone}`, group_ids);
    return response.data;
};