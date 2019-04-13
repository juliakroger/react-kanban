import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
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
