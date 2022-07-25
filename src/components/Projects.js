import React from "react";
import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

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
            Projects
            <div>{user && user.email}</div>
            <div onClick={handleLogout}> Log Out</div>
        </div>
    );
}

export default Projects;
