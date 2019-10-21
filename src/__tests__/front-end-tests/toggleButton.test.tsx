import * as React from 'react';
import ToggleButton from '../../popup/components/ToggleButton';
import { shallow } from "enzyme";
import "../../setupTests"

describe('toggle button', () => {
  let wrapper;
  const handleToggleMock = jest.fn()
  it('should call handletoggle when clicked', () => {
    wrapper = shallow(<ToggleButton recStatus='off' handleToggle={handleToggleMock}/>)
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleToggleMock.mock.calls.length).toBe(1)
  })
})
