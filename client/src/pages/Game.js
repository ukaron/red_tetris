import React from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';
import { PlayField } from "../components/PlayField";

const Game = ({ common }) => {
  console.log(common);
  return (
    <div>
      <PlayField/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  common: CommonSelector(state),
});

export default connect(mapStateToProps)(Game);
