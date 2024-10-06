import useStore, { IUserProfile } from '@/store/store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

interface UserContextType {
    hasUsers: boolean;
    currentUser: string | null;
    isLoading: boolean;
    login: (userId: string) => void;
    logout: () => void;
    addUser: (user: { name: string; nickname: string; email: string; passcode: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const store = useStore();
    const [isLoading, setIsLoading] = useState(true);

    const hasUsers = Object.keys(store.users).length > 0;

    const addUser = (user: IUserProfile) => {
        user = {
            ...user,
            _id: nanoid()
        };
        store.addUser(user);
        console.log('User added:', user);
    };

    const value = {
        hasUsers,
        currentUser: store.currentUserId,
        isLoading,
        login: store.login,
        logout: store.logout,
        addUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};