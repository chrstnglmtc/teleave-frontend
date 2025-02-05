export default function Footer() {
    return (
        <div className="w-full flex flex-col items-center">
            <footer className="footer flex flex-col items-center text-base-content p-10 w-full max-w-4xl">
                {/* Navigation stays in a row */}
                <nav className="flex gap-4 mb-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                {/* Copyright is always at the bottom */}
                <aside className="text-center">
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by Teleave</p>
                </aside>
            </footer>
        </div>
    );
}
