import React from 'react';
import { shallow } from 'enzyme';

import CategoryItem from '../index';

describe('<CategoryItem />', () => {
  it('should render a <CategoryItem> element', () => {
    const props = {
      title: 'Sport',
      count: '5',
      image: 'https://lorempixel.com/640/640',
    };
    const renderedComponent = shallow(<CategoryItem {...props} />);
    expect(renderedComponent.find('img').prop('src')).toBe(props.image);
  });

  it('should show novelties', () => {
    const props = {
      title: 'Sport',
      count: '5',
      novelties: {
        isExist: true,
        title: 'Test',
        handler: jest.fn(),
      },
    };
    const renderedComponent = shallow(<CategoryItem {...props} />);
    expect(renderedComponent.find('.category-item__novelties-button').length).toBe(1);
    expect(props.novelties.handler).toHaveBeenCalledTimes(0);
    renderedComponent.find('.category-item__novelties-button').simulate('click');
    expect(props.novelties.handler).toHaveBeenCalledTimes(1);
  });

  it('should show children', () => {
    const props = {
      title: 'Sport',
      count: '5',
    };
    const content = (<div id="children">Text</div>);
    const renderedComponent = shallow(<CategoryItem {...props}>{content}</CategoryItem>);
    expect(renderedComponent.find('#children').length).toBe(1);
  });

  it('should call a onClick prop', () => {
    const props = {
      title: 'Sport',
      count: '5',
      onClick: jest.fn(),
    };
    const renderedComponent = shallow(<CategoryItem {...props} />);
    expect(props.onClick).toHaveBeenCalledTimes(0);
    renderedComponent.find('button').first().simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should call a onHideChildren prop', () => {
    const props = {
      title: 'Sport',
      count: '5',
      onHideChildren: jest.fn(),
    };
    const content = 'Text';
    const renderedComponent = shallow(<CategoryItem {...props}>{content}</CategoryItem>);
    expect(props.onHideChildren).toHaveBeenCalledTimes(0);
    renderedComponent.find('button').last().simulate('click');
    expect(props.onHideChildren).toHaveBeenCalledTimes(1);
  });
});
