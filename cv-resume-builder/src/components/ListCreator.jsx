import React from 'react';
import PropTypes from 'prop-types';

function ListCreator({
  header,
  list,
  createText,
}) {
  const listElements = list.map((listString) => <li className="listItem">{listString}</li>);
  return (
    <div>
      { header ? (<h3>{header}</h3>) : ''}
      <ul className="list-container">
        {listElements}
      </ul>
      <button type="submit">{createText}</button>
    </div>
  );
}

ListCreator.defaultProps = {
  header: '',
};

ListCreator.propTypes = {
  header: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  createText: PropTypes.string.isRequired,
};

export default ListCreator;
