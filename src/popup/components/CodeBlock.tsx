import * as React from 'react';

export interface CodeBlockProps {
  index: number,
  text: string,
  dragStatus: string,
  destroyBlock: (i: number) => void,
  onDragStart: (e: React.DragEvent, i: number) => void,
  onDragOver: (e: React.DragEvent, i: number) => void,
  onDragEnd: () => void,
  // onDrop: (e: React.DragEvent, i: number) => void,
}

export default ({ index, text, destroyBlock, onDragStart, onDragOver, onDragEnd, dragStatus }: CodeBlockProps) => {
  const i = text.indexOf('(') + 1;
  const j = text.indexOf(')');
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
      // onDrop={e => onDrop(e, index)}
    >
      {preSelector}
      <mark className="selector">
        {selector}
      </mark>
      {postSelector}
      <button type="button" className="invisible destroy" onClick={() => destroyBlock(index)}>x</button>
    </li>
  );
};
