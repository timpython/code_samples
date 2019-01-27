import React from 'react';
import { shallow } from 'enzyme';
import { RadioBoxOption } from '.';

describe('Option', () => {
  it('renders correctly', () => {
    const onChange = () => {};
    const content = <div>Some Content</div>;

    const wrapper = shallow(
      <RadioBoxOption label="text" name="name" value={0} onChange={onChange} checked={true} content={content} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onChange is called properly', () => {
    const onChange = jest.fn();
    const eventObject = {
      name: 'name',
      value: 'value',
    };

    const wrapper = shallow(
      <RadioBoxOption label="text" name="name" value="value" onChange={onChange} checked={true} />
    );
    wrapper.find('input').simulate('change', eventObject);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(eventObject);
  });
});
