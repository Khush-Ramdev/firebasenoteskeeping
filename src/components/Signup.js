import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../assests/group.png";
import { UserAuth } from "../components/AuthContext";

function Signup() {
    const handleChange = (e) => {
        setError("");
    };

    const { user, createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailref.current.value));
        console.log(passwordref.current.value, nameref.current.value, emailref.current.value);
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
                await createUser(emailref.current.value, passwordref.current.value);
                navigate("/");
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
        <div>
            <div className="signupcomponent">
                <div className="signupimage">
                    <img src={image} alt="groupimage" />
                </div>
                <div>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink
                        to="/signup"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        Sign Up
                    </NavLink>
                    <div>To Continue</div>
                    <div>We need your Name & Email</div>
                </div>
                <form>
                    <input
                        placeholder="Full Name"
                        ref={nameref}
                        onChange={handleChange}
                        name="name"
                    ></input>
                    <input
                        placeholder="Email"
                        type="email"
                        ref={emailref}
                        onChange={handleChange}
                        name="email"
                    ></input>
                    <input
                        placeholder="Pasword"
                        type="password"
                        ref={passwordref}
                        onChange={handleChange}
                        name="password"
                    ></input>
                    {error}
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
