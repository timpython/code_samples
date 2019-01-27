import { categoryActions as actions, categoryTypes as types } from '../index';

describe('actions', () => {
  it('creates an action to fetch a list', () => {
    const expectedAction = {
      type: types.FETCH_CATEGORIES_REQUEST,
    };
    expect(actions.categoriesRequest()).toEqual(expectedAction);
  });

  it('creates an action to success fetch a list', () => {
    const categories = [
      { id: 1 },
      { id: 2 },
    ];

    const expectedAction = {
      type: types.FETCH_CATEGORIES_SUCCESS,
      categories,
    };
    expect(actions.categoriesSuccess(categories)).toEqual(expectedAction);
  });

  it('creates an action to failure fetch a list', () => {
    const error = new Error('error');

    const expectedAction = {
      type: types.FETCH_CATEGORIES_FAILURE,
      error,
    };
    expect(actions.categoriesError(error)).toEqual(expectedAction);
  });

  it('creates an action to fetch a category', () => {
    const id = 1;
    const expectedAction = {
      type: types.FETCH_CATEGORY_REQUEST,
      id,
    };
    expect(actions.categoryRequest(id)).toEqual(expectedAction);
  });

  it('creates an action to success fetch a category', () => {
    const category = { id: 1 };

    const expectedAction = {
      type: types.FETCH_CATEGORY_SUCCESS,
      category,
    };
    expect(actions.categorySuccess(category)).toEqual(expectedAction);
  });

  it('creates an action to failure fetch a category', () => {
    const error = new Error('error');

    const expectedAction = {
      type: types.FETCH_CATEGORY_FAILURE,
      error,
    };
    expect(actions.categoryError(error)).toEqual(expectedAction);
  });

  it('creates an action to set current category', () => {
    const category = { id: 1 };

    const expectedAction = {
      type: types.SET_CURRENT_CATEGORY,
      category,
    };
    expect(actions.setCurrentCategory(category)).toEqual(expectedAction);
  });
});
