import * as React from 'react';
import CodeBlock from './CodeBlock';

export interface CodeDisplayProps {
  codeBlocks: string[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
}

export default ({ codeBlocks, destroyBlock, moveBlock }: CodeDisplayProps) => {
  const [draggedIdx, setDraggedIdx] = React.useState<number>(-1);

  const onDragStart = (e: React.DragEvent, i: number) => {
    setDraggedIdx(i);
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    if (draggedIdx !== i) {
      e.preventDefault();
      moveBlock(draggedIdx, i);
      setDraggedIdx(i);
    }
  };

  const onDragEnd = () => {
    setDraggedIdx(-1);
  }

  // const onDrop = (e: React.DragEvent, i: number) => {
  //   e.preventDefault();
  //   moveBlock(draggedIdx, i);
  // }

  const blocks = codeBlocks.map((block, index) => {
    let dragStatus: string;
    if (index === draggedIdx) dragStatus = 'drag-origin';
    // else if (index === dragOverIdx) dragStatus = 'drag-over';
    else dragStatus = 'code-block';
    return (
      <CodeBlock
        dragStatus={dragStatus}
        text={block}
        index={index}
        destroyBlock={destroyBlock}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        // onDrop={onDrop}
      />
  )});

  return (
    <ul id="code-display">
      {blocks}
    </ul>
  );
};
