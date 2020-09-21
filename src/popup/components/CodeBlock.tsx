import * as React from 'react';

export interface CodeBlockProps {
  index: number,
  text: string,
  dragStatus: string,
  destroyBlock: (i: number) => void,
  onDragStart: (e: React.DragEvent, i: number) => void,
  onDragOver: (e: React.DragEvent, i: number) => void,
  onDragEnd: () => void,
  onDrop: (e: React.DragEvent, i: number) => void,
}

export default ({
  index,
  text,
  destroyBlock,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  dragStatus,
}: CodeBlockProps) => {
  const i = text.startsWith('cy.url()')
    ? text.lastIndexOf('\'', text.length - 4)
    : text.indexOf('\'');
  const j = text.lastIndexOf('\'') + 1;
  const preSelector = text.slice(0, i);
  const selector = text.slice(i, j);
  const postSelector = text.slice(j);
  return (
    <li
      className={dragStatus}
      draggable
      onDragStart={e => onDragStart(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={e => onDragOver(e, index)}
      onDrop={e => onDrop(e, index)}
    >
      <span>
        {preSelector}
        <mark className="selector">
          {selector}
        </mark>
        {postSelector}
      </span>
      <button type="button" className="delete" onClick={() => destroyBlock(index)}>x</button>
    </li>
  );
};
