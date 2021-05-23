import React from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';

const Welcome = ({ common }) => {
  console.log(common);
  return (
    <div>
      welcome page
    </div>
  )
}

const mapStateToProps = (state) => ({
  common: CommonSelector(state),
});

export default connect(mapStateToProps)(Welcome);
