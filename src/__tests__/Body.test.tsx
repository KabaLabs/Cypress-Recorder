import * as React from 'react';
import { shallow } from 'enzyme';
import Body, { BodyProps } from '../popup/components/Body';
import LandingBox from '../popup/components/LandingBox';
import CodeDisplay from '../popup/components/CodeDisplay';
import { RecState } from '../constants';
import '../setupTests';

describe('Body', () => {
  let props: BodyProps;
  let wrapper;
  beforeAll(() => {
    props = {
      codeBlocks: [],
      isValidTab: true,
      destroyBlock: jest.fn(),
      moveBlock: jest.fn(),
      recStatus: RecState.OFF,
    };
  });
  it('Should render LandingBox when recStatus is off', () => {
    wrapper = shallow(<Body {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists(LandingBox)).toBe(true);
    expect(wrapper.exists(CodeDisplay)).toBe(false);
  });
  it('Should render CodeDisplay when recStatus is paused', () => {
    props.recStatus = RecState.PAUSED;
    wrapper = shallow(<Body {...props} />);
    expect(wrapper.exists(CodeDisplay)).toBe(true);
    expect(wrapper.exists(LandingBox)).toBe(false);
  });
  it('Should render CodeDisplay when recStatus is on', () => {
    props.recStatus = RecState.ON;
    wrapper = shallow(<Body {...props} />);
    expect(wrapper.exists(CodeDisplay)).toBe(true);
    expect(wrapper.exists(LandingBox)).toBe(false);
  });
});
