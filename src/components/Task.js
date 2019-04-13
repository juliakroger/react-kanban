import React from 'react';
import {Card, List, Icon} from 'semantic-ui-react';

const Task = (props) => {
  return (
      <Card style={{width: '90%', marginLeft: '5%', maxWidth: '300px'}}>
        <Card.Content>
          <List floated='right' horizontal>
            <List.Item><Icon /></List.Item>
          </List>
          <Card.Meta>time</Card.Meta>
          <Card.Description>task</Card.Description>
        </Card.Content>
      </Card>
  );
};

export default Task;