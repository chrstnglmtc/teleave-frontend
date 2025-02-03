import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { startLogin, verifyLogin } from '../service/api';

export const Login = () => {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleLoginStart = async () => {
        const data = await startLogin(phone);
        alert(data.message);
    };

    const handleVerifyCode = async () => {
        const data = await verifyLogin(phone, code);
        alert(data.message);
        navigate("/groups");
    }

    return (
        <div className="w-full bg-base-100 flex flex-col items-center py-12 px-6 sm:px-10">
            <div className="max-w-md w-full bg-base-200 shadow-xl p-8 rounded-xl">
                <h1 className="text-4xl font-semibold text-center text-accent mb-6">Login to Telegram</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input input-bordered w-full text-lg py-2 px-4 rounded-md bg-base-100 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <button
                    onClick={handleLoginStart}
                    className="btn btn-accent w-full text-lg py-3 mt-4 transition-all duration-300 hover:bg-accent-focus"
                >
                    Login via Phone
                </button>

                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="input input-bordered w-full text-lg py-2 px-4 rounded-md bg-base-100 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <button
                    onClick={handleVerifyCode}
                    className="btn btn-accent w-full text-lg py-3 mt-4 transition-all duration-300 hover:bg-accent-focus"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};
