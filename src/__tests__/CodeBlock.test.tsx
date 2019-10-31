import * as React from 'react';
import { shallow } from 'enzyme';
import CodeBlock, { CodeBlockProps } from '../popup/components/CodeBlock';
import '../setupTests';

describe('CodeBlock', () => {
  let wrapper;
  const props: CodeBlockProps = {
    index: 0,
    text: 'cy.get(\'.button\').click();',
    dragStatus: 'code-block',
    destroyBlock: jest.fn(),
    onDragStart: jest.fn(),
    onDragOver: jest.fn(),
    onDragEnd: jest.fn(),
    onDrop: jest.fn(),
  };
  describe('CodeBlock', () => {
    it('Should render a CodeBlock', () => {
      wrapper = shallow(<CodeBlock {...props} />);
      expect(wrapper).toMatchSnapshot();
      const item = wrapper.find('li');
      expect(item.hasClass(props.dragStatus)).toBe(true);
      expect(item.find('mark').hasClass('selector')).toBe(true);
    });
  });
});
