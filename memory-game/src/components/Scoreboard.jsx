import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Scoreboard.css';

const Scoreboard = ({
  currScore,
  highScore,
}) => (
  <header className="scoreboard">
    <div className="scores">
      <div className="current-score">
        <span>Current Score:</span>
        <span>{currScore}</span>
      </div>
      <div className="high-score">
        <span>High Score:</span>
        <span>{highScore}</span>
      </div>
    </div>
  </header>
);

Scoreboard.propTypes = {
  currScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Scoreboard;
