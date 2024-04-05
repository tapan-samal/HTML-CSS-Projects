import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  convertPriorityToText,
  headerDetailsByStatus,
} from "../utils/common-utility";
import { useDispatch } from "react-redux";
import { updateClickedTask } from "../redux/task-action";

const Task = (props) => {
  const dispatch = useDispatch();
  const header = headerDetailsByStatus(props.status);

  const handleEditOrDeleteTaskClick = (attr, task) => {
    dispatch(updateClickedTask(task));
    if (attr === "edit") {
      props.isAddEditTaskVisible(true);
    } else {
      props.isDeleteTaskVisible(true);
    }
  };

  return (
    <Card id="task-id">
      <CardHeader className={`${header.bgClass} text-white text-center`}>
        {header.text}
      </CardHeader>
      {props.tasks.map((task, key) => {
        return (
          <CardBody key={key} className="card-body-spacing">
            <CardTitle className="d-flex justify-content-between" tag="h6">
              <span>{task.title}</span>
              <Badge color="primary">
                {convertPriorityToText(task.priority)}
              </Badge>
            </CardTitle>
            <CardText>{task.desc}</CardText>
            <CardTitle className="d-flex justify-content-between" tag="h6">
              <span>{task.assignee}</span>
              <UncontrolledDropdown className="me-2" direction="end">
                <DropdownToggle size="sm" color="primary">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleEditOrDeleteTaskClick("edit", task)}
                  >
                    Edit
                  </DropdownItem>
                  {task.status !== "completed" && task.status !== "deployed" && (
                    <>
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={() =>
                          handleEditOrDeleteTaskClick("delete", task)
                        }
                      >
                        Delete
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardTitle>
            <Badge color="primary" className="staus-badge">
              {header.text}
            </Badge>
          </CardBody>
        );
      })}
    </Card>
  );
};

export default Task;
