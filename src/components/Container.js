import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtecedRoute from "./ProtecedRoute";
import Projects from "./Projects";
import Overview from "./Overview";
import Stats from "./Stats";
import Calender from "./Calender";
import Chats from "./Chats";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Container() {
    return (
        <div className="container">
            <Sidebar />
            <div className="containerdiv">
                <Header />
                <Routes>
                    <Route
                        path="/projects"
                        element={
                            <ProtecedRoute>
                                <Projects />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route
                        path="/overview"
                        element={
                            <ProtecedRoute>
                                <Overview />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route
                        path="/stats"
                        element={
                            <ProtecedRoute>
                                <Stats />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route
                        path="/chats"
                        element={
                            <ProtecedRoute>
                                <Chats />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route
                        path="/calendar"
                        element={
                            <ProtecedRoute>
                                <Calender />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route path="*" element={<Navigate to="/projects" />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default Container;
