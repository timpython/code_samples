import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { categoryActions as actions, categorySaga as rootSaga } from '../index';
import service from '../service';

describe('sagas', () => {
  it('fetches categories', () => {
    const categories = [
      { id: 1, children: [], visible: true },
      { id: 2, children: [], visible: true },
    ];

    return expectSaga(rootSaga)
      .provide([
        [matchers.call.fn(service.fetchCategoriesList), categories],
      ])
      .put(actions.categoriesSuccess(categories))
      .dispatch(actions.categoriesRequest())
      .run({ silenceTimeout: true });
  });

  it('handles fetch categories errors', () => {
    const error = new Error('error');

    return expectSaga(rootSaga)
      .provide([
        [matchers.call.fn(service.fetchCategoriesList), throwError(error)],
      ])
      .put(actions.categoriesError(error))
      .dispatch(actions.categoriesRequest())
      .run({ silenceTimeout: true });
  });

  it('fetches category', () => {
    const id = 1;
    const category = { id, children: [] };

    return expectSaga(rootSaga, { id })
      .provide([
        [matchers.call.fn(service.fetchCategory), category],
      ])
      .put(actions.categorySuccess(category))
      .dispatch(actions.categoryRequest(id))
      .run({ silenceTimeout: true });
  });

  it('handles fetch category errors', () => {
    const error = new Error('error');
    const id = 1;

    return expectSaga(rootSaga, { id })
      .provide([
        [matchers.call.fn(service.fetchCategory), throwError(error)],
      ])
      .put(actions.categoryError(error))
      .dispatch(actions.categoryRequest(id))
      .run({ silenceTimeout: true });
  });
});

