import React from "react";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
};

const AuthContextWrap = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    isLoading: true,
});

// AuthProvider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user && user !== "" && user !== "[]") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContextWrap.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
            {children}
        </AuthContextWrap.Provider>
    );
};
export { AuthContextWrap, AuthProvider };