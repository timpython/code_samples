import React from 'react';
import { shallow } from 'enzyme';

import CategorySubItem from '../index';

describe('<CategorySubItem />', () => {
  it('should render a <CategorySubItem> element', () => {
    const props = {
      title: 'Sport',
    };
    const renderedComponent = shallow(<CategorySubItem {...props} />);
    expect(renderedComponent.text()).toBe(props.title);
  });

  it('should call a onClick prop', () => {
    const title = 'Test';
    const onClick = jest.fn();
    const renderedComponent = shallow(<CategorySubItem onClick={onClick} title={title} />);
    expect(onClick).toHaveBeenCalledTimes(0);
    renderedComponent.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
