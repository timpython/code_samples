import types from './types';

export default {
  categoriesRequest() {
    return {
      type: types.FETCH_CATEGORIES_REQUEST,
    };
  },

  categoriesSuccess(categories) {
    return {
      type: types.FETCH_CATEGORIES_SUCCESS,
      categories,
    };
  },

  categoriesError(error) {
    return {
      type: types.FETCH_CATEGORIES_FAILURE,
      error,
    };
  },

  categoryRequest(id) {
    return {
      type: types.FETCH_CATEGORY_REQUEST,
      id,
    };
  },

  categorySuccess(category) {
    return {
      type: types.FETCH_CATEGORY_SUCCESS,
      category,
    };
  },

  categoryError(error) {
    return {
      type: types.FETCH_CATEGORY_FAILURE,
      error,
    };
  },

  setCurrentCategory(category) {
    return {
      type: types.SET_CURRENT_CATEGORY,
      category,
    };
  },

  startAutoSliding() {
    return {
      type: types.START_AUTO_SLIDING,
    };
  },

  stopAutoSliding() {
    return {
      type: types.STOP_AUTO_SLIDING,
    };
  },
};
