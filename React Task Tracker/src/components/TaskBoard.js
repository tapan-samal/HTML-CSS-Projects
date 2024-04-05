import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import statuses from "../data/status.json";
import { idb } from "../idb";
import DatePicker from "react-datepicker";
import {
  getAllTasks,
  updateClickedTask,
  updateFilteredTask,
} from "../redux/task-action";
import AddEditTask from "./AddEditTask";
import Task from "./Task";
import DeleteTask from "./DeleteTask";
import moment from "moment";


const TaskBoard = () => {
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.taskReducer);
  const [isAddEditTaskVisible, setIsAddEditTaskVisible] = useState(false);
  const [isDeleteTaskVisible, setIsDeleteTaskVisible] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterForm, setFilterForm] = useState({});

  useEffect(() => {
    if(Object.keys(filterForm).length > 0) {
      let filterTask = Object.assign({}, taskStore.originalTask);
      Object.keys(filterForm).forEach((filterItem) => {
        if(filterForm[filterItem] !== "") {
          Object.keys(filterTask).forEach((key) => {
            filterTask[key] = filterTask[key].filter((item) => item[filterItem].includes(filterForm[filterItem]));
          });
        }
      });
      dispatch(updateFilteredTask(filterTask));
    }
  }, [filterForm]);

  useEffect(() => {
    return () => {
      // insertDataInIndexedDb() // load first time for testing
      // window.indexedDB.deleteDatabase("task-tracker"); // delete database from indexedDB
      // get all tasks
      const dbPromise = idb.open("task-tracker", 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction("task", "readonly");
        const task = tx.objectStore("task");
        const tasks = task.getAll();

        tasks.onsuccess = (query) => {
          dispatch(getAllTasks(query.srcElement.result));
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    };
  }, []);

  const handleAddTaskBtnClick = () => {
    dispatch(
      updateClickedTask({
        status: "pending",
        title: "",
        desc: "",
        team: "",
        assignee: "",
        priority: "0",
        startDate: new Date(),
      })
    );
    setIsAddEditTaskVisible(true);
  };

  const handleSortChange = (val) => {
    let filterTask = {};
    Object.keys(taskStore.originalTask).forEach((key) => {
      filterTask[key] = taskStore.originalTask[key].sort((a, b) =>
        val === "priority" ? a[val] - b[val] : a[val].toLowerCase() > b[val].toLowerCase() ? 1 : -1
      );
    });
    dispatch(updateFilteredTask(filterTask));
  }

  const handleDateRangeChange = (val) => {
    if(val[1] !== null) {
      let filterTask = {};
      Object.keys(taskStore.originalTask).forEach((key) => {
        filterTask[key] = taskStore.originalTask[key].filter((item) => moment(item["startDate"]).isBetween(val[0], val[1]));
      });
      dispatch(updateFilteredTask(filterTask));
    }
    setDateRange(val);
  }

  return (
    <>
      <div className="content">
        <div className="d-flex justify-content-between">
          <div>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Filter By:
              </Label>
              <Col sm={3}>
                <Input
                  name="Assignee"
                  size="sm"
                  placeholder="Assignee Name"
                  onChange={(e) => setFilterForm({...filterForm, ["assignee"]: e.target.value})}
                />
              </Col>
              <Col sm={3}>
                <Input
                  name="Priority"
                  type="select"
                  size="sm"
                  placeholder="Priority"
                  onChange={(e) => setFilterForm({...filterForm, ["priority"]: e.target.value})}
                >
                  <option value="">-- Select --</option>
                  <option value="0">P0</option>
                  <option value="1">P1</option>
                  <option value="2">P2</option>
                </Input>
              </Col>
              <Col sm={4}>
              <DatePicker
                  placeholderText="DD/MM/YYYY - DD/MM/YYYY"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(val) => {handleDateRangeChange(val)}}
                  isClearable={true}
                />
              </Col>
            </FormGroup>
          </div>
          <div>
            <Col sm={12}>
              <Button color="primary" onClick={handleAddTaskBtnClick}>
                Add New Task
              </Button>
            </Col>
          </div>
        </div>
        <FormGroup row>
          <Label for="exampleSelect" sm={1}>
            Sort By:
          </Label>
          <Col>
            <Input
              style={{ width: "8.2rem", marginLeft: "-7px" }}
              type="select"
              size="sm"
              onChange={(e)=> handleSortChange(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="assignee">Assignee</option>
              <option value="priority">Priority</option>
            </Input>
          </Col>
        </FormGroup>
        <Row>
          {statuses.map((status, key) => {
            return (
              <Col>
                <Task
                  key={key}
                  status={status}
                  tasks={taskStore.task[status]}
                  isAddEditTaskVisible={(val) => setIsAddEditTaskVisible(val)}
                  isDeleteTaskVisible={(val) => setIsDeleteTaskVisible(val)}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      {isAddEditTaskVisible && (
        <AddEditTask show={(val) => setIsAddEditTaskVisible(val)} />
      )}
      {isDeleteTaskVisible && (
        <DeleteTask show={(val) => setIsDeleteTaskVisible(val)} />
      )}
    </>
  );
};

export default TaskBoard;
