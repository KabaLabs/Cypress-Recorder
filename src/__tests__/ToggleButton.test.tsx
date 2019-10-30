import * as React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from '../popup/components/ToggleButton';
import { ControlAction } from '../constants';
import '../setupTests';

describe('toggle button', () => {
  const handleToggleMock = jest.fn();
  let wrapper;
  let props;
  beforeAll(() => {
    props = {
      handleToggle: handleToggleMock,
    };
  });
  it('Should call handleToggle with argument "startRec" when clicked and recStatus is "off" and tab is valid', () => {
    props.recStatus = 'off';
    props.isValidTab = true;
    wrapper = shallow(<ToggleButton { ...props } />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Start Recording');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  });
  it('Should call handleToggle with argument "stopRec" when clicked and recStatus is "on"', () => {
    props.recStatus = 'on';
    props.isValidTab = true;
    wrapper = shallow(<ToggleButton { ...props } />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Stop Recording');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.STOP);
  });
  it('Should call handleToggle with argument "startRec" when clicked and recStatus is "paused"', () => {
    props.recStatus = 'paused';
    props.isValidTab = true;
    wrapper = shallow(<ToggleButton { ...props } />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Resume');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  });
  it('Should be disabled when clicked and recStatus is "off" and tab is invalid', () => {
    props.recStatus = 'off';
    props.isValidTab = false;
    wrapper = shallow(<ToggleButton { ...props } />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Invalid Tab');
    expect(button.prop('disabled')).toBe(true);
  });
});
