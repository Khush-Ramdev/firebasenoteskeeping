import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Calender from "./Calender";
import Chats from "./Chats";
import Overview from "./Overview";
import Projects from "./Projects";
import { UserAuth } from "./AuthContext";

function Sidebar() {
    const { logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="sidebar">
            <div className="sidebarheading">.taskez</div>
            <div className="linkwrapper">
                <NavLink
                    to="/overview"
                    element={<Overview />}
                    className={({ isActive }) => "link" + (isActive ? " selected " : "")}
                >
                    <div className="iconwrap">
                        <span className="material-symbols-outlined">home</span>
                        <span className="hideText">Overview</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/stats"
                    element={<Overview />}
                    className={({ isActive }) => "link" + (isActive ? " selected " : "")}
                >
                    <div className="iconwrap">
                        <span className="material-symbols-outlined">bar_chart</span>
                        <span className="hideText">Stats</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/projects"
                    element={<Projects />}
                    className={({ isActive }) => "link" + (isActive ? " selected " : "")}
                >
                    {" "}
                    <div className="iconwrap">
                        <span className="material-symbols-outlined">folder</span>
                        <span className="hideText">Projects</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/chats"
                    element={<Chats />}
                    className={({ isActive }) => "link" + (isActive ? " selected " : "")}
                >
                    {" "}
                    <div className="iconwrap">
                        <span className="material-symbols-outlined">chat</span>
                        <span className="hideText">Chats</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/calendar"
                    element={<Calender />}
                    className={({ isActive }) => "link" + (isActive ? " selected " : "")}
                >
                    {" "}
                    <div className="iconwrap">
                        <span className="material-symbols-outlined">event_note</span>
                        <span className="hideText">Calendar</span>
                    </div>
                </NavLink>
            </div>
            <div onClick={handleLogout} className="logout">
                <div className="iconwrap">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="hideText">Log Out</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
