import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const ContextAPI = createContext(null)
const MyContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    useEffect(() => {
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return unSubscribe;
    }, [auth])
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }
    const logOut = () => {
        return signOut(auth);
    }
    const contextInfo = {
        user,
        signUp,
        signIn,
        googleLogin,
        loading,
        updateUserProfile,
        logOut
    }
    return (
        <ContextAPI.Provider value={contextInfo}>
            {children}
        </ContextAPI.Provider >
    );
};

export default MyContextProvider;