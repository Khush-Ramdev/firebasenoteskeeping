import { createContext, useContext, useEffect, useState } from "react";
import {
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    browserSessionPersistence,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import image from '../assests/loading.gif';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [pending, setPending] = useState(true);

    const createUser = (email, password, persist, name) => {
        const sessionPersistor = persist ? browserLocalPersistence : browserSessionPersistence;
        return setPersistence(auth, sessionPersistor).then(() => {
            return createUserWithEmailAndPassword(auth, email, password).then((res) => {
                return updateProfile(res.user, { displayName: name });
            });
        });
    };

    const logIn = (email, password, persist) => {
        const sessionPersistor = persist ? browserLocalPersistence : browserSessionPersistence;
        return setPersistence(auth, sessionPersistor).then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        });
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
            if (currenUser) {
                currenUser.reload();
            }
            setUser(currenUser);
            setPending(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (pending) {
        return <div className="loading"><img src={image} alt='Loading'></img></div>;
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
