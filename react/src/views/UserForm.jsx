import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUsers] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { setNotification } = UseStateContext();

    if (id) {
        useEffect(() => {
            setIsLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setIsLoading(false);
                    setUsers(data);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    setNotification("User was successfully created");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {isLoading ? (
                    <div
                        className="text-center"
                        style={{ padding: "40px 40px" }}
                        colSpan={5}
                    >
                        Loading...
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(e) =>
                                setUsers({ ...user, name: e.target.value })
                            }
                            type="text"
                            placeholder="Fullname .."
                        />
                        <input
                            value={user.email}
                            onChange={(e) =>
                                setUsers({ ...user, email: e.target.value })
                            }
                            type="email"
                            placeholder="Email .."
                        />
                        <input
                            onChange={(e) =>
                                setUsers({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password .."
                        />
                        <input
                            onChange={(e) =>
                                setUsers({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Password Confirmation .."
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
