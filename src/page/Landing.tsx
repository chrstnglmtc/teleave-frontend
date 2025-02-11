import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Modal } from '../components/Modal';

export const Landing = () => {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Automatically show modal when the page loads
        setShowModal(true);
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const scrollToHowItWorks = () => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-xl font-bold text-white drop-shadow-lg">Teleave</h1>
                    <h1 className="text-3xl sm:text-5xl font-bold text-accent drop-shadow-lg mt-4">
                        No more leaving groups
                    </h1>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
                        one by one.
                    </h1>
                    <p className="mt-6 text-base-content text-sm drop-shadow-lg">
                        Teleave makes it easy to leave multiple Telegram groups at once, saving you time and effort.
                    </p>
                    <button
                        onClick={scrollToHowItWorks}
                        className="btn btn-accent mt-8 text-lg px-8 py-4 transition-all duration-300 hover:bg-accent-focus"
                    >
                        How It Works
                    </button>
                </div>
            </section>

            <section id="how-it-works" className="w-full h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-4xl font-semibold text-center mb-6">Here's how it works</h2>
                    <ul className="steps steps-vertical">
                        <li className="step step-accent">Login to your Telegram account</li>
                        <li className="step step-accent">Select the groups you want to leave</li>
                        <li className="step step-accent">Leave them all at once</li>
                    </ul>
                    <button
                        onClick={handleLoginClick}
                        className="btn btn-accent mt-8 text-lg transition-all duration-300 hover:bg-accent-focus"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                        </svg>
                        Login with Telegram
                    </button>
                </div>
            </section>
            <Footer />
            <Modal id="welcome-modal" title="WARNING" show={showModal}>
                <p>This web app is still under continuous development.
                    Deletion of account may be possible.
                    Kindly exit if you are not willing to face the consequences.
                    I am not liable for any damages to your account.
                </p>
                <p>
                    Please make sure that your account doesn't have 2FA enabled to use.
                </p>
            </Modal>
        </div>
    );
};
