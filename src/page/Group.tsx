/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { getGroups, leaveGroups } from "../service/api";
import { responseStatusMap } from "../util/responseStatusMap";

export const Group = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [leaving, setLeaving] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<"success" | "error" | "">("");
    
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

    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => setAlertType(""), 3000); // Hide after 3 seconds
    };

    const handleAlertClick = () => {
        setAlertType("");
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

    const handleLeaveGroups = async () => {
        if (selectedGroups.length === 0) {
            showAlert("Please select at least one group.", "error");
            return;
        }
    
        setLeaving(true);
        try {
            const response = await leaveGroups(phone, selectedGroups);
            console.log("Leave groups response:", response);
    
            const { message } = response;
            const status = responseStatusMap[message] || 400;
    
            if (status === 200) {
                showAlert("Successfully left selected groups!", "success");
                setGroups(prev => prev.filter(group => !selectedGroups.includes(group.id)));
                setSelectedGroups([]);
                setSelectAll(false);
            } else {
                showAlert(message || "Failed to leave groups. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error leaving groups:", error);
            showAlert("Failed to leave groups. Please try again.", "error");
        } finally {
            setLeaving(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Navigation />
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-24">

                <h2 className="text-lg font-semibold text-white">Your Groups & Channels</h2>

                {/* Alert Toast */}
                {alertType && (
                    <div
                        role="alert"
                        className={`alert alert-${alertType} fixed bottom-4 shadow-lg cursor-pointer`}
                        onClick={handleAlertClick}
                    >
                        <span>{alertMessage}</span>
                    </div>
                )}

                {/* Scrollable Groups Container */}
                <div className="w-full max-w-md bg-base-100 rounded-box shadow-md h-80 overflow-y-auto mt-2 opacity-75">
                    {loading ? (
                        <div className="p-4 text-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : groups.length > 0 ? (
                        groups.map((group) => (
                            <div key={group.id} className="p-3 border-b border-base-300 flex items-center gap-3">
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
                        ))
                    ) : (
                        <div className="p-4">No groups available</div>
                    )}
                </div>

                {/* Buttons Section */}
                <div className="w-full max-w-md mt-4">
                    <button className="btn btn-primary w-full mb-2" onClick={handleSelectAll}>
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                    <button
                        className="btn btn-error w-full"
                        onClick={handleLeaveGroups}
                        disabled={leaving || selectedGroups.length === 0}
                    >
                        Leave Selected Groups
                    </button>

                    {/* Leaving Message Below Button */}
                    {leaving && (
                        <div className="mt-2 text-white text-sm">
                            <span className="loading loading-dots loading-sm"></span> Leaving...
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};
