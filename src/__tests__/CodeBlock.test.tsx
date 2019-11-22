import * as React from 'react';
import { shallow } from 'enzyme';
import CodeBlock, { CodeBlockProps } from '../popup/components/CodeBlock';
import '../setupTests';

describe('CodeBlock', () => {
  let wrapper;
  const props: CodeBlockProps = {
    text: 'cy.get(\'.button\').click();',
    destroyBlock: jest.fn(),
    handleDragStart: jest.fn(),
    handleDragOver: jest.fn(),
    handleDragEnd: jest.fn(),
    handleDrop: jest.fn(),
  };
  describe('CodeBlock', () => {
    it('Should render a CodeBlock', () => {
      wrapper = shallow(<CodeBlock {...props} />);
      expect(wrapper).toMatchSnapshot();
      const item = wrapper.find('li');
      expect(item.find('mark').hasClass('selector')).toBe(true);
    });
  });
});
