import * as React from 'react';
import { shallow } from 'enzyme';
import LandingBox from '../popup/components/LandingBox';
import '../setupTests';

describe('LandingBox', () => {
  let wrapper;

  it('Text should display "Click Start Recording to start" when isValidTab is true', () => {
    wrapper = shallow((<LandingBox isValidTab />));
    expect(wrapper).toMatchSnapshot();
    const textArea = wrapper.find('.text');
    expect(textArea.text()).toBe('Click \'Start Recording\' to start recording!');
  });
  it('Text should display "This is not a valid page for recording" when isValidTab is false', () => {
    wrapper = shallow(<LandingBox isValidTab={false} />);
    const textArea = wrapper.find('.text');
    expect(textArea.text()).toBe('This is not a valid page for recording.');
  });
});
