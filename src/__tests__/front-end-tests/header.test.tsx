import * as React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Header from '../../popup/components/Header';
import InfoButton from '../../popup/components/InfoButton';
import '../../setupTests';

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
  it('When shouldInfoDisplay is false, button should say "Info"', () => {
    wrapper = mount(<InfoButton shouldInfoDisplay={false} toggleInfoDisplay={toggleInfoMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Info');
  });
  it('When shouldInfoDisplay is true, button should say "Recording Menu"', () => {
    wrapper = mount(<InfoButton shouldInfoDisplay toggleInfoDisplay={toggleInfoMock} />);
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button');
    expect(button.text()).toBe('Recording Menu');
  });
});
