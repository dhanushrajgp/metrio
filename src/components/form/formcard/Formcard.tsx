import React, { useCallback } from "react";
import "./Formcard.css";
import formimage from "../../../assets/images/form.jpg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  deleteDataEntry,
  deleteForm,
  fetchDataEntries,
  fetchForm,
  getDataEntries,
} from "../../../reduxstore/features/forms/formsSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataEntries } from "../../../types/forms";
import { useNavigate } from "react-router-dom";

const Formcard = ({
  formName,
  id,
}: {
  formName: string;
  id: string | number;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getFormDetails = useCallback(() => {
    dispatch(fetchForm({ id }));
    dispatch(fetchDataEntries({ formId: id }));
    navigate("/viewform");
  }, [dispatch]);

  const getdataentries = useAppSelector(getDataEntries);

  const deleteFormCard = () => {
    dispatch(fetchDataEntries({ formId: id }));
    getdataentries.forEach((item) => {
      dispatch(deleteDataEntry({ id: item?.id }));
    });
    dispatch(deleteForm({ id }));
  };

  const editFormCard = useCallback(()=>{
    localStorage.setItem("formId",JSON.stringify({id: id}));
    dispatch(fetchForm({ id: id }));
    navigate(`/editform`);
  },[dispatch]);


  return (
    <div className="card-container">
      <div className="card" onClick={getFormDetails}>
        <img
          src={formimage}
          alt="balloon with an emoji face"
          className="card__img"
        />
        <span className="card__footer">
          <span>{formName}</span>
          <span></span>
        </span>
        <span
          className="card__action"
          onClick={(e) => {
            e.stopPropagation();
            deleteFormCard();
          }}
        >
          <DeleteIcon htmlColor="red" />
        </span>
        <span
          className="card__action2"
          onClick={(e) => {
            e.stopPropagation();
            editFormCard();
          }}
        >
          <Edit />
        </span>
        <span className="card__action3">
          <VisibilityIcon />
        </span>
      </div>
    </div>
  );
};

export default Formcard;
