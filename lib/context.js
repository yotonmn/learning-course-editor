import { createContext, useContext } from "react";

export const defaultSessionState = {
    user: undefined,
    loading: false,
    signIn: () => null,

    signOut: () => null,
};

export const SessionContext = createContext(defaultSessionState);

export const useSession = () => useContext(SessionContext);
