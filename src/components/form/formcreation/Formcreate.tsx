import React, { useState } from "react";
import "./Formcreate.css";
import { Modal } from "../../Modal/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  addNewForm,
  getFormsLength,
} from "../../../reduxstore/features/forms/formsSlice";
import { Button, Paper, TextField } from "@mui/material";

const Formcreate = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useAppDispatch();
  const length = useAppSelector(getFormsLength);
  const id = (length + 1).toString();

  const canSave = [id, name, tags].every(Boolean) && addRequestStatus === "idle";

  const onSaveFormClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewForm({  id, name, tags })).unwrap();
        setName("");
        setTags([]);
      } catch (err) {
        console.error("Failed to save the form: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="Formcreate">
      <Modal>
        <Paper className=" border-4 border-dotted shadow-none outline-none p-2">
          <h2>Form Demo</h2>
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            label={"Name"} //optional
          />
          <Button onClick={onSaveFormClicked}>Submit</Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default Formcreate;
