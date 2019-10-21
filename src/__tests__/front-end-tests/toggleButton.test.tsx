import * as React from 'react';
import ToggleButton from '../../popup/components/ToggleButton';
import { shallow } from "enzyme";
import "../../setupTests"

describe('toggle button', () => {
  let wrapper;
  const handleToggleMock = jest.fn()
  it('should call handletoggle with argument "startRec" when clicked and recStatus is "off"', () => {
    wrapper = shallow(<ToggleButton recStatus='off' handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('startRec')
  })
  it('should call handletoggle with argument "stopRec" when clicked and recStatus is "on"', () => {
    wrapper = shallow(<ToggleButton recStatus='on' handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('stopRec');
  })
  it('should call handletoggle with argument "resetRec" when clicked and recStatus is "done"', () => {
    wrapper = shallow(<ToggleButton recStatus='done' handleToggle={handleToggleMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock).toHaveBeenCalledWith('resetRec')
  })
})
