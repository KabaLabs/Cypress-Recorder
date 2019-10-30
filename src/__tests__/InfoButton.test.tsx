import * as React from 'react';
import { shallow } from 'enzyme';
import InfoButton from '../popup/components/InfoButton';
import '../setupTests';

describe('InfoButton', () => {
  let handleInfoToggleMock;
  let wrapper;
  let props;
  beforeAll(() => {
    handleInfoToggleMock = jest.fn();
    props = {
      toggleInfoDisplay: handleInfoToggleMock,
    };
  });
  it('Button text should display "Info" when shouldInfoDisplay is false', () => {
    props.shouldInfoDisplay = false;
    wrapper = shallow((<InfoButton {...props} />));
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Info');
  });
  it('Button text should display "Recording Menu" when shouldInfoDisplay is true', () => {
    props.shouldInfoDisplay = true;
    wrapper = shallow((<InfoButton {...props} />));
    const button = wrapper.find('button');
    expect(button.text()).toBe('Recording Menu');
  });
  it('Should invoke toggleInfoDisplay when button is clicked', () => {
    props.shouldInfoDisplay = true;
    wrapper = shallow((<InfoButton {...props} />));
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleInfoToggleMock).toHaveBeenCalled();
  });
});
