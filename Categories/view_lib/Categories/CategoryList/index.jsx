import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CategoryList = ({
  children,
  left,
  handleStart,
  handleMove,
  handleEnd,
  itemWidth,
}) => (
  <div
    role="none"
    className="category-list-outer"
    onTouchStart={(e) => { handleStart(e.targetTouches[0].clientX); }}
    onTouchMove={(e) => { handleMove(e.targetTouches[0].clientX); }}
    onTouchEnd={() => { handleEnd(); }}
    onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
    onMouseMove={(e) => { e.preventDefault(); handleMove(e.clientX); }}
    onMouseUp={() => { handleEnd(); }}
    onMouseLeave={() => { handleEnd(); }}
  >
    <div
      className="category-list-inner"
      id="@category-list-node"
      style={{ left: `${left - itemWidth + 20}px` }}
    >
      { children }
    </div>
  </div>
);


CategoryList.propTypes = {
  children: PropTypes.node.isRequired,
  left: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  handleStart: PropTypes.func,
  handleMove: PropTypes.func,
  handleEnd: PropTypes.func,
};

CategoryList.defaultProps = {
  left: 0,
  handleStart: null,
  handleMove: null,
  handleEnd: null,
};

export default CategoryList;
