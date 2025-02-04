/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroups } from "../service/api";

export const Group = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const { state } = useLocation();
    const phone = state?.phone;

    useEffect(() => {
        if (phone) {
            fetchGroups();
        }
    }, [phone]);

    const fetchGroups = async () => {
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
        }
    };

    return (
        <div>
            <h2>Your Groups & Channels</h2>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Groups & Channels</li>
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <li key={group.id} className="list-row p-4">
                            <div>
                                <div>{group.id}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{group.title}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{group.type}</div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="p-4">No groups available</li>
                )}
            </ul>
        </div>
    );
};
