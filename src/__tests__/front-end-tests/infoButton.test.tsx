import * as React from 'react';
import { shallow } from 'enzyme';
import InfoButton from '../../popup/components/InfoButton';
import '../../setupTests';

describe('info button', () => {
  let wrapper;
  let handleInfoToggleMock;
  beforeEach(() => {
    handleInfoToggleMock = jest.fn();
  });
  it('button text should display "Info" when shouldInfoDisplay is false', () => {
    wrapper = shallow((
      <InfoButton
        shouldInfoDisplay={false}
        toggleInfoDisplay={handleInfoToggleMock}
      />
    ));
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Info');
  });
  it('button text should display "Recording Menu" when shouldInfoDisplay is true', () => {
    wrapper = shallow(<InfoButton shouldInfoDisplay toggleInfoDisplay={handleInfoToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Recording Menu');
  });
  it('should invoke toggleInfoDisplay when button is clicked', () => {
    wrapper = shallow(<InfoButton shouldInfoDisplay toggleInfoDisplay={handleInfoToggleMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleInfoToggleMock).toHaveBeenCalled();
  });
});
