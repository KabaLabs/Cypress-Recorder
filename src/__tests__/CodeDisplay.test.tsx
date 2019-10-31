import * as React from 'react';
import { shallow } from 'enzyme';
import CodeDisplay, { CodeDisplayProps } from '../popup/components/CodeDisplay';
import CodeBlock from '../popup/components/CodeBlock';
import '../setupTests';

describe('CodeDisplay', () => {
  let wrapper;
  const props: CodeDisplayProps = {
    codeBlocks: [
      {
        id: 'id1',
        value: 'value1',
      },
      {
        id: 'id2',
        value: 'value2',
      },
      {
        id: 'id3',
        value: 'value3',
      },
    ],
    destroyBlock: jest.fn(),
    moveBlock: jest.fn(),
  };
  beforeAll(() => {
    wrapper = shallow(<CodeDisplay {...props} />);
  });

  it('Should render an array of CodeBlocks', () => {
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.html()).toBe(false);
    // expect(wrapper.exists(CodeBlock)).toBe(true);
    // const blocks = wrapper.find(CodeBlock);
    // expect(blocks).toHaveLength(3);
    // for (let i = 0; i !== props.codeBlocks.length; i += 1) {
    //   expect(blocks[i].key()).toBe(props.codeBlocks[i].id);
    // }
  })
});
