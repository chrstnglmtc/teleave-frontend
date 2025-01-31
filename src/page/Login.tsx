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
        <div>
            <h1>Login to Telegram</h1>
            <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleLoginStart}>Login via Phone</button>

            <div>
                <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleVerifyCode}>Verify</button>
            </div>
        </div>
    )
}
