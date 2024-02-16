import { Modal } from "@mui/material";
import React, { useState } from "react";
import { createContext } from "react";


const ModalContext = createContext({} as any);

const ModalContextProvider = ({children}:{children:React.ReactNode}) => {
    const [showModal, setShowModal] = useState(false);
    const [bodyOverflow, setBodyOverflow] = useState("");

    return (
        <ModalContext.Provider value={{showModal, setShowModal, bodyOverflow, setBodyOverflow}}>
            {children}
        </ModalContext.Provider>
    )

}

export {ModalContextProvider, ModalContext}