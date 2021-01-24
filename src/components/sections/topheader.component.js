import { useEffect, useState } from 'react';
import UserService from '../../services/user.service.js';

export default function TopHeaderComponent(props) {
    const [user, setUser] = useState();
    
    useEffect(() => {
        UserService.me().then((response) => {
            setUser(response.data);
        })
    }, [])

    return (
       <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md">
                <div className="navbar-header" data-logobg="skin6">
                {/* This is for the sidebar toggle which is visible on mobile only */}
                <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="/"><i className="ti-menu ti-close" /></a>
                        {/* Logo */}
                        <div className="navbar-brand">
                    {/* Logo icon */}
                    <a href="/">
                    <b className="logo-icon">
                        {/* Dark Logo icon */}
                        <img src="../static/assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                        {/* Light Logo icon */}
                        <img src="../static/assets/images/logo-icon.png" alt="homepage" className="light-logo" />
                    </b>
                    {/*End Logo icon */}
                    {/* Logo text */}
                    <span className="logo-text">
                        {/* dark Logo text */}
                        <img src="../static/assets/images/logo-text.png" alt="homepage" className="dark-logo" />
                        {/* Light Logo text */}
                        <img src="../static/assets/images/logo-light-text.png" className="light-logo" alt="homepage" />
                    </span>
                    </a>
                </div>
                        {/* End Logo */}
                        {/* Toggle which is visible on mobile only */}
                        <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="/" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></a>
                </div>
                    {/* End Logo */}
                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        {/* toggle and nav items */}
                        <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                            {/* Header title */}
                            <li className="nav-item">
                                <h3 className="text-dark mx-3" >{props.headerTitle}</h3>
                            </li>
                         </ul>
                        {/* Right side toggle and nav items */}
                        <ul className="navbar-nav float-right">
                            {/* Search */}
                            <li className="nav-item d-none d-md-block">
                    <a className="nav-link" href="/">
                        <form>
                        <div className="customize-input">
                            <input className="form-control custom-shadow custom-radius border-0 bg-white" type="search" placeholder="Search" aria-label="Search" />
                            <i className="form-control-icon" data-feather="search" />
                        </div>
                        </form>
                    </a>
                    </li>
                            {/* User profile and search */}
                            <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="../static/assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle" width={40} />
                        <span className="ml-2 d-none d-lg-inline-block"><span className="text-dark">{user && user.first_name}</span> <i data-feather="chevron-down" className="svg-icon" /></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                        <a className="dropdown-item" href="/profile"><i data-feather="user" className="svg-icon mr-2 ml-1" />My Profile</a>
                        <a className="dropdown-item" href="/settings"><i data-feather="settings" className="svg-icon mr-2 ml-1" />Account Setting</a>
                        <a className="dropdown-item" href="/logout"><i data-feather="power" className="svg-icon mr-2 ml-1" />Logout</a>
                    </div>
                    </li>
                            {/* User profile and search */}
                            </ul>
                </div>
            </nav>
            </header>
    )
}