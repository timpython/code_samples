# Category item
 
A category item component.

### Usage

~~~js
import { CategoryList, CategoryItem } from '@wynd/kiosk-components';

<CategoryList>
  <CategoryItem title="Category 1" image="http://picture" count="7" />
  <CategoryItem title="Category 2" image="http://picture" count="10" />
  <CategoryItem title="Category 3" image="http://picture" count="1" />
</CategoryList>
~~~

### Properties

| propName       | description            | propType | defaultValue | isRequired |
| -------------- | ---------------------- | -------- | ------------ | ---------- |
| title          | Category title         | string   | -            | +          |
| count          | Category count         | string   | -            | +          |
| image          | Category image         | string   | -            | -          |
| itemId         | Category id            | string   | -            | -          |
| novelties      | Category novelties     | object   | -            | -          |
| children       | Category subcategories | node     | -            | -          |
| onClick        | Click handler          | func     | -            | -          |
| onHideChildren | Hide children handler  | func     | -            | -          |
