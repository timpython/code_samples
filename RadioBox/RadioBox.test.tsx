import React from 'react';
import { shallow } from 'enzyme';
import { RadioBox } from '.';

const options = [
  {
    label: 'Cookie',
    value: 0,
    content: <div>Cookie Description</div>,
  },
  {
    label: 'LocalStorage',
    value: 1,
    content: <div>Local Storage Description</div>,
  },
];

const selection = 0;

describe('RadioBox', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <RadioBox options={options} selection={selection} name="someName" containerClassName="someContainerClassName" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('have correct listener', () => {
    const onChange = () => {};
    const wrapper = shallow(<RadioBox options={options} selection={selection} onChange={onChange} name="someName" />);

    const callback = wrapper
      .find('RadioBoxOption')
      .first()
      .props().onChange;

    expect(onChange).toEqual(callback);
    expect(wrapper).toMatchSnapshot();
  });
});
