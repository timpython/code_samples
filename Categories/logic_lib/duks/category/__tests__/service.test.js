import { CategoryAccessor } from '@api';
import service from '../service';

jest.mock('@api');

describe('category service', () => {
  beforeEach(() => {
    CategoryAccessor.mockClear();
  });

  it('fetches category', () => {
    const id = 1;
    expect(CategoryAccessor).toHaveBeenCalledTimes(0);
    service.fetchCategory(id);
    expect(CategoryAccessor).toHaveBeenCalledTimes(1);
    expect(CategoryAccessor.mock.instances[0].readOne).toHaveBeenCalledTimes(1);
    expect(CategoryAccessor.mock.instances[0].readOne).toHaveBeenCalledWith(id);
  });

  it('fetches categories list', () => {
    const criteria = { depth: 2 };
    expect(CategoryAccessor).toHaveBeenCalledTimes(0);
    service.fetchCategoriesList(criteria);
    expect(CategoryAccessor).toHaveBeenCalledTimes(1);
    expect(CategoryAccessor.mock.instances[0].findAllByCriteria).toHaveBeenCalledTimes(1);
    expect(CategoryAccessor.mock.instances[0].findAllByCriteria).toHaveBeenCalledWith(criteria);
  });

  it('filters visible categories', () => {
    const invisibleCategories = [{ id: 1, visible: false }, { id: 3, visible: false }];
    const visibleCategories = [{ id: 2, visible: true }, { id: 4, visible: true }];
    expect(service.filterVisible(visibleCategories.concat(invisibleCategories))).toEqual(visibleCategories);
  });

  it('filters parent categories', () => {
    const parentCategories = [{ id: 1, parent: null }, { id: 3, parent: null }];
    const childCategories = [{ id: 2, parent: { id: 1 } }, { id: 4, parent: { id: 1 } }];
    expect(service.filterParent(childCategories.concat(parentCategories))).toEqual(parentCategories);
  });

  it('counts category product counts', () => {
    const categories = [
      { id: 1, count_products: 1 },
      {
        id: 2,
        count_products: 2,
        children: [
          { id: 3, count_products: 3 },
          { id: 4, count_products: 4 },
        ],
      },
      {
        id: 5,
        count_products: 5,
        children: [
          { id: 6, count_products: 6 },
          {
            id: 7,
            count_products: 7,
            children: [
              { id: 8, count_products: 8 },
              { id: 9, count_products: 9 },
            ],
          },
        ],
      },
    ];
    const calculatedCategories = [
      { id: 1, count_products: 1 },
      {
        id: 2,
        count_products: 7,
        children: [
          { id: 3, count_products: 3 },
          { id: 4, count_products: 4 },
        ],
      },
      {
        id: 5,
        count_products: 23,
        children: [
          { id: 6, count_products: 6 },
          {
            id: 7,
            count_products: 17,
            children: [
              { id: 8, count_products: 8 },
              { id: 9, count_products: 9 },
            ],
          },
        ],
      },
    ];
    expect(service.countProductInSubCategories(categories)).toEqual(calculatedCategories);
  });
});

