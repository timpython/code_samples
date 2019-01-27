import React from 'react';
import { shallow } from 'enzyme';

import CategoryList from '../index';

describe('<CategoryList />', () => {
  it('should render a <CategoryList> element', () => {
    const text = 'Test';
    const renderedComponent = shallow(<CategoryList>{text}</CategoryList>);
    expect(renderedComponent.text()).toBe(text);
  });
});
