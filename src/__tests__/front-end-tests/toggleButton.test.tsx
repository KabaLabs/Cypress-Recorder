import * as React from 'react';
import ToggleButton from '../../popup/components/ToggleButton';
import { shallow } from "enzyme";
import "../../setupTests"

describe('toggle button', () => {
  let wrapper;
  const handleToggleMock = jest.fn()
  it('should not call handletoggle when clicked and recStatus is "off" and tab is invalid', () => {
    wrapper = shallow(<ToggleButton recStatus='off' isValidTab={false} handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).not.toHaveBeenCalled();
    expect(button.disabled).toBe(true);
  })
  it('should call handletoggle with argument "startRec" when clicked and recStatus is "off" and tab is valid', () => {
    wrapper = shallow(<ToggleButton recStatus='off' isValidTab={true} handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('startRec');
  })
  it('should call handletoggle with argument "stopRec" when clicked and recStatus is "on"', () => {
    wrapper = shallow(<ToggleButton recStatus='on' isValidTab={true} handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('stopRec');
  })
  it('should call handletoggle with argument "resetRec" when clicked and recStatus is "done"', () => {
    wrapper = shallow(<ToggleButton recStatus='done' isValidTab={true} handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('resetRec');
  })
})
