import { createContext, useContext } from "react";

interface ContextValue {
    value: string;
}

interface UserInfo {
    name: string;
    currentDate: string;
}

export const PublicImagePathContext = createContext<ContextValue | undefined>(undefined);

export const usePublicPathImageContext = () => {
    const result = useContext(PublicImagePathContext);
    if (result === undefined) {
        throw new Error("usePublicPathImage must be used with a PublicImageContext!");
    }

    return result;
}