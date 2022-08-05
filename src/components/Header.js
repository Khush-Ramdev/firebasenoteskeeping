import React from "react";
import { UserAuth } from "./AuthContext";
import image from "../assests/profile.png";
import { actions } from "../app/store";
import { useSelector, useDispatch } from "react-redux";

function Header() {
    const { user } = UserAuth();

    const text = useSelector((state) => state.searchText);
    const dispatch = useDispatch();
    const handleSearchChange = (e) => {
        dispatch(actions.set(e.target.value));
    };

    return (
        <div className="header">
            <div className="search-bar">
                <input
                    placeholder="Search notes"
                    value={text}
                    onChange={handleSearchChange}
                ></input>
            </div>
            <div className="user-info">
                <div>{user && `Hi, ${user.displayName}`}</div>
                <div className="image">
                    <img src={image} alt="profile" />
                </div>
            </div>
        </div>
    );
}

export default Header;
