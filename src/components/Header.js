import React from "react";
import { UserAuth } from "./AuthContext";
import image from "../assests/profile.png";

function Header() {
    const { user } = UserAuth();

    return (
        <div className="header">
            <div>{user && `Hi, ${user.displayName}`}</div>
            <div className="image">
                <img src={image} alt="profile" />
            </div>
        </div>
    );
}

export default Header;
