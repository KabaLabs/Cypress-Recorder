import * as React from 'react';
import { shallow } from 'enzyme';
import Header from '../../popup/components/Header';
import '../../setupTests';
// import { ControlAction } from '../../constants';

describe('toggle button', () => {
  let wrapper;
  let toggleInfoMock;
  beforeEach(() => {
    toggleInfoMock = jest.fn();
  });
  it('Title should say "Cypress Recorder"', () => {
    wrapper = shallow(<Header shouldInfoDisplay={false} handleToggle={toggleInfoMock} />);
    expect(wrapper).toMatchSnapshot();
    const title = wrapper.find('#title');
    expect(title.text()).toBe('Cypress Recorder');
    // expect(button.prop('disabled')).toBe(true);
  });
  // it('should call handletoggle with argument "startRec" when clicked and recStatus is "off" and tab is valid', () => {
  //   wrapper = shallow(<ToggleButton recStatus='off' isValidTab={true} handleToggle={handleToggleMock}/>)
  //   expect(wrapper).toMatchSnapshot();
  //   const button = wrapper.find('button');
  //   button.simulate('click');
  //   expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  // });
  // it('should call handletoggle with argument "stopRec" when clicked and recStatus is "on"', () => {
  //   wrapper = shallow(<ToggleButton recStatus='on' isValidTab={true} handleToggle={handleToggleMock}/>)
  //   expect(wrapper).toMatchSnapshot();
  //   const button = wrapper.find('button');
  //   button.simulate('click');
  //   expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.STOP);
  // });
  // it('should call handletoggle with argument "startRec" when clicked and recStatus is "paused"', () => {
  //   wrapper = shallow(<ToggleButton recStatus='paused' isValidTab={true} handleToggle={handleToggleMock}/>)
  //   expect(wrapper).toMatchSnapshot();
  //   const button = wrapper.find('button');
  //   button.simulate('click');
  //   expect(handleToggleMock).toHaveBeenCalledWith(ControlAction.START);
  // });
});
