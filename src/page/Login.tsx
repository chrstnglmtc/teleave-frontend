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
    const [codeSent, setCodeSent] = useState(false);
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
        const fullPhone = `${country.code}${phone.replace(country.code, "")}`;

        try {
            const response = await startLogin(fullPhone);
            const { message } = response;
            const status = responseStatusMap[message] || 400;

            if (status === 200) {
                setShowVerify(true);
                setCodeSent(true); // Hide phone input & show verification input
                showAlert("Verification code sent!", "success");
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
                        onClick={() => setAlertType("")}
                    >
                        <span>{alertMessage}</span>
                    </div>
                )}

                {!codeSent ? (
                    // Show phone number input if code is not sent yet
                    <div className="mb-4 flex flex-col gap-2 justify-center items-center">
                        <select
                            className="select select-bordered w-full text-lg bg-base-100 rounded-lg"
                            value={country.code}
                            onChange={(e) => {
                                const selected = countries.find(c => c.code === e.target.value)!;
                                setCountry(selected);
                                setPhone(selected.code);
                                setShowVerify(false);
                            }}
                        >
                            {countries.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name} ({c.code})
                                </option>
                            ))}
                        </select>

                        <div className="flex w-full">
                            <span className="bg-base-300 px-4 flex items-center rounded-l-lg border border-base-200 text-lg rounded-lg">
                                {country.code}
                            </span>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone.replace(country.code, "")}
                                onChange={(e) => setPhone(country.code + e.target.value.trim())}
                                className="input input-bordered w-full text-lg bg-base-100 rounded-lg"
                            />
                        </div>

                        <button onClick={handleLoginStart} className="btn btn-accent w-full mt-4 rounded-lg">
                            Get Verification Code
                        </button>
                    </div>
                ) : (
                    // Show verification code input if code is sent
                    <div className="mb-4 flex flex-col gap-2 justify-center items-center">
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="input input-bordered w-full text-lg bg-base-100 rounded-lg"
                        />
                        <button
                            onClick={handleVerifyCode}
                            className="btn btn-accent w-full mt-4 rounded-lg"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};