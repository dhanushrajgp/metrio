import React, { useState } from "react";
import "./Datacard.css";
import { Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../reduxstore/hooks/hooks";

import image from "../../../assets/images/form.jpg";
import {
  deleteDataEntryAPI,
  fetchAllDataEntriesAPI,
} from "../../../api/dataentriesapi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataDeleted } from "../../../reduxstore/features/forms/formsSlice";

const Datacard = ({
  date,
  note,
  tags,
  value,
  id,
}: {
  date: string;
  note?: string;
  tags: { [key: string]: string };
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
  const dispatch = useDispatch();
  const [tagSelected, setTagSelected] = useState("");

  const deleteDataCard = () => {
    deleteDataEntryAPI(id);
    dispatch(dataDeleted({ id }));
  };
 

  const navigate = useNavigate();
  const handleEditData = () => {
    localStorage.setItem("dataEntryId", JSON.stringify({ id: id }));
    navigate(`/editdata`);
  };

  return (
    <div className="article-card">
      <div className="article-card-icons">
        <div className="data-card-icon" onClick={handleEditData}>
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
        <div className="title">
          Tags:
          <div className="flex items-center w-full justify-start flex-wrap gap-4">
            {Object.keys(tags).map((item, index) => {
              return (
                <div key={index} className="tag-choice-container">
                  <div
                    key={index}
                    className={`tags bg-black text-white cursor-pointer p-2 h-8 flex items-center w-auto rounded-md`}
                    onClick={() => {
                      setTagSelected(item);
                    }}
                  >
                    {item}
                  </div>
                  <div className=" bg-white text-black cursor-pointer p-2 h-8 flex w-auto items-center rounded-md">{tags[item]}</div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="title">Note: {note}</p>
      </div>
    </div>
  );
};

export default Datacard;
