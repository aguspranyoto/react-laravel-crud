import React from "react";
import { Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function GuestLayout() {
    const { token } = UseStateContext();

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
