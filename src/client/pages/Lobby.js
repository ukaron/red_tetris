import React from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';

const Lobby = ({ common }) => {
  console.log(common);
  return (
    <div>
      lobby page
    </div>
  )
}

const mapStateToProps = (state) => ({
  common: CommonSelector(state),
});

export default connect(mapStateToProps)(Lobby);
