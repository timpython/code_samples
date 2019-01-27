import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CategorySubItem = ({ title, onClick }) => (
  <button
    className="category-subitem"
    onClick={() => {
      if (onClick) {
        onClick();
      }
    }}
  >
    {title}
  </button>
);

CategorySubItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CategorySubItem.defaultProps = {
  onClick: null,
};

export default CategorySubItem;
