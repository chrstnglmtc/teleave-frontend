/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroups } from "../service/api";

export const Group = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const { state } = useLocation();
    const phone = state?.phone;

    useEffect(() => {
        if (phone) {
            fetchGroups();
        }
    }, [phone]);

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const data = await getGroups(phone);
            if (data && Array.isArray(data.data)) {
                setGroups(data.data.map((group: { id: any; title: any; type: any }) => ({
                    id: group.id,
                    title: group.title,
                    type: group.type,
                })));
            } else {
                console.error("Data is not in the expected format:", data);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleGroupSelection = (id: number) => {
        setSelectedGroups(prev =>
            prev.includes(id) ? prev.filter(groupId => groupId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedGroups(selectAll ? [] : groups.map(group => group.id));
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-24">
                <h1 className="text-xl font-bold text-white drop-shadow-lg">Teleave</h1>
                <ul className="bg-base-100 rounded-box shadow-md w-full max-w-md">
                    <li className="p-4 pb-2 text-lg font-semibold text-white">
                        Your Groups & Channels
                    </li>

                    <li className="p-4">
                        <button className="btn btn-primary w-full" onClick={handleSelectAll}>
                            {selectAll ? "Deselect All" : "Select All"}
                        </button>
                    </li>

                    {loading ? (
                        <li className="p-4 text-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </li>
                    ) : groups.length > 0 ? (
                        groups.map((group) => (
                            <li key={group.id} className="p-3 border-b border-base-300">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedGroups.includes(group.id)}
                                        onChange={() => toggleGroupSelection(group.id)}
                                        className="w-5 h-5"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-white">{group.title}</span>
                                        <span className="text-xs badge badge-primary">{group.type}</span>
                                    </div>
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
