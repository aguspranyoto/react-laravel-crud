import React from "react";
import { Outlet, Link } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function DefaultLayout() {
    const onLogout = (e) => {
        e.preventDefault();
    };
    const { user, token } = UseStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div id="defaultLayout">
            <aside>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/users"}>Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
