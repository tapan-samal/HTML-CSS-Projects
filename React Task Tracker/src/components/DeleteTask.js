import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { idb } from "../idb";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/task-action";

function DeleteTask(props) {
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.taskReducer);
  const [taskForm, setTaskForm] = useState(taskStore.taskForm);

  const handleModalClose = () => {
    props.show(false);
  };

  const handleDeleteTask = () => {
    const dbPromise = idb.open("task-tracker", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("task", "readwrite");
      const store = tx.objectStore("task");
      const task = store.delete(taskForm.id);
      task.onsuccess = (query1) => {
        const tasks = store.getAll();
        tasks.onsuccess = (query1) => {
          console.log("result::", query1.srcElement.result);
          dispatch(getAllTasks(query1.srcElement.result));
        };
      };
      tx.oncomplete = function () {
        db.close();
      };
      handleModalClose();
    };
  };
  console.log("task>>>>>", taskStore);
  return (
    <div>
      <Modal isOpen={true} toggle={handleModalClose} unmountOnClose={true}>
        <ModalHeader toggle={handleModalClose}>Delete Task</ModalHeader>
        <ModalBody>Do you want to delete this task?</ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={handleDeleteTask}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={handleModalClose}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteTask;
