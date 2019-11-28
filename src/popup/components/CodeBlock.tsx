import * as React from 'react';

export interface CodeBlockProps {
  text: string,
  destroyBlock: () => void,
  handleDragStart: () => void,
  handleDragOver: (e: React.DragEvent) => void,
  handleDrop: (e: React.DragEvent) => void,
  handleDragEnd: () => void,
}

export default ({
  text,
  destroyBlock,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
}: CodeBlockProps) => {
  const i = text.indexOf('(') + 1;
  const j = text.startsWith('cy.visit')
    ? text.lastIndexOf(')')
    : text.lastIndexOf(')', text.length - 4);
  const preSelector = text.slice(0, i);
  const selector = text.slice(i, j);
  const postSelector = text.slice(j);
  return (
    <li
      className={'code-block'}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span>
        {preSelector}
        <mark className="selector">
          {selector}
        </mark>
        {postSelector}
      </span>
      <button type="button" className="delete" onClick={destroyBlock}>x</button>
    </li>
  );
};
