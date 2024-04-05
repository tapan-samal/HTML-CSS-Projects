import React from "react";
import "../assets/main.css";
import profile from "../assets/profile.jpg";
import MenuSection from "./MenuSection";
import ListSection from "./ListSection";
import Sidebar from "./Sidebar";

const TaskBoard = () => {
  return (
    <div className="container">
      <div className="container-left">
        <Sidebar />
      </div>
      <div className="container-right">
        <header className="header">
          <h2>Task Board</h2>
          <img src={profile} alt="profile" />
        </header>
        <div className="main-section">
          <MenuSection />
          <div style={{ display: "flex", gap: '12px' }}>
            <ListSection header="Pending" style={{backgroundColor:'grey'}}/>
            <ListSection header="In Progress" style={{backgroundColor:'orange'}}/>
            <ListSection header="Completed" style={{backgroundColor:'green'}}/>
            <ListSection header="Deployed" style={{backgroundColor:'blue'}}/>
            <ListSection header="Deffered" style={{backgroundColor:'red'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
