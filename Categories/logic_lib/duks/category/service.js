import { CategoryAccessor } from '@api';
import _ from 'lodash';

export default {
  fetchCategory(id) {
    return new CategoryAccessor().readOne(id);
  },
  fetchCategoriesList(criteria) {
    return new CategoryAccessor().findAllByCriteria(criteria);
  },
  filterVisible(categories) {
    return categories.filter(category => category.visible);
  },
  filterParent(categories) {
    return categories.filter(category => (category.parent === null || category.parent === undefined || category.parent.id === null));
  },
  countProductInSubCategories(categories) {
    return categories.map((category) => {
      const children = category.children ? category.children.filter(item => item !== null) : [];

      if (children.length > 0) {
        category.children = this.countProductInSubCategories(children);
        category.count_products = 0;
        category.count_products = children.reduce((sum, item) => (sum + item.count_products), category.count_products);
      }

      return category;
    });
  },
  getAllNestedCategoriesId(categories) {
    let allCategoriesIds = [];

    categories.forEach((category) => {
      const children = category.children ? category.children.filter(item => item !== null) : [];
      allCategoriesIds.push(category.id);
      if (children.length > 0) {
        allCategoriesIds.push(...this.getAllNestedCategoriesId(children));
      }
    });

    allCategoriesIds = _.unionBy(allCategoriesIds);
    return allCategoriesIds;
  },
  getAllSiblings(categories) {
    return categories;
  },
};
