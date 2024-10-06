import useStore, { IUserProfile } from '@/store/store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import { useRouter } from 'expo-router';

interface UserContextType {
    hasUsers: boolean;
    currentUser: string | null;
    isLoading: boolean;
    login: (user: IUserProfile) => void;
    logout: () => void;
    addUser: (user: IUserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const store = useStore();
    const { replace } = useRouter();
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

    useEffect(() => {
        const checkUserStatus = async () => {
            setIsLoading(true);
            if (store.currentUserId) {
                replace('/(drawer)/(tabs)');
            } else if (!hasUsers) {
                replace('/(onboarding)');
            } else {
                replace('/(onboarding)/returning');
            }
            setIsLoading(false);
        };
        checkUserStatus();
    }, [store.currentUserId, hasUsers]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};