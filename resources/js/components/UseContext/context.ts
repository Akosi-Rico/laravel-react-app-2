import { createContext, useContext } from "react";

interface ContextValue {
    value: string;
}

interface AccessContextValue {
    value: [];
}

export const PublicImagePathContext = createContext<ContextValue | undefined>(undefined);
export const AccountAccessControlContext = createContext<AccessContextValue | undefined>(undefined);

export const usePublicPathImageContext = () => {
    const result = useContext(PublicImagePathContext);
    if (result === undefined) {
        throw new Error("usePublicPathImage must be used with a PublicImageContext!");
    }

    return result;
}

export const useAccessControlContext = () => {
    const result = useContext(AccountAccessControlContext);
    if (result === undefined) {
        throw new Error("AccountAccessControlContext must be used with a AccountAccessControlContext!");
    }

    return result;
}