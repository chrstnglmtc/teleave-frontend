/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

// Login endpoint
export const startLogin = async (phone: string) => {
    try {
        const response = await axios.post(`/start-login/${phone}`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error during start-login:", error);
        throw error;
    }
};


// Phone verification endpoint
export const verifyLogin = async (phone: string, code: string) => {
    try {
        const response = await axios.post(`/verify/${phone}/${code}`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error during verify-login:", error);
        throw error;
    }
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