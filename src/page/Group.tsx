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
        setGroups(data);
    }

    const toggleGroup = (groupId: number) => {
        setSelectedGroups((prev) =>
            prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]);
    };

    const handleLeaveGroups = async () => {
        await leaveGroups(phone, selectedGroups);
        alert("Left selected groups!");
        setGroups((prev) => prev.filter((group) => !selectedGroups.includes(group.id)));
        setSelectedGroups([]);
    };

    return (
        <div>
            <h2>Select Groups to Leave</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        <input
                            type="checkbox"
                            checked={selectedGroups.includes(group.id)}
                            onChange={() => toggleGroup(group.id)}
                        />
                        {group.title}
                    </li>
                ))}
            </ul>
            <button onClick={handleLeaveGroups}>Leave Selected Groups</button>
        </div>
    );
};
