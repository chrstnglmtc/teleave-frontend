/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
//update
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
    const [filterType, setFilterType] = useState<string | null>(null); // Store the filter type
    const [groupType, setGroupType] = useState<string>("all"); // Store the group type

    const { state } = useLocation();
    const phone = state?.phone;

    useEffect(() => {
        if (phone) {
            fetchGroups();
        }
    }, [phone, filterType, groupType]); // Re-fetch groups if the filter or groupType is applied

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const data = await getGroups(phone, filterType ?? "", groupType); // Pass filterType and groupType to the API
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
        setTimeout(() => setAlertType(""), 3000);
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

    const handleFilterChange = (filter: string) => {
        setFilterType(filter);
    };

    const handleGroupTypeChange = (type: string) => {
        setGroupType(type);
    };

    const handleLeaveGroups = async () => {
        if (selectedGroups.length === 0) {
            showAlert("Please select at least one group.", "error");
            return;
        }

        setLeaving(true);
        try {
            const response = await leaveGroups(phone, selectedGroups); // Pass the selected group IDs to the API

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

    const handleFilterSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Navigation />
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-24">

                <h2 className="text-lg font-semibold text-white">Your Groups & Channels</h2>

                {alertType && (
                    <div
                        role="alert"
                        className={`alert alert-${alertType} fixed bottom-4 shadow-lg cursor-pointer`}
                        onClick={handleAlertClick}
                    >
                        <span>{alertMessage}</span>
                    </div>
                )}

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

                {/* Filter Form with a Filter Button */}
                <form className="filter flex gap-2 mt-4" onSubmit={handleFilterSubmit}>
                    <input
                        className={`btn btn-square ${filterType === null ? "btn-accent" : ""}`}
                        type="reset"
                        value="×"
                        onClick={() => setFilterType(null)} // Reset filter on click
                    />
                    <input
                        className={`btn ${filterType === 'inactive' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="filterType"
                        value="inactive"
                        onChange={() => handleFilterChange('inactive')}
                        checked={filterType === 'inactive'}
                        aria-label="Inactive"
                    />
                    <label htmlFor="inactive" className="btn">Inactive</label>

                    <input
                        className={`btn ${filterType === 'oldest' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="filterType"
                        value="oldest"
                        onChange={() => handleFilterChange('oldest')}
                        checked={filterType === 'oldest'}
                        aria-label="Oldest"
                    />
                    <label htmlFor="oldest" className="btn">Oldest</label>

                    <input
                        className={`btn ${filterType === 'latest' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="filterType"
                        value="latest"
                        onChange={() => handleFilterChange('latest')}
                        checked={filterType === 'latest'}
                        aria-label="Latest"
                    />
                    <label htmlFor="latest" className="btn">Latest</label>

                    <input
                        className={`btn ${groupType === 'all' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="groupType"
                        value="all"
                        onChange={() => handleGroupTypeChange('all')}
                        checked={groupType === 'all'}
                        aria-label="All Groups"
                    />
                    <label htmlFor="all" className="btn">All Groups</label>

                    <input
                        className={`btn ${groupType === 'group' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="groupType"
                        value="group"
                        onChange={() => handleGroupTypeChange('group')}
                        checked={groupType === 'group'}
                        aria-label="Groups"
                    />
                    <label htmlFor="group" className="btn">Groups</label>

                    <input
                        className={`btn ${groupType === 'channel' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="groupType"
                        value="channel"
                        onChange={() => handleGroupTypeChange('channel')}
                        checked={groupType === 'channel'}
                        aria-label="Channels"
                    />
                    <label htmlFor="channel" className="btn">Channels</label>

                    <input
                        className={`btn ${groupType === 'megagroup' ? 'btn-accent' : ''}`}
                        type="radio"
                        name="groupType"
                        value="megagroup"
                        onChange={() => handleGroupTypeChange('megagroup')}
                        checked={groupType === 'megagroup'}
                        aria-label="Mega Groups"
                    />
                    <label htmlFor="megagroup" className="btn">Mega Groups</label>

                    <button type="submit" className="btn btn-primary mt-2">Apply Filters</button>
                </form>

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

                    {leaving && (
                        <div className="mt-2 text-white text-sm">
                            <span className="loading loading-dots loading-sm"></span> Leaving...
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
};
