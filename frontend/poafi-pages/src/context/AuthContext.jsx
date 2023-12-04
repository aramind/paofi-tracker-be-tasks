import { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const AuthContextProvider = ({ children }) => {
    const initialData = {
        userId: 0,
        firstName: '',
        accessLevel: 0,
        accessToken: '',
        refreshToken: ''
    };

    const [credential, setCredential] = useState(() => {
        // Try to retrieve data from localStorage on component mount
        const storedData = localStorage.getItem('credential');
        return storedData ? JSON.parse(storedData) : initialData;
    });

    const updateCredential = (newData) => {
        setCredential((prevData) => ({ ...prevData, ...newData }));
    };

    const logout = () => {
        // Clear stored credentials in localStorage
        localStorage.removeItem('credential');
        // Reset the credential state
        setCredential(initialData);
    };

    useEffect(() => {
        // Save data to localStorage whenever it changes
        localStorage.setItem('credential', JSON.stringify(credential));
    }, [credential]);

    return (
        <Context.Provider value={{ credential, updateCredential, logout }}>
            {children}
        </Context.Provider>
    );
};

export const AuthContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }

    return context;
};
