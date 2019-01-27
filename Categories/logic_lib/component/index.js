import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { I18n } from 'react-redux-i18n';
import {
  Categories,
  CategoryList,
  CategoryItem,
  CategorySubItem,
  ArrowButtons,
  Logo,
} from '@components';
import {
  sliceHelper,
  arrowHelper,
  touchMixin,
  checkFirstItem,
} from 'utils/sliderHelpers';

const SLIDER_WIDTH = 5;
const SLIDER_STEP = 1;
const SLIDER_VISIBLE_ITEMS = 3;
const ITEM_WIDTH = 480;

class CategoriesPageComponent extends React.Component {
  static propTypes = {
    getBrands: PropTypes.func.isRequired,
    brands: PropTypes.instanceOf(List).isRequired,
    currentBrand: PropTypes.instanceOf(Map),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    currentBrand: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      activeCategoryId: null,
      categories: null,
    };
    this.arrowHandler = this.arrowHandler.bind(this);
    this.handleStartSafe = this.handleStartSafe.bind(this);
    this.handleMoveSafe = this.handleMoveSafe.bind(this);
    this.handleEndSafe = this.handleEndSafe.bind(this);
  }

  componentWillMount() {
    this.setInitialTouchState();
  }

  componentDidMount() {
    if (this.props.brands.size === 0) {
      this.props.getBrands();
    } else {
      this.setCategories(this.props);
    }

    this.sliderItems = window.document.getElementsByClassName('category-item__wrapper');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.brands !== nextProps.brands) {
      this.setCategories(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setCategories(props) {
    const currentBrand = props.brands.find(brand => brand.get('id') === props.criteriaBrand);
    this.setState({
      categories: currentBrand.get('children'),
    });

    props.setCurrentBrand(currentBrand.toJS());
  }

  handleStartSafe(x) {
    if (!this.state.categories || this.state.categories.size <= SLIDER_VISIBLE_ITEMS) {
      return;
    }
    this.handleStart(x);
  }

  handleMoveSafe(x) {
    if (!this.state.categories || this.state.categories.size <= SLIDER_VISIBLE_ITEMS) {
      return;
    }
    this.handleMove(x);
  }

  handleEndSafe() {
    if (!this.state.categories || this.state.categories.size <= SLIDER_VISIBLE_ITEMS) {
      return;
    }
    this.handleEnd();
  }

  arrowHandler(flag) {
    const length = this.state.categories.size;

    if (length <= SLIDER_VISIBLE_ITEMS) return;

    const newPointer = arrowHelper(flag, this.state.pointer, SLIDER_STEP, length);

    let activeCategoryId = this.state.activeCategoryId;

    if (activeCategoryId) {
      const categories = this.state.categories;
      const openedItem = categories.find(category => category.id === activeCategoryId);
      const openedItemIndex = categories.indexOf(openedItem);
      let adjacentIndex;
      if (flag === '>') {
        adjacentIndex = openedItemIndex + 1;
        adjacentIndex = adjacentIndex > length - 1 ? 0 : adjacentIndex;
      } else {
        adjacentIndex = openedItemIndex - 1;
        adjacentIndex = adjacentIndex < 0 ? length - 1 : adjacentIndex;
      }
      const newOpenedItem = categories.get(adjacentIndex);
      activeCategoryId = newOpenedItem.get('id');
    }

    this.setState(() => ({ pointer: newPointer, activeCategoryId }));
  }

  handleClick(categoryId) {
    const { categories } = this.state;
    const { history } = this.props;
    const category = categories.find(findCategory => findCategory.get('id') === categoryId);

    if (!category.get('children') || category.get('children').size === 0) {
      history.push(`/filter/${category.get('parent').get('id')}/${category.get('id')}`);

      return;
    }
    let categoryIndex = categories.indexOf(category);

    if (categories.size === 1) {
      this.setState({ activeCategoryId: categoryId });

      return;
    }

    if (categories.size <= SLIDER_VISIBLE_ITEMS) {
      let nArray = categories.slice();
      const temp = nArray.get(1);
      nArray = nArray.set(1, nArray.get(categoryIndex));
      nArray = nArray.set(categoryIndex, temp);
      this.setState({ categories: nArray, activeCategoryId: categoryId });

      return;
    }

    categoryIndex = categoryIndex || categories.size;
    this.setState(
      () => ({ pointer: categoryIndex - 1, activeCategoryId: categoryId }),
      () => {
        const listElement = window.document.getElementById('@category-list-node');
        const diff = (listElement.scrollWidth - listElement.offsetWidth) / ((SLIDER_STEP * 2) + SLIDER_WIDTH);
        listElement.scrollBy(diff, 0);
      },
    );
  }

  render() {
    const {
      currentBrand,
      history,
    } = this.props;

    const {
      categories,
      activeCategoryId,
      pointer,
      left,
    } = this.state;

    if (!categories || categories.size === 0) {
      return null;
    }
    const categoriesToRender = sliceHelper(categories.toJS(), pointer, SLIDER_WIDTH, SLIDER_VISIBLE_ITEMS);

    return (
      <Categories>
        {currentBrand && (
          <Logo
            title={currentBrand.get('default_label')}
          />
        )}
        <CategoryList
          left={left}
          handleStart={this.handleStartSafe}
          handleMove={this.handleMoveSafe}
          handleEnd={this.handleEndSafe}
          itemWidth={ITEM_WIDTH}
        >
          {
            categoriesToRender.map((category, index) => {
              const showSubcategories = checkFirstItem(
                categoriesToRender.length,
                category.id,
                activeCategoryId,
                index,
                SLIDER_VISIBLE_ITEMS,
              );

              return (
                <CategoryItem
                  key={index}
                  title={category.default_label}
                  count={`${category.count_products} ${I18n.t('articles')}`}
                  image={category.picture}
                  itemId={`@category-item_${category.default_label}`}
                  novelties={{
                    isExist: false,
                    title: I18n.t('novelties'),
                  }}
                  onClick={() => { this.handleClick(category.id); }}
                  onHideChildren={() => { this.setState({ activeCategoryId: null }); }}
                >
                  {showSubcategories && category.children.map(subcategory => (
                    <CategorySubItem
                      key={subcategory.id}
                      title={subcategory.default_label}
                      onClick={() => {
                        history.push(`/filter/${category.parent.id}/${category.id}/${subcategory.id}`);
                      }}
                    />
                  ))}
                </CategoryItem>
              );
            })
          }
        </CategoryList>
        <ArrowButtons
          scanTitle={I18n.t('common.scanYourProduct')}
          scanHandler={() => { history.push('/scan'); }}
          arrowHandler={this.arrowHandler}
        />
      </Categories>
    );
  }
}

Object.assign(CategoriesPageComponent.prototype, touchMixin);

export default CategoriesPageComponent;
