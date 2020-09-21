import * as React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from '../popup/components/ToggleButton';
import { ControlAction, RecState } from '../constants';
import '../setupTests';

describe('toggle button', () => {
  let wrapper;
  let handleToggleMock;
  beforeEach(() => {
    handleToggleMock = jest.fn();
  });
  it('should not call handletoggle when clicked and recStatus is "off" and tab is invalid', () => {
    wrapper = shallow(<ToggleButton recStatus={RecState.OFF} isValidTab={false} handleToggle={handleToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Invalid Tab');
    expect(button.prop('disabled')).toBe(true);
  });
  it('should call handletoggle with argument "startRec" when clicked and recStatus is "off" and tab is valid', () => {
    wrapper = shallow(<ToggleButton recStatus={RecState.OFF} isValidTab handleToggle={handleToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  });
  it('should call handletoggle with argument "stopRec" when clicked and recStatus is "on"', () => {
    wrapper = shallow(<ToggleButton recStatus={RecState.ON} isValidTab handleToggle={handleToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.STOP);
  });
  it('should call handletoggle with argument "startRec" when clicked and recStatus is "paused"', () => {
    wrapper = shallow(<ToggleButton recStatus={RecState.PAUSED} isValidTab handleToggle={handleToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  });
});