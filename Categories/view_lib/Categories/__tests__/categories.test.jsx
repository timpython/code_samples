import React from 'react';
import { shallow } from 'enzyme';

import Categories from '../index';

describe('<Categories />', () => {
  it('should render a <Categories> element', () => {
    const text = 'Test';
    const renderedComponent = shallow(<Categories>{text}</Categories>);
    expect(renderedComponent.text()).toBe(text);
  });
});
