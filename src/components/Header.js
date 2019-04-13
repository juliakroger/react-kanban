import React from 'react';
import {Segment, Header} from 'semantic-ui-react';

const PageHeader = () => {
  return (
      <Segment textAlign='center' inverted>
        <Header as='h4' color='teal'>React kanban</Header>
      </Segment>
  );
};

export default PageHeader;
