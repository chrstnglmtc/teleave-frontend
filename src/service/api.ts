import axios from "axios";

// Login endpoint
export const startLogin = async (phone: string) => {
    try {
        const data = JSON.stringify({ phone }); // Format phone number as x-www-form-urlencoded
        const response = await axios.post(`/start-login/${phone}`, data, {
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
        const data = JSON.stringify({ phone, code }); // Format phone and code as x-www-form-urlencoded
        const response = await axios.post(`/verify/${phone}/${code}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
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