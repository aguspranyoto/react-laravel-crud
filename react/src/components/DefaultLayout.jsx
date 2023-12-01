import React from "react";
import { Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function DefaultLayout() {
    const { user, token } = UseStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <p>Default</p>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
