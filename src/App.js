// import "./App.css";
import React, { Fragment } from "react";
import Authentication from "./components/Authentication";
import { Profile } from "./components/Profile";
import { CompanyTable } from "./components/CompanyTable";
import { StudentTable } from "./components/StudentTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <h1>Tech Incubator</h1>
      <Authentication />
      <h2>Profile</h2>
      <Profile />
      <br />
      <br />
      <h2>Company Table</h2>
      <CompanyTable />
      <br />
      <br />
      <h2>Student Table</h2>
      <StudentTable />
    </Fragment>
  );
}

export default App;
