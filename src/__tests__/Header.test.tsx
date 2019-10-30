import * as React from 'react';
import { shallow } from 'enzyme';
import Header from '../popup/components/Header';
import InfoButton from '../popup/components/InfoButton';
import '../setupTests';


describe('Header', () => {
  let wrapper;
  let props;
  beforeAll(() => {
    props = {
      shouldInfoDisplay: false,
      toggleInfoDisplay: jest.fn(),
    };
  });
  it('Should render Header with title of Cypress Recorder', () => {
    wrapper = shallow(<Header { ...props } />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists(InfoButton)).toBe(true);
    const title = wrapper.find('#title');
    expect(title.text()).toBe('Cypress Recorder');
  });
});
