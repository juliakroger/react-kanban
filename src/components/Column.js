import React from 'react';
import {Grid, Menu, Button} from 'semantic-ui-react';
import Task from './Task';

const Column = (props) => {
  return (
      <div>
        <Grid.Column style={{minWidth: '300px', marginBottom: '20px', margin: '3px'}}>
          <Menu fluid vertical>
            <Menu.Item className='header'>title</Menu.Item>
            <Grid.Row>
              <Task />
              <Button basic color='teal' fluid onClick={props.openModal}>Add a new task</Button>
            </Grid.Row>
          </Menu>
        </Grid.Column>
      </div>
  );
}

export default Column;
