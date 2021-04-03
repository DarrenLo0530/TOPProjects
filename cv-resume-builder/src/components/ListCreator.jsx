import React from 'react';
import PropTypes from 'prop-types';

function ListCreator({
  createText,
}) {
  return (
    <div>
      <ul className="list-container" />

      <button type="submit">{createText}</button>
    </div>
  );
}

ListCreator.propTypes = {
  createText: PropTypes.string.isRequired,
};

export default ListCreator;
