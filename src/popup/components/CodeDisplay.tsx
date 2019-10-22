import * as React from 'react';
import { BlockData } from '../../types';

export interface CodeDisplayProps {
  codeBlocks: BlockData,
}

const CodeDisplay = ({ codeBlocks }: CodeDisplayProps) => {

  const styleObj = {
    border: '3px solid black',
    margin: 10
  }
  const blocks = codeBlocks.map(block => (
    
    <span>
        <p style={{border: '2px solid red'}} >
          {block}
          <span style={styleObj}>X</span>
        </p>
      </span>
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
}

export default React.memo(CodeDisplay, areEqual);
