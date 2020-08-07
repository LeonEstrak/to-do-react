import React from "react";
import "./App.css";
import TaskCard from "./TaskCard.js";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Axios from "axios";

const TaskList = (tasks) =>
  tasks.map((task) => (
    <TaskCard
      key={task.taskName}
      taskName={task.taskName}
      taskDesc={task.taskDesc}
    />
  ));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tasks: [
        {
          taskName: "Task 1",
          taskDesc: "Task 1 Desc",
          completed: false,
        },
        {
          taskName: "Task 2",
          taskDesc: "Task 2 Desc",
          completed: false,
        },
      ],
      tempName: "",
      tempDesc: "",
    };
  }

  updateTaskList = () => {
    Axios.get("http://localhost:5000/task/")
      .then((result) => {
        // console.log()
        this.setState({ tasks: result.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.updateTaskList();
  }

  addTask = (e) => {
    e.preventDefault();
    let newTask = {
      taskName: this.state.tempName,
      taskDesc: this.state.tempDesc,
      completed: false,
    };
    Axios.post("http://localhost:5000/task/add", newTask)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // let newTaskList = [...this.state.tasks, newTask];
    // this.setState({
    //   tasks: newTaskList,
    //   tempName: "",
    //   tempDesc: "",
    // });
    this.updateTaskList();
    this.toggleModal();
  };

  toggleModal = () => this.setState({ modal: !this.state.modal });

  Modal() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add a Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  name="taskName"
                  id="taskName"
                  value={this.state.tempName}
                  placeholder="Task Name"
                  onChange={(e) => {
                    this.setState({ tempName: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="taskDesc"
                  id="taskDesc"
                  value={this.state.tempDesc}
                  placeholder="Task Description"
                  onChange={(e) => {
                    this.setState({ tempDesc: e.target.value });
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.addTask}>
              Submit
            </Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 className="text-white text-center">To Do List</h1>
        <br />
        {TaskList(this.state.tasks)}
        <br />
        {this.Modal()}
        <button
          className="btn btn-primary btn-block"
          style={{ bottom: "10%", marginBottom: "20px" }}
          onClick={this.toggleModal}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          +
        </button>
      </div>
    );
  }
}

export default App;
