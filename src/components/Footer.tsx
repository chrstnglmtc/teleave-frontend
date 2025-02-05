

export default function Footer() {
    return (
        <div className="w-full flex flex-col items-center">
            <footer className="footer sm:footer-horizontal footer-center text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Teleave</p>
                </aside>
            </footer>
        </div>
    )
}
