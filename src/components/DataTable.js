// Display two tables for companies and students and allow students to pick tasks.

import app from "../firebase-config";
import React from "react";
import { ref, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

// Import the realtime database feature
import { getDatabase } from "firebase/database";

// Functions for CRUD (Create, Read, Update, Delete) operations
import { set, get, update, remove, child } from "firebase/database";

const databse = getDatabase(app);

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
    this.interface = this.interface.bind(this);
  }
  componentDidMount() {
    this.setState({
      db: databse,
    });
  }
  render() {
    return (
      <Table>
        <thread>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Company Tasks</th>
          </tr>
        </thread>

        <tbody>
          {this.state.tableData.map((row, index) => {
            <tr key="">
              <td>{index}</td>
              <td></td>
              <td></td>
            </tr>;
          })}
        </tbody>
      </Table>
    );
  }

  // Update the user interface
  interface(event) {
    const id = event.target.id;

    if (id === "addBtn") {
      this.addData();
    }

    if (id === "deleteBtn") {
      this.deleteData();
    }
  }

  // Get the inputs
  getAllInputs() {
    return {
      username: this.state.username,
      usertype: this.state.usertype,
    };
  }

  addData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    // Store data to Firebase database
    // Companies and students are stored in different folders
    set(ref(db, data.usertype + "/" + data.username), {
      Username: data.username,
      Usertype: data.usertype,
    })
      .then(() => {
        alert("Data was added successfully!");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  deleteData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    // Remove data from the Firebase database
    remove(ref(db, data.usertype + "/" + data.username), {})
      .then(() => {
        alert("Data was deleted successfully!");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }
}
