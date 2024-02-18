import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Formcontainer from "./components/form/formcontainer/Formcontainer";
import Formcreate from "./components/form/formcreation/Formcreate";
import Dataentriescreate from "./components/dataentries/dataentriescreation/Dataentriescreate";
import Datacontainer from "./components/dataentries/datacontainer/Datacontainer";
import Formview from "./components/form/formview/Formview";
import Formedit from "./components/form/formedit/Formedit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/data" element={<Datacontainer />} />
            <Route index element={<Formcontainer />} />
            <Route path="/createform" element={<Formcreate />} />
            <Route path="/viewform" element={<Formview />}></Route>
            <Route path="/editform" element={<Formedit />}></Route>
            <Route path="/createdata" element={<Dataentriescreate />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
