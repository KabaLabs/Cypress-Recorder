import * as React from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/styles/hljs/docco'; 

registerLanguage('javascript', js);

export interface CodeDisplayProps {
  codeBlocks: string[],
  destroyBlock: (index: number) => void,
}

const CodeDisplay = ({ codeBlocks, destroyBlock }: CodeDisplayProps) => {
  const blocks = codeBlocks.map((block, index) => (
    <>
      <div className="block-code">
      <SyntaxHighlighter language="javascript" style={docco}>
      {block}
      </SyntaxHighlighter>
      <button className="invisible destroy" onClick={() => destroyBlock(index)}>x</button>
      </div>
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
