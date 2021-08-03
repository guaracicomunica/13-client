import { createContext, useState } from 'react';

export const LoadingContext = createContext({loading: true, setLoading: undefined });

export const LoadingProvider = ({ children }) =>
{
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}