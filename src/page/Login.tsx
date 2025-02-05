/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { startLogin, verifyLogin } from "../service/api";
import { countries } from "../util/countryCode";
import { responseStatusMap } from "../util/responseStatusMap";

export const Login = () => {
    const [country, setCountry] = useState(countries[0]);
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [showVerify, setShowVerify] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error" | "">("");
    const navigate = useNavigate();

    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => setAlertType(""), 3000);
    };

    const handleAlertClick = () => {
        setAlertType("");
    };

    const validatePhoneNumber = (number: string) => {
        const phoneWithoutCountryCode = number.replace(country.code, "").trim();
    
        console.log("Validating local number:", phoneWithoutCountryCode);
        console.log("Regex pattern:", country.regex);
    
        if (!country.regex.test(phoneWithoutCountryCode)) {
            showAlert(`Invalid phone number. Example: ${country.example}`, "error");
            return false;
        }
        return true;
    };
    

    const handleLoginStart = async () => {
        if (!validatePhoneNumber(phone)) return;
        const fullPhone = `${country.code}${phone}`;

        try {
            const response = await startLogin(fullPhone);
            console.log("Login response:", response);

            const { message } = response;
            const status = responseStatusMap[message] || 400;

            if (status === 200) {
                setShowVerify(true);
                showAlert(message, "success");
            } else {
                showAlert(message || "Login failed. Try again.", "error");
            }
        } catch (error) {
            showAlert("Login error. Please try again.", "error");
        }
    };

    const handleVerifyCode = async () => {
        if (!validatePhoneNumber(phone)) return;
        const fullPhone = `${country.code}${phone}`;

        try {
            const response = await verifyLogin(fullPhone, code);

            const { message } = response;
            const status = responseStatusMap[message] || 400;

            if (status === 200) {
                showAlert(message, "success");
                navigate("/groups", { state: { phone: fullPhone } });
            } else {
                showAlert(message || "Verification failed. Check your code.", "error");
            }
        } catch (error) {
            showAlert("Verification error. Try again.", "error");
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-24">
                <h1 className="text-xl font-bold text-white drop-shadow-lg">Teleave</h1>
                <h1 className="text-4xl font-semibold text-center mb-6 drop-shadow-lg">Login to Telegram</h1>

                {alertType && (
                    <div
                        role="alert"
                        className={`alert alert-${alertType} fixed bottom-4 shadow-lg cursor-pointer`}
                        onClick={handleAlertClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            {alertType === "success" ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                        <span>{alertMessage}</span>
                    </div>
                )}

                <div className="mb-4 flex flex-col gap-2 justify-center items-center">
                    {/* Country Selector */}
                    <select
                        className="select select-bordered w-full text-lg bg-base-100 rounded-lg"
                        value={country.code}
                        onChange={(e) => {
                            const selected = countries.find(c => c.code === e.target.value)!;
                            setCountry(selected);
                            setPhone(selected.code); // Auto-fill with country code
                            setShowVerify(false);
                        }}
                    >
                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.name} ({c.code})
                            </option>
                        ))}
                    </select>

                    {/* Phone Number Input */}
                    <div className="flex w-full">
                        <span className="bg-base-300 px-4 flex items-center rounded-l-lg border border-base-200 text-lg rounded-lg">
                            {country.code}
                        </span>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone.replace(country.code, "")} // Remove country code from input field
                            onChange={(e) => setPhone(country.code + e.target.value.trim())} // Ensure proper formatting
                            className="input input-bordered w-full text-lg bg-base-100 rounded-lg"
                        />

                    </div>

                    {/* Login Button */}
                    <button onClick={handleLoginStart} className="btn btn-accent w-full mt-4 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                        </svg>
                        Get Verification Code
                    </button>
                </div>

                {showVerify && (
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Enter code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="input input-bordered w-full text-lg bg-base-100 rounded-lg"
                        />
                        <button onClick={handleVerifyCode} className="btn btn-accent rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                            </svg>
                            Login
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
