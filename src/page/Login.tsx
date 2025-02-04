/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        if (!country.regex.test(number)) {
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
        <div className="w-full bg-base-100 flex flex-col items-center">
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-base-100 text-center px-6 sm:px-10 py-24">
                <h1 className="text-xl font-bold text-accent">Teleave</h1>
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Login to Telegram</h1>

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
                    <div className="join mb-4">
                        <select
                            className="select select-bordered w-auto text-lg bg-base-100"
                            value={country.code}
                            onChange={(e) => {
                                const selected = countries.find(c => c.code === e.target.value)!;
                                setCountry(selected);
                                setPhone("");
                                setShowVerify(false);
                            }}
                        >
                            {countries.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name} ({c.code})
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input input-bordered w-full text-lg bg-base-100"
                        />
                        {/* Login Button */}
                        <button onClick={handleLoginStart} className="btn btn-accent w-32">
                            Login
                        </button>
                    </div>

                    {showVerify && (
                        <div className="join mb-4">
                            <input
                                type="text"
                                placeholder="Enter code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input input-bordered w-full text-lg bg-base-100"
                            />
                            <button onClick={handleVerifyCode} className="btn btn-accent">
                                Verify
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};
