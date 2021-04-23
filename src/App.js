import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GlobalContext } from "./service/hooks/GlobalContext.js";
import ShowStudentDetails from "./components/ShowStudentDetails.js";
import error from "./components/404.js";
import HomePage from "./components/Homepage.js";
import Students from "./components/Students.js";
import "./App.css";

function App() {
  const [studentsInCollege, setStudentsInCollege] = useState("");
  const [college, setCollege] = useState([]);
  const [similarCollege, setSimilarCollege] = useState([]);

  return (
    <Router>
      <GlobalContext.Provider
        value={{
          studentsInCollege,
          setStudentsInCollege,
          college,
          setCollege,
          similarCollege,
          setSimilarCollege,
        }}
      >
        <Switch>
          <Route exact path="/collegedetails/:collegeID" component={Students} />
          <Route exact path="/studentdetails/:studentID" component={ShowStudentDetails} />
          <Route exact path="/Homepage" component={HomePage} />
          <Route path="/" component={error} />
        </Switch>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
