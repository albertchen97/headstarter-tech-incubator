// Display two tables for companies and students and allow students to pick tasks.

import app from "../firebase-config";
import React from "react";
import { ref, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

// Import the realtime database feature
import { getDatabase } from "firebase/database";

// Functions for CRUD (Create, Read, Update, Delete) operations
import { set, get, update, remove, child } from "firebase/database";

const db = getDatabase(app);

export class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  // Retrieve data from the database using snapshot
  componentDidMount() {
    // Get the reference of Student's data
    const dbRef = ref(db, "Student");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }
  render() {
    return (
      <Table>
        <h3>Table</h3>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Task Working</th>
        </tr>

        <tbody>
          {this.state.tableData.map((row, index) => {
            return (
              <tr key="">
                <td>{index}</td>
                <td>{row.key}</td>
                <td>{row.data.Task}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
