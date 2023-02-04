import React, { useRef, useState, useEffect } from "react";
import image from "../assests/group.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

function Login() {
    const { user, logIn } = UserAuth();

    const passwordref = useRef();
    const emailref = useRef();
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailref.current.value === "") {
            setError(`Email cannot be empty`);
        } else if (passwordref.current.value === "") {
            setError(`Password cannot be empty`);
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailref.current.value)) {
            setError(`Please enter a valid email`);
        } else if (passwordref.current.value.length < 6) {
            setError(`Password should atleast be 6 characters`);
        } else {
            await logIn(emailref.current.value, passwordref.current.value, remember)
                .then(() => {
                    navigate("/projects");
                })
                .catch((e) => {
                    setError(e.message);
                });
        }
    };

    let activeStyle = {
        cursor: "none",
        fontWeight: "bold",
        color: "#1A3B58",
    };

    useEffect(() => {
        if (user) {
            navigate("/projects");
        }
    }, [user, navigate]);

    return (
        <div className="logincomponent">
            <div className="loginimage"><img src={image} alt="groupimage"></img></div>
            <div className="logincontent">
                <div className="links">
                    <NavLink
                        to="/login"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        Log In
                    </NavLink>
                    <NavLink className="navlink" to="/signup">
                        Sign Up
                    </NavLink>
                </div>
                <div className="loginform">
                    <div style={{ fontSize: "1.25rem" }}>To Continue</div>
                    <div style={{ fontSize: "0.75rem", fontWeight: "300", color: "#999999" }}>
                        We need your Email & Password
                    </div>
                    <form>
                        <div>
                            <input
                                className="inputfields"
                                placeholder="Email"
                                type="email"
                                ref={emailref}
                            ></input>
                            <div style={{ position: "relative" }}>
                                <input
                                    className="inputfields"
                                    placeholder="Pasword"
                                    type={showPass ? "text" : "password"}
                                    ref={passwordref}
                                ></input>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPass(!showPass);
                                    }}
                                    className="showpass"
                                >
                                    {showPass ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>}
                                </button>
                            </div>
                        </div>
                        <div className="errorcodes">{error}</div>
                        <button className="inputfields loginbutton" onClick={handleSubmit}>
                            Log In
                        </button>
                        <div className="rememberWrapper">
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
