import * as React from 'react';
import { shallow } from 'enzyme';
import Header from '../popup/components/Header';

import '../setupTests';

describe('Header', () => {
  let wrapper;
  let toggleInfoMock;
  beforeEach(() => {
    toggleInfoMock = jest.fn();
  });
  it('Title should say "Cypress Recorder"', () => {
    wrapper = shallow(<Header shouldInfoDisplay={false} toggleInfoDisplay={toggleInfoMock} />);
    expect(wrapper).toMatchSnapshot();
    const title = wrapper.find('#title');
    expect(title.text()).toBe('Cypress Recorder');
  });
});
