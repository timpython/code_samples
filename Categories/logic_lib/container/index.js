import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withTracker from 'utils/withTracker';

import { categoryActions } from 'ducks/category';
import { CategoriesPageComponent } from 'components/pages';

const mapDispatchToProps = dispatch => ({
  getBrands: () => dispatch(categoryActions.categoriesRequest()),
  setCurrentBrand: category => dispatch(categoryActions.setCurrentCategory(category)),
});

const mapStateToProps = (state, ownProps) => ({
  criteriaBrand: parseInt(ownProps.match.params.brand, 10),
  brands: state.get('categories').get('list'),
  currentBrand: state.get('categories').get('current'),
});

export default withTracker(withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesPageComponent)));
