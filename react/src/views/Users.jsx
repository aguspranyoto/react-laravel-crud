import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setNotification } = UseStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setIsLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setIsLoading(false);

                setUsers(data.data);
                setLinks(data.meta.links);
                console.log(data.meta);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    return (
        <div>
            <div
                className=""
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table className="">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <th
                                    className="text-center"
                                    style={{ padding: "40px 40px" }}
                                    colSpan={5}
                                >
                                    Loading...
                                </th>
                            </tr>
                        </tbody>
                    ) : users.length ? (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td style={{}}>
                                        <Link
                                            className="btn-edit"
                                            to={`/users/` + u.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => {
                                                onDelete(u);
                                            }}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <th
                                    className="text-center"
                                    style={{ padding: "40px 40px" }}
                                    colSpan={5}
                                >
                                    No data
                                </th>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Users;
