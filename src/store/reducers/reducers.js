import * as act from '../actions/actionsTypes.js';

const initialState = {
  columns : [
    { title: 'Backlog', tasks: [] },
    { title: 'To do', tasks: [] },
    { title: 'In Progress', tasks: [] },
    { title: 'Testing', tasks: [] },
    { title: 'Done', tasks: [] }
  ]
};

const reducer = (state=initialState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default reducer;