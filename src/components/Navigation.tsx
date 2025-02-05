import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleLogout = async () => {
        const phone = localStorage.getItem("phone"); // Get phone from localStorage
        if (!phone) {
            console.error("No phone number found, redirecting to login.");
            navigate("/login");
            return;
        }
    }

    return (
        <div className="navbar bg-base-100/[0.5] shadow-sm">
            {/* Empty div to balance flex alignment */}
            <div className="flex-1"></div>

            {/* Centered Teleave Title */}
            <div className="flex-none">
                <a className="btn btn-ghost text-xl font-bold">Teleave</a>
            </div>

            {/* Dropdown Menu for Logout */}
            <div className="flex-1 flex justify-end relative">
                <div className="dropdown dropdown-end">
                    <button
                        className="btn"
                        onClick={toggleDropdown}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 absolute top-full right-0 mt-2">
                            <li>
                                <button className="btn btn-accent w-full text-white" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
