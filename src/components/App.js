import { Route, Routes } from "react-router-dom";
import "../css/App.css";
import Login from "./Login";
import Projects from "./Projects";
import Signup from "./Signup";
import ProtecedRoute from "./ProtecedRoute";
import { AuthContextProvider } from "./AuthContext";
import Error404 from "./Error404";

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route
                        path="/"
                        element={
                            <ProtecedRoute>
                                <Projects />
                            </ProtecedRoute>
                        }
                    ></Route>
                    <Route path="*" element={<Error404 />}></Route>
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
