import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({
  className,
  imageUrl,
  caption,
  onClick,
}) => (
  <div className={`card ${className}`}>
    <button type="button" className="card-button" onClick={onClick}>
      <figure>
        <img src={imageUrl} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
    </button>
  </div>
);

Card.defaultProps = {
  className: '',
};

Card.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Card;
