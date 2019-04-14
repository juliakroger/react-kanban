import React, {Component} from 'react';
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

class App extends Component {
  state = {
    modalOpen: false,
    taskAddText: '',
    taskAddLevel: '',
    columnSelected: null,
  };

  createTaskHandler = () => {
    let currentDate = new Date().getTime();
    const payload = {
      column: this.state.columnSelected,
      task: this.state.taskAddText,
      level: this.state.taskAddLevel,
      date: currentDate,
    };
    this.props.onCreateTask(payload);
    this.closeModalHandler();
  };

  addNewTask = (index) => {
    this.openModalHandler();
    this.setState({columnSelected: index})
  };

  deleteThisTask = (taskIndex, columnIndex) => {
    this.props.onDeleteTask({
      taskIndex: taskIndex,
      columnIndex: columnIndex,
    })
    this.forceUpdate();
  };

  handleMove = (task, columnIndex, taskIndex, direction) => {
    this.props.handleMove(task, columnIndex, taskIndex, direction);
    this.forceUpdate();
  };

  closeModalHandler = () => this.setState({modalOpen: false});
  openModalHandler = () => this.setState({modalOpen: true});
  changeTaskAddText = (event) => this.setState({taskAddText: event.target.value});
  changeTaskAddLevel = (event) => this.setState({taskAddLevel: event.target.textContent});

  render() {
    return (
        <div>
          <Header/>

          <Modal size='mini' open={this.state.modalOpen} onClose={this.closeModalHandler}>
            <Modal.Header>Create a new task</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <Form.TextArea label='Task' placeholder='Write the task' onChange={this.changeTaskAddText}/>
                  <Form.Select fluid options={ModalOptions} placeholder='Difficulty level'
                               onChange={this.changeTaskAddLevel}/>
                </Form.Field>
                <Button.Group>
                  <Button onClick={this.closeModalHandler}>Cancel</Button>
                  <Button.Or/>
                  <Button positive onClick={this.createTaskHandler}>Create</Button>
                </Button.Group>
              </Form>
            </Modal.Content>
          </Modal>

          <Grid style={{margin: '8px'}}>
            <Grid.Row columns={5}>
              {
                this.props.column.map((column, i) =>
                    <Column
                        column={column}
                        index={i}
                        key={i}
                        openModal={() => this.addNewTask(i)}
                        deleteThisTask={(index) => this.deleteThisTask(index, i)}
                        handleMove={(task, taskIndex, direction) => this.handleMove(task, i, taskIndex, direction)}
                    />,
                )
              }
            </Grid.Row>
          </Grid>
        </div>
    );
  }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
