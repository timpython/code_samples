import React from 'react';
import PropTypes from 'prop-types';
import IconClose from './../../../images/close-white-slim.svg';
import './styles.scss';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.subcategoryRef = React.createRef();
    this.state = {
      arrow: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children && this.subcategoryRef.current) {
      this.setState({ arrow: this.subcategoryRef.current.scrollHeight > this.subcategoryRef.current.offsetHeight });
    }
  }

  render() {
    const {
      title, count, image, itemId, novelties, children, onClick, onHideChildren,
    } = this.props;
    const { arrow } = this.state;
    return (
      <div className={`category-item__wrapper ${children ? 'item-shadow' : ''}`} id={itemId} >
        <button
          className="category-item__img-wrapper"
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          <img className="category-item__img" src={image} alt={title} />
          <div className="category-item__description">
            {
              novelties && novelties.isExist &&
              <button
                className="category-item__novelties-button"
                onClick={() => novelties.handler()}
              >
                {novelties.title}
              </button>
            }
            <div className="category-item__title">{title}</div>
            <div className="category-item__count">{count}</div>
          </div>
        </button>
        {
          children &&
          <div className="category-item__subcategory">
            <button
              type="button"
              className="category-item__subcategory-cross-button"
              onClick={() => {
                if (onHideChildren) {
                  onHideChildren();
                }
              }}
            ><img src={IconClose} alt="" />
            </button>
            <div className={`category-item__subcategory-inner ${arrow ? 'arrow' : ''}`} ref={this.subcategoryRef}>{children}</div>
          </div>
        }
      </div>
    );
  }
}

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  image: PropTypes.string,
  itemId: PropTypes.string,
  novelties: PropTypes.shape({
    isExist: PropTypes.bool,
    title: PropTypes.string,
    handler: PropTypes.func,
  }),
  children: PropTypes.node,
  onClick: PropTypes.func,
  onHideChildren: PropTypes.func,
};

CategoryItem.defaultProps = {
  image: null,
  itemId: null,
  novelties: null,
  children: false,
  onClick: null,
  onHideChildren: null,
};

export default CategoryItem;
