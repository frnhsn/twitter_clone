export default function LeftSidebarComponent() {

    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
        {/* Sidebar scroll*/}
            <div className="scroll-sidebar" data-sidebarbg="skin6">
        {/* Sidebar navigation*/}
            <nav className="sidebar-nav">
            <ul id="sidebarnav">
            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="/home" aria-expanded="false"><i data-feather="home" className="feather-icon" /><span className="hide-menu">Home</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="/profile" aria-expanded="false"><i data-feather="user" className="feather-icon" /><span className="hide-menu">Profile</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="/settings" aria-expanded="false"><i data-feather="settings" className="feather-icon" /><span className="hide-menu">Settings</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="/logout" aria-expanded="false"><i data-feather="log-out" className="feather-icon" /><span className="hide-menu">Logout</span></a></li>
            </ul>
        </nav>
        {/* End Sidebar navigation */}
            </div>
        {/* End Sidebar scroll*/}
        </aside>
    )
}