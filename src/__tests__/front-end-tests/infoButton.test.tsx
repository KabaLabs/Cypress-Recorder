import * as React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from '../../popup/components/ToggleButton';
import '../../setupTests';
import { ControlAction } from '../../constants';

describe('info button', () => {
  let wrapper;
  let handleInfoMock;
  beforeEach(() => {
    handleInfoMock = jest.fn();
  });
  it('should toggle shouldInfoDisplay state between true and false', () => {
    wrapper = shallow(<ToggleButton recStatus="off" isValidTab={false} handleToggle={handleInfoMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Invalid Tab');
    expect(button.prop('disabled')).toBe(true);
  });
  it('should call handletoggle with argument "startRec" when clicked and recStatus is "off" and tab is valid', () => {
    wrapper = shallow(<ToggleButton recStatus='off' isValidTab={true} handleToggle={handleInfoMock}/>)
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleInfoMock).toHaveBeenCalledWith(ControlAction.START);
  });
});
