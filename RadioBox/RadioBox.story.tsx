import React, { FormEvent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from '@sambego/storybook-state';

import { RadioBox } from './RadioBox';

export const options = [
  {
    label: 'Cookie',
    value: 0,
  },
  {
    label: 'LocalStorage',
    value: 1,
    content: <div>Option with content</div>,
  },
];

const store = new Store({
  selection: 0,
});

const onChange = (e: React.FormEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value: selection },
  } = e;
  store.set({ selection: Number(selection) });

  action('onChange')(e);
};

storiesOf('RadioBox', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo('a block of radio buttons')(() => (
      <State store={store}>
        <RadioBox options={options} onChange={onChange} name="someName" selection={store.get('selection')} />
      </State>
    ))
  )
  .add(
    'with a title',
    withInfo('a block of radio buttons a title')(() => (
      <State store={store}>
        <RadioBox
          options={options}
          onChange={onChange}
          name="someName"
          selection={store.get('selection')}
          title={text('Title', 'Cookies will be placed once:')}
        />
      </State>
    ))
  );
