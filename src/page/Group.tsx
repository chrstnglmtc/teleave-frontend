/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroups } from "../service/api";

export const Group = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Add loading state
    const { state } = useLocation();
    const phone = state?.phone;

    useEffect(() => {
        if (phone) {
            fetchGroups();
        }
    }, [phone]);

    const fetchGroups = async () => {
        setLoading(true); // Start loading
        try {
            const data = await getGroups(phone);
            console.log("Fetched data:", data); // Check if the data is fetched correctly

            if (data && Array.isArray(data.data)) {
                const simplifiedGroups = data.data.map((group: { id: any; title: any; type: any; }) => ({
                    id: group.id,
                    title: group.title,
                    type: group.type,
                }));
                setGroups(simplifiedGroups);
            } else {
                console.error("Data is not in the expected format:", data);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="w-full bg-base-100 flex flex-col items-center">
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-base-100 text-center px-6 sm:px-10 py-24">
                <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-3xl mx-auto">
                    <li className="p-4 pb-2 text-base text-white tracking-wide">Your Groups & Channels</li>
                    {loading ? (
                        <li className="p-4 text-center">
                            <span className="loading loading-dots loading-lg"></span> {/* Loading Spinner */}
                        </li>
                    ) : groups.length > 0 ? (
                        groups.map((group) => (
                            <li key={group.id} className="list-row">
                                <div>
                                    <div className="text-xs uppercase font-semibold text-white">{group.title}</div>
                                    <div className="badge badge-primary badge-xs">{group.type}</div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-4">No groups available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
