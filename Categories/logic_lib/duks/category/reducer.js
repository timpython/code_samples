import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';
import types from './types';

const ACTION_HANDLERS = {
  [types.FETCH_CATEGORIES_SUCCESS]: (state, { categories }) =>
    state.merge({ list: categories }),
  [types.FETCH_CATEGORY_SUCCESS]: (state, { category }) =>
    state.merge({ current: category }),
  [types.SET_CURRENT_CATEGORY]: (state, { category }) =>
    state.merge({ current: category }),
  [types.START_AUTO_SLIDING]: state =>
    state.merge({ autoSliding: true }),
  [types.STOP_AUTO_SLIDING]: state =>
    state.merge({ autoSliding: false }),
};

const initialState = fromJS({
  list: [],
  current: null,
  autoSliding: false,
});

export default createReducer(initialState, ACTION_HANDLERS);
