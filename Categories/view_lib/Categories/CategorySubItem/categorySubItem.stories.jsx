import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import CategorySubItem from './index';
import CategorySubItemREADME from './README.md';

storiesOf('CategorySubItem', module)
  .addDecorator(withReadme(CategorySubItemREADME))
  .add('basic', () => {
    const props = {
      title: text('title', 'Et'),
      onClick: action('clicked'),
    };

    return (
      <div style={{ width: '1080px' }} >
        <CategorySubItem {...props} />
      </div>
    );
  });
