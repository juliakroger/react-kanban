import * as act from '../actions/actionsTypes.js';


const initialState = {
  columns: [
    {title: 'Backlog', tasks: []},
    {title: 'To do', tasks: []},
    {title: 'In Progress', tasks: []},
    {title: 'Testing', tasks: []},
    {title: 'Done', tasks: []},
  ],
};

function compare(first, second) {
  const taskA = first.task.toUpperCase();
  const taskB = second.task.toUpperCase();

  let comparison = 0;
  if (taskA > taskB) {
    comparison = 1;
  }
  else if (taskA < taskB) {
    comparison = -1;
  }
  return comparison;
}

let newState = null;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case act.ADD_TASK:
      newState = state.columns;
      newState[action.payload.column].tasks.push({
        id: Math.random().toString(36).substr(2, 9),
        task: action.payload.task,
        level: action.payload.level,
        date: action.payload.date,
      })
      return {
        ...state,
        columns: newState,
      };

    case act.DELETE_TASK:
      newState = state.columns;
      newState[action.payload.columnIndex].tasks.splice(action.payload.taskIndex, 1);
      return {
        ...state,
        columns: newState,
      };

    case act.MOVE_TASK:
      const columns = state.columns;
      columns[action.columnIndex].tasks.splice(action.taskIndex, 1);
      columns[action.columnIndex + action.direction].tasks.push(action.task);
      return {
        ...state,
        columns: columns,
      };

    case act.ORDENATION_TASK:
      const column = action.payload;
      newState = state.columns;
      newState[column].tasks.sort(compare);
      return {
          ...state,
        columns: newState,
      };

    default:
      return state;
  }
};

export default reducer;