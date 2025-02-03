import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to /login when button is clicked
    };

    return (
        <div className="w-full bg-base-100 flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full min-h-screen flex flex-col justify-center items-center bg-base-100 text-center px-6 sm:px-10 py-24">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-xl font-bold text-accent">Teleave</h1>
                    <h1 className="text-3xl sm:text-5xl font-bold text-accent mt-4">
                        No more leaving groups
                    </h1>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white">
                        one by one.
                    </h1>
                    <p className="mt-6 text-base-content text-sm">
                        Teleave makes it easy to leave multiple Telegram groups at once, saving you time and effort.
                    </p>
                    <button 
                        onClick={handleLoginClick}
                        className="btn btn-accent mt-8 text-lg px-8 py-4 transition-all duration-300 hover:bg-accent-focus"
                    >
                        Login
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="w-full py-24 text-center bg-base-100 flex flex-col justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-4xl font-semibold text-center mb-6">Here's how it works</h2>
                        <ul className="steps steps-vertical">
                            <li className="step">Login to your Telegram account</li>
                            <li className="step">Select the groups you want to leave</li>
                            <li className="step">Leave them all at once</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer sm:footer-horizontal footer-center bg-accent text-base-content p-4">
                <aside>
                    <p>© {new Date().getFullYear()} Teleave. All rights reserved.</p>
                </aside>
            </footer>
        </div>
    );
};
