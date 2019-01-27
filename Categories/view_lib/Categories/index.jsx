import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Categories = ({ children }) => (
  <div className="categories_wrapper">
    {children}
  </div>
);

Categories.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Categories;
