import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../assests/group.png";
import { UserAuth } from "../components/AuthContext";

function Signup() {
    const handleChange = (e) => {
        setError("");
    };

    const [remember, setRemember] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameref.current.value === "") {
            setError(`Name cannot be empty`);
        } else if (emailref.current.value === "") {
            setError(`Email cannot be empty`);
        } else if (passwordref.current.value === "") {
            setError(`Password cannot be empty`);
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailref.current.value)) {
            setError(`Please enter a valid email`);
        } else if (passwordref.current.value.length < 6) {
            setError(`Password should atleast be 6 characters`);
        } else {
            try {
                await createUser(
                    emailref.current.value,
                    passwordref.current.value,
                    remember,
                    nameref.current.value,
                );
                navigate("/login");
            } catch (e) {
                setError(e.message);
                console.log(e.message);
            }
        }
    };

    const nameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const [error, setError] = useState("");

    let activeStyle = {
        cursor: "none",
        fontWeight: "bold",
        color: "#1A3B58",
    };

    return (
        <div className="signupcomponent">
            <div className="signupimage">
                <img src={image} alt="groupimage" />
            </div>
            <div className="signupcontent">
                <div className="links">
                    <NavLink to="/login" className="navlink">
                        Log In
                    </NavLink>
                    <NavLink
                        to="/signup"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        Sign Up
                    </NavLink>
                </div>
                <div className="signupform">
                    <div style={{ fontSize: "1.25rem" }}>To Continue</div>
                    <div style={{ fontSize: "0.75rem", fontWeight: "300", color: "#999999" }}>
                        We need your Email & Password
                    </div>
                    <form>
                        <input
                            className="inputfields"
                            placeholder="Full Name"
                            ref={nameref}
                            onChange={handleChange}
                            name="name"
                        ></input>
                        <input
                            className="inputfields"
                            placeholder="Email"
                            type="email"
                            ref={emailref}
                            onChange={handleChange}
                            name="email"
                        ></input>
                        <div style={{ position: "relative" }}>
                            <input
                                className="inputfields"
                                placeholder="Pasword"
                                type={showPass ? "text" : "password"}
                                ref={passwordref}
                                onChange={handleChange}
                                name="password"
                            ></input>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPass(!showPass);
                                }}
                                className="showpass"
                            >
                                {showPass ? "hide" : "show"}
                            </button>
                        </div>
                        <div className="errorcodes">{error}</div>
                        <button className="inputfields signupbutton" onClick={handleSubmit}>
                            Submit
                        </button>
                        <input
                            className="input"
                            type="checkbox"
                            name="rememberme"
                            checked={remember}
                            onChange={() => {
                                setRemember(!remember);
                            }}
                        ></input>
                        <label
                            htmlFor="rememberme "
                            className="rememberme"
                            onClick={() => {
                                setRemember(!remember);
                            }}
                        >
                            Remember Me
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
