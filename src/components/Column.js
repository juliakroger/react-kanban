import React from 'react';
import {Button, Grid, Menu} from 'semantic-ui-react';
import Task from './Task';


const DIRECTION_LEFT = -1;
const DIRECTION_RIGHT = 1;

const Column = (props) => {
  return (
      <div>
        <Grid.Column style={{minWidth: '300px', marginBottom: '20px', margin: '3px'}}>
          <Button basic color='teal' fluid onClick={props.alphabeticOrdenation}>Ordenar em ordem alfabetica</Button>
          <Menu fluid vertical>
            <Menu.Item className='header'>{props.column.title}</Menu.Item>
            <Grid.Row>
              {
                props.column.tasks.map((task, index) => {
                  return <Task
                      task={task}
                      key={task.id}
                      deleteThisTask={() => props.deleteThisTask(index)}
                      canMoveLeft={props.index !== 0}
                      canMoveRight={props.index !== 4}
                      onMoveLeft={() => props.handleMove(task, index, DIRECTION_LEFT)}
                      onMoveRight={() => props.handleMove(task, index, DIRECTION_RIGHT)}
                  />
                })
              }
              <Button basic color='teal' fluid onClick={props.openModal}>Add a new task</Button>
            </Grid.Row>
          </Menu>
        </Grid.Column>
      </div>
  );
};

export default Column;
