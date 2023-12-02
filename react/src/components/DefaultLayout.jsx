import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";

function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = UseStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/users"}>Users</Link>
            </aside>
            <div className="content">
                {notification && (
                    <div className="notification">{notification}</div>
                )}
                <header>
                    <div>React Laravel PostgreSQL CRUD</div>
                    <div className="flex items-center gap-4">
                        {user.name}
                        <a
                            href="#"
                            onClick={onLogout}
                            className="hover:underline"
                        >
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
