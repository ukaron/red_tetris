import React from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';

const Game = ({ common }) => {
  console.log(common);
  return (
    <div>
      game page
    </div>
  )
}

const mapStateToProps = (state) => ({
  common: CommonSelector(state),
});

export default connect(mapStateToProps)(Game);
