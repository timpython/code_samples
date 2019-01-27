import { takeEvery, put, all, call } from 'redux-saga/effects';
import config from 'config';
import types from './types';
import actions from './actions';
import service from './service';

function* fetchCategorySaga({ id }) {
  try {
    const category = yield call(service.fetchCategory, id);
    yield put(actions.categorySuccess(category));
  } catch (error) {
    yield put(actions.categoryError(error));
  }
}

function* fetchCategoriesSaga() {
  try {
    const criteria = {
      entity: [config.entityId],
      depth: 2,
    };
    const categories = yield call(service.fetchCategoriesList, criteria);
    const visibleCategories = service.filterVisible(categories);
    const categoriesWithCount = service.countProductInSubCategories(visibleCategories);
    const parentCategories = service.filterParent(categoriesWithCount);
    yield put(actions.categoriesSuccess(parentCategories));
  } catch (error) {
    yield put(actions.categoriesError(error));
  }
}

export default function* categorySaga() {
  yield all([
    takeEvery(types.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga),
    takeEvery(types.FETCH_CATEGORY_REQUEST, fetchCategorySaga),
  ]);
}
