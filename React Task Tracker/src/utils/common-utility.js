export const headerDetailsByStatus = (status) => {
  let header = { text: "", bgClass: "" };

  if (status === "pending") {
    header = { ...header, text: "Pending", bgClass: "bg-secondary" };
  } else if (status === "inProgress") {
    header = { ...header, text: "In Progress", bgClass: "bg-warning" };
  } else if (status === "completed") {
    header = { ...header, text: "Completed", bgClass: "bg-success" };
  } else if (status === "deployed") {
    header = { ...header, text: "Deployed", bgClass: "bg-info" };
  } else if (status === "deferred") {
    header = { ...header, text: "Deferred", bgClass: "bg-danger" };
  }
  return header;
};

export const convertPriorityToText = (priority) => {
  priority = priority === "0" ? "P0" : priority === "1" ? "P1" : "P2";
  return priority;
}