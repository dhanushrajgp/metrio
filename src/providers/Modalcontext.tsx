import { Modal } from "@mui/material";
import React, { useState } from "react";
import { createContext } from "react";


const ModalContext = createContext({} as any);

const ModalContextProvider = ({children}:{children:React.ReactNode}) => {
    const [showModal, setShowModal] = useState(false);
  

    return (
        <ModalContext.Provider value={{showModal, setShowModal}}>
            {children}
        </ModalContext.Provider>
    )

}

export {ModalContextProvider, ModalContext}