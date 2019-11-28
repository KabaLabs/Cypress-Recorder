import * as React from 'react';
import CodeBlock from './CodeBlock';
import { Block } from '../../types';

export interface CodeDisplayProps {
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
}

export default ({ codeBlocks, destroyBlock, moveBlock }: CodeDisplayProps) => {
  const [dragOrigin, setDragOrigin] = React.useState<number>(-1);
  const [draggedIdx, setDraggedIdx] = React.useState<number>(-1);
  const [modified, setModified] = React.useState<number[]>([]);

  const initModified = (): void => {
    const temp = [];
    for (let i = 0; i < codeBlocks.length; i += 1) {
      temp.push(i);
    }
    setModified(temp);
  }

  React.useEffect(() => {
    initModified();
  }, [codeBlocks]);

  const swapBlocks = (i: number, j: number) => {
    const newModified = [...modified];
    const temp = newModified[i];
    newModified[i] = newModified[j];
    newModified[j] = temp;
    setModified(newModified);
  };

  const handleDragStart = (i: number) => {
    setDraggedIdx(i);
    setDragOrigin(i);
  };

  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (draggedIdx !== i) {
      swapBlocks(draggedIdx, i);
      setDraggedIdx(i);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(-1);
    initModified();
  };

  const handleDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragOrigin !== i) moveBlock(dragOrigin, i);
    setDragOrigin(-1);
  };

  const blocks: JSX.Element[] = [];
  modified.forEach((i, displayIdx) => {
    const block: Block | undefined = codeBlocks[i];
    if (block) blocks.push(
      <CodeBlock
        key={block.id}
        text={block.value}
        destroyBlock={() => destroyBlock(i)}
        handleDragStart={() => handleDragStart(i)}
        handleDragOver={e => handleDragOver(e, displayIdx)}
        handleDrop={e => handleDrop(e, displayIdx)}
        handleDragEnd={handleDragEnd}
      />);
  });

  return (
    <ul id="code-display">
      {blocks}
    </ul>
  );
};
