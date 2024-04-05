import React, { useState } from "react";
import Modal from "react-modal";

const MenuSection = () => {
  const [searchByName, setSearchByName] = useState("");
  const [searchByPriority, setSearchByPriority] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [sortByPriority, setSortByPriority] = useState("");
  const [newTaskVisible, setNewTaskVisible] = useState(false);

  const handleFormData = () => {

  }

  return (
    <>
      <div className="filter-row">
        <label>
          Filter By:
          <input
            type="text"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
            placeholder="Assignee Name"
          />
          <select name="priorty" className="priority">
            <option value={searchByPriority} selected>
              Priority
            </option>
            <option value="p1">P1</option>
            <option value="p2">P2</option>
            <option value="p3">P3</option>
          </select>
          <input
            type="date"
            value={searchByDate}
            onChange={(e) => setSearchByDate(e.target.value)}
          />
        </label>
        <button onClick={() => setNewTaskVisible(true)} className="new-task">
          Add New Task
        </button>
      </div>
      <div className="sort-row">
        <label>
          Sort By:
          <select name="priorty" className="priority">
            <option value={sortByPriority} selected>
              Priority
            </option>
            <option value="p1">P1</option>
            <option value="p2">P2</option>
            <option value="p3">P3</option>
          </select>
        </label>
      </div>
      <Modal
        isOpen={newTaskVisible}
        onRequestClose={() => setNewTaskVisible(false)}
        style={{
          content: {
            width: "260px",
            height: "370px",
            borderRadius: "4px",
          },
        }}
      >
        <div className="create-modal">
          <h4>CREATE A TASK</h4>
          <i onClick={() => setNewTaskVisible(false)} class="fa fa-window-close" aria-hidden="true"></i>
        </div>
        <form onSubmit={handleFormData} className="new-form">
          <label>Title: <input type="text" /></label>
          <label>DEscription: <input type="textarea" /></label>
          
        </form>
        <button>Submit</button>

      </Modal>
    </>
  );
};

export default MenuSection;
