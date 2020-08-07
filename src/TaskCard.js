import React from "react";

class TaskCard extends React.Component {
  render() {
    return (
      <div className="card h-100" style={{ marginBottom: "10px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-11 ">
              <span className="card-body">
                <h3 className="card-title"> {this.props.taskName}</h3>
                <h5 className="card-text"> {this.props.taskDesc}</h5>
              </span>
            </div>
            <div className="col container alert-secondary rounded d-flex justify-content-center">
              <input
                type="checkbox"
                className="h-100 w-50"
                style={{ minHeight: "20px", minWidth: "20px" }}
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
