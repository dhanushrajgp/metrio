import "./App.css";
import { Counter } from "./components/counter/Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Formcontainer from "./components/form/formcontainer/Formcontainer";
import { ModalContextProvider } from "./providers/Modalcontext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="counter" element={<Counter />} />
          <Route
            path="forms"
            element={
              <ModalContextProvider>
                <Formcontainer />
              </ModalContextProvider>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
