// Profile Component: CRUD operations for companies and students
import "../App.css";
import React from "react";
import app from "../firebase-config";
// Import the realtime database feature
import { getDatabase } from "firebase/database";

// Functions for CRUD (Create, Read, Update, Delete) operations
import { ref, set, push, get, update, remove, child } from "firebase/database";

const databse = getDatabase(app);

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      username: "",
      usertype: "Company",
      task: "",
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
      <div>
        {/* Input area for username, user type, and task */}
        <label>Enter Username: </label>
        <input
          type="text"
          id="username"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ username: event.target.value });
          }}
        />
        <br />
        <br />
        <label>Select User Type: </label>
        <select
          value={this.state.value}
          onChange={(event) => {
            this.setState({ usertype: event.target.value });
          }}>
          <option value="Company">Company</option>
          <option value="Student">Student</option>
        </select>
        <br />
        <br />
        <label>Enter Task: </label>
        <input
          type="text"
          id="task"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ task: event.target.value });
          }}
        />
        <br />
        <br />
        {/* Buttons for CRUD data operations */}
        <button id="addBtn" onClick={this.interface}>
          Add
        </button>
        {/* <button id="updateBtn" onClick={this.interface}>
          Update
        </button> */}
        <button id="deleteBtn" onClick={this.interface}>
          Delete
        </button>
        {/* <button id="showBtn" onClick={this.interface}>
          Show Profile
        </button> */}
        {/* <h2>Incubator List</h2>
        <table>
          <tr>
            <td>User Type</td>
            <td>Username</td>
            <td>Task</td>
          </tr>
          <tr>
            <td id="userTypeTd"></td>
            <td id="usernameTd"></td>
            <td id="taskTd"></td>
          </tr>
        </table> */}
      </div>
    );
  }

  // Update the user interface
  interface(event) {
    const id = event.target.id;

    if (id === "addBtn") {
      this.addData();
    }
    // if (id === "updateBtn") {
    //   this.updateData();
    // }
    if (id === "deleteBtn") {
      this.deleteData();
    }
    // if (id === "showBtn") {
    //   this.showData();
    // }
  }

  // Get the inputs
  getAllInputs() {
    return {
      username: this.state.username,
      usertype: this.state.usertype,
      task: this.state.task,
    };
  }

  addData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    // Store data to Firebase database
    // Companies and students are stored in different folders
    set(ref(db, data.usertype + "/" + data.username), {
      UserName: data.username,
      UserType: data.usertype,
      Task: data.task,
    })
      .then(() => {})
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }
  // updateData() {
  //   const db = this.state.db;
  //   const data = this.getAllInputs();

  //   // Update data on the Firebase database
  //   update(ref(db, data.usertype + "/" + data.username), {
  //     Username: data.username,
  //     Usertype: data.usertype,
  //     Task: data.task,
  //   })
  //     .then(() => {
  //       alert("Data was updated successfully!");
  //     })
  //     .catch((error) => {
  //       alert("There was an error, details: " + error);
  //     });
  // }
  deleteData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    // Remove data from the Firebase database
    remove(ref(db, data.usertype + "/" + data.username), {})
      .then(() => {})
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }
  //   showData() {
  //     // Databse reference location
  //     const dbref = ref(this.state.db);
  //     // Username to show data of
  //     const username = this.getAllInputs().username;

  //     // Get the user's data from Firebase and store in the snapshot
  //     get(child(dbref, "UserProfile/" + username))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           // Show the data of the corresponding username
  //           document.getElementById("usernameTd").innerHTML = username;
  //           document.getElementById("userTypeTd").innerHTML =
  //             snapshot.val().Usertype;
  //           document.getElementById("taskTd").innerHTML = snapshot.val().Task;
  //         }
  //       })
  //       .catch((error) => {
  //         alert("Error: " + error);
  //       });
  //   }
}
