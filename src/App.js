// import "./App.css";
import React, { Fragment } from "react";
import Authentication from "./components/Authentication";
import { Profile } from "./components/Profile";
import { DataTable } from "./components/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <h1>Tech Incubator</h1>
      {/* <Authentication /> */}
      <Profile />
      <br />
      <br />
      <DataTable />
    </Fragment>
  );
}

export default App;
