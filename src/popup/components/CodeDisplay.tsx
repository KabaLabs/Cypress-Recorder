import * as React from 'react';

export interface CodeDisplayProps {
  codeBlocks: string[],
  destroyBlock: (index: number) => void,
}

const CodeDisplay = ({ codeBlocks, destroyBlock }: CodeDisplayProps) => {
  const blocks = codeBlocks.map((block, index) => (
    <>
      <p>{block}</p>
      <button className="destroy" onClick={() => destroyBlock(index)}>x</button>
    </>
  ));

  return (
    <div id="code-display">
      {blocks}
    </div>
  );
};

const areEqual = (
  { codeBlocks: prevBlocks }: CodeDisplayProps,
  { codeBlocks: nextBlocks }: CodeDisplayProps,
): boolean => {
  if (prevBlocks.length !== nextBlocks.length) return false;
  for (let i = 0; i !== prevBlocks.length; i += 1) {
    if (prevBlocks[i] !== nextBlocks[i]) return false;
  }
  return true;
};

export default React.memo(CodeDisplay, areEqual);
