import React from 'react';
import {Card, List, Icon} from 'semantic-ui-react';
import Moment from 'react-moment';

const Task = (props) => {
  let color = 'grey';
  if (props.task.level === 'Low') color = 'yellow';
  else if (props.task.level === 'Medium') color = 'green';
  else if (props.task.level === 'High') color = 'red';

  return (
      <Card color={color} style={{width: '90%', marginLeft: '5%', maxWidth: '300px'}}>
        <Card.Content>
          <List floated='right' horizontal>
            <List.Item><Icon name='remove circle' color='teal' onClick={() => props.deleteThisTask(props.task)} style={{cursor: 'pointer'}}/></List.Item>
          </List>
          <Card.Meta><Moment fromNow>{props.task.date}</Moment></Card.Meta>
          <Card.Description>{props.task.task}</Card.Description>
        </Card.Content>
      </Card>
  );
};

export default Task;