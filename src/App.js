import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Events from "./pages/Events/Events";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Checkin from "./pages/Checkin/Checkin";
import Groups from "./pages/Groups/Groups";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import Manage from "./pages/Manage/Manage";
import CreateAdmin from "./pages/CreateAdmin/CreateAdmin";
import Profile from "./pages/Profile/Profile";
import EventDetail from "./pages/EventDetail/EventDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/events/createEvent" element={<CreateEvent />}></Route>
          <Route path="/check-in" element={<Checkin />}></Route>
          <Route path="/groups" element={<Groups />}></Route>
          <Route path="/groups/create" element={<CreateGroup />}></Route>
          <Route path="/manage" element={<Manage />}></Route>
          <Route path="/manage/createAdmin" element={<CreateAdmin />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/events/eventDetail" element={<EventDetail />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
