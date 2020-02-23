import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Modal} from 'semantic-ui-react';
import Header from '../components/Header';
import Column from '../components/Column';
import * as actions from "../store/actions/actionsTypes";


const ModalOptions = [
  {key: 'low', text: 'Low', value: 'low'},
  {key: 'medium', text: 'Medium', value: 'medium'},
  {key: 'high', text: 'High', value: 'high'},
];


const App = ({ onCreateTask, onDeleteTask, handleMove, onOrdenationTask, column}) => {
  // TODO: handle move is with problem with rerender, Alphabetic is 
  const [modalOpen, setModalOpen] = useState(false);
  const [taskAddText, setTaskAddText] = useState('');
  const [taskAddLevel, setTaskAddLevel] = useState('');
  const [columnSelected, setColumnSelected] = useState(null);


 const openModalHandler = () => setModalOpen(true);
 const closeModalHandler = () => setModalOpen(false);
 
 const changeTaskAddText = (event) => setTaskAddText(event.target.value);
 const changeTaskAddLevel = (event) => setTaskAddLevel(event.target.textContent);


  const createTaskHandler = () => {
    let currentDate = new Date().getTime();
    const payload = {
      column: columnSelected,
      task: taskAddText,
      level: taskAddLevel,
      date: currentDate,
    };
    onCreateTask(payload);
    closeModalHandler();
  };

  const addNewTask = (index) => {
    openModalHandler();
    setColumnSelected(index)
  };

  const deleteThisTask = (taskIndex, columnIndex) => {
    onDeleteTask({
      taskIndex: taskIndex,
      columnIndex: columnIndex,
    })
    // forceUpdate();
  };

  const alphabeticOrdenation = (index) => {
    onOrdenationTask(index);
    // forceUpdate();
  };

    return (
        <div>
          <Header/>
          <Modal size='mini' open={modalOpen} onClose={closeModalHandler}>
            <Modal.Header>Create a new task</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <Form.TextArea label='Task' placeholder='Write the task' onChange={changeTaskAddText}/>
                  <Form.Select fluid options={ModalOptions} placeholder='Difficulty level'
                               onChange={changeTaskAddLevel}/>
                </Form.Field>
                <Button.Group>
                  <Button onClick={closeModalHandler}>Cancel</Button>
                  <Button.Or/>
                  <Button positive onClick={createTaskHandler}>Create</Button>
                </Button.Group>
              </Form>
            </Modal.Content>
          </Modal>

          <Grid style={{margin: '8px'}}>
            <Grid.Row columns={5}>
              {
                column.map((column, i) =>
                    <Column
                        column={column}
                        index={i}
                        key={i}
                        openModal={() => addNewTask(i)}
                        deleteThisTask={(index) => deleteThisTask(index, i)}
                        handleMove={(task, taskIndex, direction) => [handleMove(task, i, taskIndex, direction), console.log("calling 2")]}
                        alphabeticOrdenation={() => alphabeticOrdenation(i)}
                    />,
                )
              }
            </Grid.Row>
          </Grid>
        </div>
    );
}

const mapStateToProps = state => {
  return {
    column: state.columns,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTask: (payload) => dispatch({type: actions.ADD_TASK, payload: payload}),
    onDeleteTask: (payload) => dispatch({type: actions.DELETE_TASK, payload: payload}),
    handleMove: (task, columnIndex, taskIndex, direction) => dispatch({
      type: actions.MOVE_TASK,
      task: task,
      columnIndex: columnIndex,
      taskIndex: taskIndex,
      direction: direction,
    }),
    onOrdenationTask: (payload) => dispatch({type: actions.ORDENATION_TASK, payload: payload})

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
