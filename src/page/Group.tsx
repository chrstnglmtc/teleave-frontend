/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroups, leaveGroups } from "../service/api";

export const Group = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
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

    // const toggleGroup = (groupId: number) => {
    //     setSelectedGroups((prev) =>
    //         prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    //     );
    // };

    const handleLeaveGroups = async () => {
        try {
            await leaveGroups(phone, selectedGroups);
            alert("Left selected groups!");
            setGroups((prev) => prev.filter((group) => !selectedGroups.includes(group.id)));
            setSelectedGroups([]);
        } catch (error) {
            alert("An error occurred while leaving the groups.");
        }
    };

    return (
        <div>
            <h2>Select Groups to Leave</h2>
            <ul className="text-white">
                {groups.map((group) => (
                    <li key={group.id}>
                        <div>{group.title}</div>
                        <div>{group.type}</div>
                    </li>
                ))}
            </ul>
            <button onClick={handleLeaveGroups}>Leave Selected Groups</button>
        </div>
    );
};
