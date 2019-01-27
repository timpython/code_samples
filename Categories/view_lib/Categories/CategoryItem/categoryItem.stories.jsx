import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import CategoryItem from './index';
import CategorySubItem from '../CategorySubItem';
import CategoryItemREADME from './README.md';

storiesOf('CategoryItem', module)
  .addDecorator(withReadme(CategoryItemREADME))
  .add('basic', () => {
    const props = {
      title: text('title', 'Et'),
      count: text('count', '10'),
      image: text('image', 'https://lorempixel.com/640/640'),
      onClick: action('clicked'),
      onHideChildren: action('hide children'),
    };

    return (
      <div style={{ width: '1080px' }} >
        <CategoryItem {...props}>
          <CategorySubItem title={text('subcategory title 1', 'Et')} />
          <CategorySubItem title={text('subcategory title 2', 'Dicta')} />
        </CategoryItem>
      </div>
    );
  });
