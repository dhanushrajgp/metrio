import React, { useContext, useEffect, useState } from "react";
import "./Modal.css";
import { ModalContext } from "../../providers/Modalcontext";

export const Modal = ({ children }: { children?: React.ReactNode }) => {
 
  const { showModal, setShowModal } = React.useContext<any>(ModalContext as React.Context<any>);
  const [bodyOverflow, setBodyOverflow] = useState("");
  useEffect(() => {
    if (showModal) {
      setBodyOverflow(document.body.style.overflow);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflow;
    }
    return () => {
      document.body.style.overflow = bodyOverflow;
    };
  }, [showModal, bodyOverflow]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="thin-scrollbar"
          id="Modalbackground"
        >
          <div
            onClick={(e:any) => e.stopPropagation()}
            className="thin-scrollbar"
            id="Modalcontent"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
