import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllProfiles from "./components/developers/AllProfiles";
import FullProfile from "./components/developers/FullProfile";
import Dashboard from "./components/dashboard/Dashboard";
import Education from "./components/dashboard/Education";
import Experience from "./components/dashboard/Experience";
import EditProfile from "./components/EditProfile";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/developers" exact>
            <AllProfiles />
          </Route>
          <Route path="/developers/:handle">
            <FullProfile />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/education">
            <Education />
          </Route>
          <Route path="/experience">
            <Experience />
          </Route>
          <Route path="/edit-profile">
            <EditProfile />
          </Route>
          <Route path="/my-profile">
            <MyProfile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
