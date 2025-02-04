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
        const data = await getGroups(phone);
        if (data && Array.isArray(data)) {
            const simplifiedGroups = data.map((group) => ({
                id: group.id,
                title: group.title,
                type: group.type,
            }));
            setGroups(simplifiedGroups);
        }
    };

    return (
        <div>
            <h2>Your Groups & Channels</h2>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Groups & Channels</li>
                {groups.map((group) => (
                    <li key={group.id} className="list-row p-4">
                        <div>
                            <div>{group.id}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{group.title}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{group.type}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
