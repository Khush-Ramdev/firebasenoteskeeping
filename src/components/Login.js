import React, { useRef, useState, useEffect } from "react";
import image from "../assests/group.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

function Login() {
    const { user, logIn } = UserAuth();
    const passwordref = useRef();
    const emailref = useRef();
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(remember);
    }, [remember]);

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
            try {
                await logIn(emailref.current.value, passwordref.current.value, remember);
                navigate("/");
            } catch (e) {
                setError(e.message);
                console.log(e.message);
            }
        }
    };

    let activeStyle = {
        textDecoration: "underline",
        fontWeight: "bold",
    };

    useEffect(() => {
        if (user) {
            console.log("here");
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="logincomponent">
            <div className="loginimage">
                <img src={image} alt="groupimage"></img>
            </div>
            <div>
                <div>
                    <NavLink
                        to="/login"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        Log In
                    </NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
                <div>To Continue</div>
                <div>We need your Name & Email</div>
            </div>
            <form>
                <input placeholder="Email" type="email" ref={emailref}></input>
                <input placeholder="Pasword" type="password" ref={passwordref}></input>
                <input
                    type="checkbox"
                    name="rememberme"
                    checked={remember}
                    onChange={() => {
                        setRemember(!remember);
                    }}
                ></input>
                <label htmlFor="rememberme">Remember Me</label>
                {error}
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
