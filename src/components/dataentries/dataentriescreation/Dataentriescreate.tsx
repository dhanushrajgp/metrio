import React, { useContext, useEffect, useState } from "react";
import "./Dataentriescreate.css";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../types/forms";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchAllData,
  fetchForm,
  fetchForms,
  getAllData,
  getDataTags,
  getForm,
  getForms,
} from "../../../reduxstore/features/forms/formsSlice";
import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCreateResource } from "../../../hooks/useCreateResource";
import { createDataAPI } from "../../../api/dataentriesapi";

const Dataentriescreate = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState({});
  const [formId, setFormId] = React.useState("");
  const [tagname, setTagName] = React.useState("");
  const [choicename, setChoiceName] = React.useState("");
  const [choices, setChoices] = useState([]);
  const [value, setValue] = useState(0);
  const [note, setNotes] = useState("");

  const handleTagChange = (event: SelectChangeEvent) => {
    setTags({ ...tags, [event.target.value]: "" });
    getChoices(event.target.value);
    setTagName(event.target.value);
  };

  const handleChoiceChange = (event: SelectChangeEvent) => {
    setTags({ ...tags, [tagname]: event.target.value });
    setChoiceName(event.target.value);
  };

  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(fetchForm({ id: event.target.value }));
    setFormId(event.target.value);
  };

  const formsStatus = useAppSelector((state) => state.forms.status);

  useEffect(() => {
    dispatch(fetchForms());
    dispatch(fetchAllData());
  }, [dispatch]);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave = [formId, tags].every(Boolean) && addRequestStatus === "idle";
  const navigate = useNavigate();

  const { initCreateData } = useCreateResource();

  const onSaveFormClicked = async () => {
    const date = new Date().toJSON().slice(0, 10);
    if (formsStatus == "failed") {
      alert("503 Service unavialable. Connect server to make a request.");
    }
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        initCreateData(createDataAPI({ formId, date, tags, value, note }));
        setTags({});
        setValue(0);
        setChoices([]);
        setChoiceName("");
        setTagName("");
        setFormId("");
        setNotes("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the data: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const forms = useAppSelector(getForms);
  const form = useAppSelector(getForm) as Form;
  const data = useAppSelector(getAllData);
  const tagdata = useAppSelector(getDataTags);

  const getChoices = (tagName: string) => {
    form?.tags?.map(
      (item, index) => item?.name == tagName && setChoices(item?.choices as [])
    );
  };

  return (
    <div className="Formcreate">
      <Paper className=" border-4 border-dotted shadow-none outline-none p-2 flex flex-col gap-4">
        <div className="FormTitle">CREATE DATA</div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Form Schema
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={formId}
            onChange={handleChange}
            label="selectFormSchema"
          >
            {forms?.map((item, index) => {
              return (
                <MenuItem value={item?.id} key={index}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="flex items-center justify-between w-full flex-wrap">
          {formId == "" ? (
            <div className=" w-full p-2">
              <Accordion disabled className="w-1/2 mt-2">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Select Tag</Typography>
                </AccordionSummary>
              </Accordion>
            </div>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 120 }} className=" w-1/2">
              <InputLabel id="demo-simple-select-helper-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={tagname}
                label="Tags"
                onChange={handleTagChange}
              >
                {form?.tags?.map((item, index) => {
                  return <MenuItem value={item?.name}>{item?.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}
          {tagname != "" ? (
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="w-full"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Choices
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={choicename}
                onChange={handleChoiceChange}
                label="selectFormSchema"
              >
                {choices.map((item, index) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ) : (
            <div className=" w-full p-2">
              <Accordion disabled className="w-full mt-2">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Select Choice</Typography>
                </AccordionSummary>
              </Accordion>
            </div>
          )}
        </div>
        <div className="w-full px-2">
          <TextField
            id="standard-multiline-static"
            label="Note"
            multiline
            rows={4}
            className=" w-full"
            defaultValue={note}
            value={note}
            variant="standard"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </div>
        <div className="w-full px-2">
          <TextField
            onChange={(e) => setValue(parseInt(e.target.value))}
            value={value}
            type={"number"}
            label={"Value"}
          />
        </div>
        {formId != "" && <Button onClick={onSaveFormClicked}>Submit</Button>}
      </Paper>
    </div>
  );
};

export default Dataentriescreate;
