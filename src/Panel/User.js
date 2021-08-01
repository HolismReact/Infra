export default function User() {
    return (
        <header className="navigation-header">
            <figure className="avatar avatar-state-success">
                <img src="image/user/man_avatar3.jpg" className="rounded-circle" alt="somthing" />
            </figure>
            <div>
                <h5>Nikos Pedlow</h5>
                <p className="text-muted">Administrator</p>
                <ul className="nav">
                    <li className="nav-item">
                        <a href="profile.html" className="btn nav-link bg-info-bright" title="Profile"  name="Profile" data-toggle="tooltip">
                            <i className="fa fa-user-o" aria-hidden="true"></i>

                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#login.html" className="btn nav-link bg-success-bright" title="Settings"  name="Settings" data-toggle="tooltip">
                            <i className="fa fa-user-o" aria-hidden="true"></i>

                        </a>
                    </li>
                    <li  className="nav-item">
                        <a href="login.html" className="btn nav-link bg-danger-bright" title="Logout"  name="Logout" data-toggle="tooltip">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}  