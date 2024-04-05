export const getAllTasks = (data) => {
  return {
    type: "GET_ALL_TASKS",
    payload: data,
  };
};

export const updateClickedTask = (data) => {
  return {
    type: "UPDATE_CLICKED_TASK",
    payload: data,
  };
};

export const updateFilteredTask = (data) => {
  return {
    type: "UPDATE_FILTERED_TASK",
    payload: data
  };
};

