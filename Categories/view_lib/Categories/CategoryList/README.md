#Category list
 
A category list component.

### Usage

~~~js
import { CategoryList, CategoryItem } from '@wynd/kiosk-components';

<CategoryList>
  <CategoryItem title={title1} image={image1} count={count1} subcategoriesList={subcategoriesList1} showSubcategories={showSubcategories1} />
  <CategoryItem title={title2} image={image2}  count={count2} subcategoriesList={subcategoriesList2} showSubcategories={showSubcategories2} />
  <CategoryItem title={title3} image={image3}  count={count3} subcategoriesList={subcategoriesList3} showSubcategories={showSubcategories3} />
</CategoryList>
~~~

### Properties

| propName             | description                   | propType | defaultValue | isRequired |
| -------------------- | ----------------------------- | -------- | ------------ | ---------- |
| title                | Category title                | string   | -            | +          |
| count                | Category count                | string   | -            | +          |
| image                | Category image                | string   | -            | +          |
| subcategoriesList    | Category subcategoriesList    | array    | -            | +          |
| showSubcategories    | Category showSubcategories    | boolean  | -            | +          |
