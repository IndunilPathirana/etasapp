import React, { createContext, ReactNode, useContext, useState } from "react"

// Define the types for snackbar and context
interface SnackBar {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    // Add other properties if needed
}

interface SnackBarContextType {
    snackBars: (SnackBar | null)[];
    addSnackBar: (snackbar: SnackBar) => void;
    removeSnackBar: (index: number) => void;
    resetSnackBar: () => void;
}

interface SnackBarProviderProps {
    children: ReactNode;
}

export const SnackBarContextDefault = {
    snackBars: [],
    addSnackBar: () => { },
    removeSnackBar: () => { },
    resetSnackBar: () => { }
}

export const SnackBarContext = createContext<SnackBarContextType>(SnackBarContextDefault);

export const SnackBarProvider: React.FC<SnackBarProviderProps>  = (props) => {
    const [snackBars, setSnackBars] = useState<(SnackBar | null)[]>([]);

    const addSnackBar = (snackbar: SnackBar) => {
        setSnackBars((prevSnackBars) => [...prevSnackBars, snackbar]);
    }

    const removeSnackBar = (index:number) => {
        let newSnackBars = [...snackBars];
        newSnackBars[index] = null;
        setSnackBars(newSnackBars);
    };

    const resetSnackBar = () => {
        setSnackBars([]);
    }

    const value = {
        snackBars,
        addSnackBar,
        removeSnackBar,
        resetSnackBar
    }

    return <SnackBarContext.Provider value={value} {...props} />
}

export const useSnackBars = (): SnackBarContextType => {
    const context = useContext(SnackBarContext);
    return context;
}