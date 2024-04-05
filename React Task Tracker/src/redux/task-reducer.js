const taskReducer = (
  state = {
    task: {
      pending: [],
      inProgress: [],
      completed: [],
      deployed: [],
      deferred: [],
    },
    originalTask: {},
    taskForm: {
      status: "pending",
      title: "",
      desc: "",
      team: "",
      assignee: "",
      priority: "0",
      startDate: new Date(),
    }
  },
  action
) => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return {
        ...state,
        task: formatData(action.payload),
        originalTask: formatData(action.payload)
      };
    case "UPDATE_CLICKED_TASK":
      return {
        ...state,
        taskForm: action.payload
      };

    case "UPDATE_FILTERED_TASK":
      return {
        ...state,
        task: action.payload
      };

    default:
      return state;
  }
};

const formatData = (data) => {
  let task = { pending: [], inProgress: [], completed: [], deployed: [], deferred: [] }

  data.map((item) => {
    task = { ...task, [item.status]: [...task[item.status], item] };
  });
  return task;
};

export default taskReducer;
