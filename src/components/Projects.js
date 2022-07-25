import React from "react";
import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ToDo from "./Todo";
import Progress from "./Progress";
import Completed from "./Completed";

function Projects() {
    const { user, logOut } = UserAuth();
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
        <div>
            <div>
                <div>{user && user.email}</div>
                <div onClick={handleLogout}> Log Out</div>
            </div>
            Projects
            <div className="projectGrid">
                <ToDo />
                <Progress />
                <Completed />
            </div>
        </div>
    );
}

export default Projects;
