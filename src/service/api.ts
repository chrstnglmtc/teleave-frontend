import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login endpoint
export const startLogin = async (phone: string) => {
    try {
        const data = new URLSearchParams();
        data.append("phone", phone); // Use URLSearchParams for x-www-form-urlencoded format

        const response = await axios.post(`${API_URL}/start-login/${phone}`, data, {
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
        const data = new URLSearchParams();
        data.append("phone", phone);
        data.append("code", code);

        const response = await axios.post(`${API_URL}/verify/${phone}/${code}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });
        localStorage.setItem("phone", phone);
        return response.data;
    } catch (error) {
        console.error("Error during verify-login:", error);
        throw error;
    }
};


// Logout endpoint
export const logout = async (phone: string) => {
    try {
        const params = new URLSearchParams();
        params.append("phone", phone);

        const response = await axios.post(`${API_URL}/logout`, params, {
            headers: {
                "Accept": "application/json",
            },
        });
        localStorage.removeItem("phone");
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

// Fetch groups endpoint with filter type and group type
export const getGroups = async (phone: string, filterType: string, groupType: string) => {
    try {
        const params = new URLSearchParams();
        params.append("phone", phone);
        params.append("filter_type", filterType);  // Filter type (inactive, oldest, latest)
        params.append("group_type", groupType);    // Group type (all, group, channel, megagroup)

        const response = await axios.get(`${API_URL}/get_groups/${phone}`, {
            params,
            headers: {
                "Accept": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
};

// Leave groups endpoint
export const leaveGroups = async (phone: string, group_ids: number[]) => {
    try {
        const response = await axios.post(`${API_URL}/leave_groups/${phone}`,
            { group_ids },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during leaveGroups:", error);
        throw error;
    }
};
