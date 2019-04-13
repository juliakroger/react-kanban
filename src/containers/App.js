import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react';
import Header from '../components/Header';
import Column from '../components/Column';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Grid style={{margin: '8px'}}>
          <Grid.Row columns={5}>
              <Column/>
              <Column/>
              <Column/>
              <Column/>
              <Column/>
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

export default connect(mapStateToProps)(App);
