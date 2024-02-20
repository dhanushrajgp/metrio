import React, { useCallback } from "react";
import "./Formcard.css";
import formimage from "../../../assets/images/form.jpg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchDataEntries,
  fetchForm,
  formDeleted,
  getDataEntries,
} from "../../../reduxstore/features/forms/formsSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataEntries } from "../../../types/forms";
import { useNavigate } from "react-router-dom";
import {
  deleteDataEntryAPI,
  fetchFormDataEntriesAPI,
} from "../../../api/dataentriesapi";
import { useResource } from "../../../hooks/useResource";
import { deleteFormAPI} from "../../../api/formsapi";

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
    localStorage.setItem("formId", JSON.stringify({ id: id }));
    dispatch(fetchForm({ id }));
    dispatch(fetchDataEntries({ formId: id }));
    navigate("/viewform");
  }, [dispatch]);

 
  const { data } = useResource(fetchFormDataEntriesAPI(id)) as unknown as {
    data: DataEntries[];
  };

  const deleteFormCard = () => {
    data.forEach((item) => {
      deleteDataEntryAPI(item?.id);
    });
    deleteFormAPI(id);
    dispatch(formDeleted({id}));

  };

  const editFormCard = useCallback(() => {
    localStorage.setItem("formId", JSON.stringify({ id: id }));
    dispatch(fetchForm({ id: id }));
    navigate(`/editform`);
  }, [dispatch]);

  return (
    <div className="card-container">
      <div className="card" >
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
        <span className="card__action3" onClick={getFormDetails}>
          <VisibilityIcon />
        </span>
      </div>
    </div>
  );
};

export default Formcard;
