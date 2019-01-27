import { fromJS } from 'immutable';
import reducer, { categoryTypes as types } from '../index';

describe('reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      list: [],
      current: null,
      autoSliding: false,
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const categories = [
      { id: 1 },
      { id: 2 },
    ];

    expect(reducer(undefined, {
      type: types.FETCH_CATEGORIES_SUCCESS,
      categories,
    })).toEqual(fromJS({
      list: categories,
      current: null,
      autoSliding: false,
    }));

    expect(reducer(
      fromJS({
        list: [
          { id: 3 },
        ],
      }),
      {
        type: types.FETCH_CATEGORIES_SUCCESS,
        categories,
      },
    )).toEqual(fromJS({
      list: categories,
    }));
  });

  it('should handle FETCH_CATEGORY_SUCCESS', () => {
    const category = { id: 1 };

    expect(reducer(undefined, {
      type: types.FETCH_CATEGORY_SUCCESS,
      category,
    })).toEqual(fromJS({
      list: [],
      current: category,
      autoSliding: false,
    }));

    expect(reducer(
      fromJS({
        current: { id: 2 },
      }),
      {
        type: types.FETCH_CATEGORY_SUCCESS,
        category,
      },
    )).toEqual(fromJS({
      current: category,
    }));
  });

  it('should handle SET_CURRENT_CATEGORY', () => {
    const category = { id: 1 };

    expect(reducer(undefined, {
      type: types.SET_CURRENT_CATEGORY,
      category,
    })).toEqual(fromJS({
      list: [],
      current: category,
      autoSliding: false,
    }));

    expect(reducer(
      fromJS({
        current: { id: 2 },
      }),
      {
        type: types.SET_CURRENT_CATEGORY,
        category,
      },
    )).toEqual(fromJS({
      current: category,
    }));
  });
});
