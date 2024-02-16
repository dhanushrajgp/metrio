import React, { useEffect, useState } from "react";
import "./Modal.css";

export const Modal = ({ children }: { children?: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

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
