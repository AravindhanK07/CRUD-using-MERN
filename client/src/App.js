import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import RetrieveRecord from "./Pages/RetrieveRecord";
import CreateRecord from "./Pages/CreateRecord";
import UpdateRecord from "./Pages/UpdateRecord";
import DeleteRecord from "./Pages/DeleteRecord";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/retrieve-records" element={<RetrieveRecord />} />
          <Route path="/create-record" element={<CreateRecord />} />
          <Route path="/update-record" element={<UpdateRecord />} />
          <Route path="/delete-record" element={<DeleteRecord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
