import React, { useState } from "react";
import "./Formcreate.css";
import { useAppSelector } from "../../../reduxstore/hooks/hooks";
import { Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { createFormAPI } from "../../../api/formsapi";
import { useCreateResource } from "../../../hooks/useCreateResource";

interface MyObject {
  [key: string]: string[];
}
interface TagArray {
  name: string;
  choices: string[];
}

const Formcreate = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState<MyObject>({});
  const [tagName, setTagName] = useState("");
  const [tagSelected, setTagSelected] = useState("");
  const [choiceName, setChoiceName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const formsStatus = useAppSelector((state) => state.forms.status);
  const canSave = [name, tags].every(Boolean) && addRequestStatus === "idle";
  const navigate = useNavigate();

  const handleObjectToArray = () => {
    const tagArray = [];
    for (const [key, value] of Object.entries(tagNames)) {
      tagArray.push({
        name: key,
        choices: value,
      });
    }
    return tagArray;
  };

  const { initCreateData } = useCreateResource();

  const onSaveFormClicked = async () => {
    const tagArray = handleObjectToArray();
    if (formsStatus == "failed") {
      alert("503 Service unavialable. Connect server to make a request.");
    }
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        initCreateData(createFormAPI({ name, tags: tagArray }));
        navigate("/");
      } catch (err) {
        console.error("Failed to save the form: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const handleAddTags = () => {
    setTagNames({ ...tagNames, [tagName]: [] });
  };

  const handleAddChoices = () => {
    setTagNames({
      ...tagNames,
      [tagSelected]: [...(tagNames[tagName] || []), choiceName],
    });
  };

  return (
    <div className="Formcreate">
      <Paper className=" border-4 border-dotted shadow-none outline-none p-2 flex flex-col gap-4">
        <div className="FormTitle">CREATE FORM SCHEMA</div>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          label={"Name"}
        />

        <TextField
          onChange={(e) => setTagName(e.target.value)}
          value={tagName}
          label={"TagName"}
        />
        {tagName != "" ? (
          <Button onClick={handleAddTags}>Add Tags</Button>
        ) : (
          <Button variant="contained" disabled>
            Add Tags
          </Button>
        )}

        <div className="flex items-center w-full justify-start flex-wrap gap-4">
          {Object.keys(tagNames)?.map((item, index) => {
            return (
              <div
                key={index}
                className={`tags ${
                  item == tagSelected
                    ? "bg-black text-white"
                    : "text-black bg-white border border-black"
                } cursor-pointer p-2 h-10 flex w-auto rounded-md`}
                onClick={() => {
                  setTagSelected(item);
                }}
              >
                {item}
                <div
                  onClick={() => {
                    const updatedTagNames = { ...tagNames };
                    delete updatedTagNames[item];
                    setTagNames(updatedTagNames);
                  }}
                >
                  <Close />
                </div>
              </div>
            );
          })}
        </div>
        <TextField
          onChange={(e) => setChoiceName(e.target.value)}
          value={choiceName}
          label={"choices"} //optional
        />
        {tagSelected != "" ? (
          <Button onClick={handleAddChoices}>Add Choice</Button>
        ) : (
          <Button variant="contained" disabled>
            Add choice
          </Button>
        )}

        <div className="flex items-center w-full justify-start flex-wrap gap-4">
          {tagNames?.[tagSelected]?.map((item, index) => {
            return (
              <div
                className={`tags  text-black bg-white border border-black
                } cursor-pointer p-2 h-10 flex w-auto rounded-md`}
              >
                {item}
                <div
                  onClick={() => {
                    const updatedArray = tagNames?.[tagSelected]?.filter(
                      (currentItem) => currentItem != item
                    );
                    setTagNames({
                      ...tagNames,
                      [tagSelected]: updatedArray,
                    });
                  }}
                >
                  <Close />
                </div>
              </div>
            );
          })}
        </div>
        {name != "" && Object.keys(tagNames).length > 0 && (
          <Button onClick={onSaveFormClicked}>Submit</Button>
        )}
      </Paper>
    </div>
  );
};

export default Formcreate;
