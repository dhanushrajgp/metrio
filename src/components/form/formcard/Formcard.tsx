import React, { useCallback } from "react";
import "./Formcard.css";
import formimage from "../../../assets/images/form.jpg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import { fetchForm } from "../../../reduxstore/features/forms/formsSlice";
import Formview from "../formview/Formview";
import { ModalContext } from "../../../providers/Modalcontext";

const Formcard = ({
  formName,
  id,
}: {
  formName: string;
  id: string | number;
}) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.forms.form);
  console.log(form);

  const { showModal, setShowModal } = React.useContext<any>(ModalContext as React.Context<any>);
  const getFormDetails = useCallback(() => {
    dispatch(fetchForm({ id }));
    setShowModal(true);
  }, [dispatch]);

  return (
    <div className="card-container">
      <a href="#" className="card">
        <img
          src={formimage}
          alt="balloon with an emoji face"
          className="card__img"
        />
        <span className="card__footer">
          <span>{formName}</span>
          <span></span>
        </span>
        <span className="card__action">
          <svg viewBox="0 0 448 512" xlinkTitle="play">
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        </span>
        <span className="card__action2" onClick={getFormDetails}>
          <svg viewBox="0 0 448 512" xlinkTitle="play">
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        </span>
        
      </a>

    </div>
  );
};

export default Formcard;
