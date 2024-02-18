import React from "react";
import "./Datacard.css";
import { Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../reduxstore/hooks/hooks";
import {
  deleteDataEntry,
} from "../../../reduxstore/features/forms/formsSlice";
import image from "../../../assets/images/form.jpg";

const Datacard = ({
  date,
  note,
  tags,
  value,
  id,
}: {
  date: string;
  note?: string;
  tags: {};
  value: number;
  id: string | number;
}) => {
  enum Month {
    JAN = 1,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC,
  }
  const day = date?.substring(8);
  const month = Month[parseInt(date?.substring(6, 8))];
  const year = date?.substring(0, 4);

  const dispatch = useAppDispatch();
  const deleteDataCard = () => {
    dispatch(deleteDataEntry({ id }));
  };

  return (
      <div className="article-card">
        <div className="article-card-icons">
          <div className="data-card-icon">
            <Edit />
          </div>
          <div className="data-card-icon" onClick={deleteDataCard}>
            <DeleteIcon htmlColor="red" />
          </div>
        </div>

        <div className="content">
          <p className="date">
            {month} {day}, {year}
          </p>
          <p className="title">Value: {value}</p>
          <p className="title">Tags: </p>
          <p className="title">
            Note: {note}
          </p>
        </div>
      </div>

  );
};

export default Datacard;
