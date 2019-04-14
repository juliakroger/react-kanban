import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Form, Button} from 'semantic-ui-react';
import Header from '../components/Header';
import Column from '../components/Column';
import * as actions from "../store/actions/actionsTypes";

const ModalOptions = [
  { key: 'low', text: 'Low', value: 'low' },
  { key: 'medium', text: 'Medium', value: 'medium' },
  { key: 'high', text: 'High', value: 'high' },
];

class App extends Component {
  state = {
    modalOpen: false,
    taskAddText: '',
    taskAddLevel: '',
    columnSelected: null
  };

  createTaskHandler = () => {
    let currentDate = new Date().getTime();
    const payload = {
      column: this.state.columnSelected,
      task: this.state.taskAddText,
      level: this.state.taskAddLevel,
      date: currentDate
    };
    this.props.onCreateTask(payload);
    this.closeModalHandler();
  };

  addNewTask = (index) => {
    this.openModalHandler();
    this.setState({columnSelected: index})
  };

  closeModalHandler = () => this.setState({ modalOpen: false });
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
                <Form.Select fluid options={ModalOptions} placeholder='Difficulty level' onChange={this.changeTaskAddLevel} />
              </Form.Field>
              <Button.Group>
                <Button onClick={this.closeModalHandler}>Cancel</Button>
                <Button.Or />
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
                  />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
