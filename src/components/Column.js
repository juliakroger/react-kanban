import React from 'react';
import {Button, Grid, Menu} from 'semantic-ui-react';
import Task from './Task';
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '../constants'

const Column = ({alphabeticOrdenation, column, deleteThisTask, handleMove, openModal}) => {
  return (
      <div>
        <Grid.Column style={{minWidth: '300px', marginBottom: '20px', margin: '3px'}}>
          <Button basic color='teal' fluid onClick={alphabeticOrdenation}>Ordenar em ordem alfabetica</Button>
          <Menu fluid vertical>
            <Menu.Item className='header'>{column.title}</Menu.Item>
            <Grid.Row>
              {
                column.tasks.map((task, index) => {
                  return <Task
                      task={task}
                      key={task.id}
                      deleteThisTask={() => deleteThisTask(index)}
                      canMoveLeft={index !== 0}
                      canMoveRight={index !== 4}
                      onMoveLeft={() => handleMove(task, index, DIRECTION_LEFT)}
                      onMoveRight={() => [handleMove(task, index, DIRECTION_RIGHT), console.log("CALLING")]}
                  />
                })
              }
              <Button basic color='teal' fluid onClick={openModal}>Add a new task</Button>
            </Grid.Row>
          </Menu>
        </Grid.Column>
      </div>
  );
};

export default Column;
