/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login endpoint
export const startLogin = async (phone: string) => {
    const response = await axios.post(`/start-login/${phone}`);
    return response.data;
};

// Phone verification endpoint
export const verifyLogin = async (phone: string, code: string) => {
    const response = await axios.post(`/verify/${phone}/${code}`);
    return response.data;
};

// Get list of groups by user endpoint
export const getGroups = async (phone: string) => {
    const response = await axios.get(`/get_groups/${phone}`);
    return response.data;
};

// Leave selected groups endpoint
export const leaveGroups = async (phone: string, group_ids: number[]) => {
    const response = await axios.post(`/leave_groups/${phone}`, group_ids);
    return response.data;
};