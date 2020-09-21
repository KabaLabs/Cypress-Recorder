import * as React from 'react';
import CodeBlock from './CodeBlock';
import type { Block } from '../../types';

export interface CodeDisplayProps {
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
}

export default ({ codeBlocks, destroyBlock, moveBlock }: CodeDisplayProps) => {
  const [dragOriginIdx, setDragOriginIdx] = React.useState<number>(-1);
  const [draggedIdx, setDraggedIdx] = React.useState<number>(-1);
  const [modifiedCodeBlocks, setModifiedCodeBlocks] = React.useState<Block[]>([]);

  React.useEffect(() => {
    setModifiedCodeBlocks([...codeBlocks]);
  }, [codeBlocks]);

  const swapBlocks = (i: number, j: number) => {
    const temp = [...modifiedCodeBlocks];
    const holder = temp[i];
    temp[i] = temp[j];
    temp[j] = holder;
    setModifiedCodeBlocks(temp);
  };

  const onDragStart = (e: React.DragEvent, i: number) => {
    setDraggedIdx(i);
    setDragOriginIdx(i);
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (draggedIdx !== i) {
      swapBlocks(draggedIdx, i);
      setDraggedIdx(i);
    }
  };

  const onDragEnd = () => {
    setDraggedIdx(-1);
    setModifiedCodeBlocks([...codeBlocks]);
  };

  const onDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragOriginIdx !== i) moveBlock(dragOriginIdx, i);
    setDragOriginIdx(-1);
  };

  const blocks = modifiedCodeBlocks.map((block, idx) => (
    <CodeBlock
      key={block.id}
      dragStatus={idx === draggedIdx ? 'drag-origin' : 'code-block'}
      text={block.value}
      index={idx}
      destroyBlock={destroyBlock}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    />
  ));

  return (
    <ul id="code-display">
      {blocks}
    </ul>
  );
};
