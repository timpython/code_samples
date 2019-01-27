import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import CategoryList from './index';
import CategoryItem from '../CategoryItem';
import CategoryListREADME from './README.md';

storiesOf('CategoryList', module)
  .addDecorator(withReadme(CategoryListREADME))
  .add('basic', () => {
    const subcategoriesList = [
      {
        default_label: 'numquam',
      },
      {
        default_label: 'non',
      },
      {
        default_label: 'etc',
      },
    ];

    const items = [
      {
        id: 1,
        title: text('title', 'Perspiciatis'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
      {
        id: 2,
        title: text('title', 'Non'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategories: boolean('showSubcategories', false),
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
      {
        id: 3,
        title: text('title', 'Consequuntur'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
      {
        id: 4,
        title: text('title', 'Numquam'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
      {
        id: 5,
        title: text('title', 'Id'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
      {
        id: 6,
        title: text('title1', 'Et'),
        count: text('count', '10'),
        image: text('image', 'https://lorempixel.com/640/640'),
        subcategoriesList,
        showSubcategoriesHandler: action('open subcategories block'),
        closeSubcategoriesHandler: action('close subcategories block'),
      },
    ];

    return (
      <div style={{ width: '100%' }}>
        <CategoryList>
          {items.map(item => <CategoryItem key={item.id} {...item} />)}
        </CategoryList>
      </div>
    );
  });
