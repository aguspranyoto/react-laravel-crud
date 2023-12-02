import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setNotification } = UseStateContext();
    const [links, setLinks] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getUsers();
    }, [page]);

    const getUsers = () => {
        setIsLoading(true);
        axiosClient
            .get(`/users?page=${page}`)
            .then(({ data }) => {
                setIsLoading(false);
                setUsers(data.data);
                setLinks(data.meta.links);
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
                <div className="w-full">
                    <nav className="flex justify-center pt-5">
                        <ul className="inline-flex -space-x-px text-sm">
                            {links &&
                                links.map((item) =>
                                    item.url == null ? (
                                        <li key={item.label}>
                                            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                                {item.label
                                                    .replace("&laquo;", "")
                                                    .replace("&raquo;", "")}
                                            </a>
                                        </li>
                                    ) : (
                                        <li key={item.label}>
                                            <a
                                                onClick={() => {
                                                    item.label ==
                                                    "&laquo; Previous"
                                                        ? setPage(page - 1)
                                                        : item.label ==
                                                          "Next &raquo;"
                                                        ? setPage(page + 1)
                                                        : setPage(
                                                              Number(item.label)
                                                          );
                                                }}
                                                className={
                                                    Number(item.label) == page
                                                        ? `cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-white bg-[#5b08a7] border border-gray-300 hover:bg-gray-100 hover:text-gray-700`
                                                        : `cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`
                                                }
                                            >
                                                {item.label
                                                    .replace("&laquo;", "")
                                                    .replace("&raquo;", "")}
                                            </a>
                                        </li>
                                    )
                                )}
                            {/* <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-[#5b08a7] border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text--gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    ...
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    Next
                                </a>
                            </li> */}
                        </ul>
                    </nav>

                    {/* {links &&
                        links.map((item) => (
                            <div key={item.label} className="flex ">
                                <div className="text-xs">{item.url}</div>
                            </div>
                        ))} */}
                </div>
            </div>
        </div>
    );
}

export default Users;
