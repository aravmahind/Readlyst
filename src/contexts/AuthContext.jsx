import React, {createContext, useState, useEffect} from 'react';
import {auth} from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            setUser(userData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user, 
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}