import { createContext, useContext, useEffect, useState } from "react";
import {
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [pending, setPending] = useState(true);

    const createUser = (email, password, persist) => {
        if (persist) {
            setPersistence(auth, browserLocalPersistence).then(() => {
                return createUserWithEmailAndPassword(auth, email, password);
            });
        } else {
            setPersistence(auth, browserSessionPersistence).then(() => {
                return createUserWithEmailAndPassword(auth, email, password);
            });
        }
    };

    const logIn = (email, password, persist) => {
        console.log(persist);
        if (persist) {
            setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            });
        } else {
            setPersistence(auth, browserSessionPersistence).then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            });
        }
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
            setUser(currenUser);
            setPending(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (pending) {
        return <div>Loading</div>;
    }

    return (
        <UserContext.Provider value={{ createUser, user, logOut, logIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
