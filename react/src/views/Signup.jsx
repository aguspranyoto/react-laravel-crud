import React from "react";
import { Link } from "react-router-dom";

function Signup() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign Up</h1>
                    <input type="text" placeholder="Fullname .." />
                    <input type="email" placeholder="Email .." />
                    <input type="password" placeholder="Password .." />
                    <input
                        type="password"
                        placeholder="Password Confirmation .."
                    />
                    <button type="submit" className="btn btn-block">
                        Sign Up
                    </button>
                    <p className="message">
                        Already Registered?
                        <Link to="/login"> Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
