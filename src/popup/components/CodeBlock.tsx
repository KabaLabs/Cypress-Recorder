import * as React from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/styles/hljs/docco'; 

registerLanguage('javascript', js);

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

export default ({ index, text, destroyBlock, onDragStart, onDragOver, onDragEnd, onDrop, dragStatus }: CodeBlockProps) => (
  <li
    className={dragStatus}
    draggable
    onDragStart={e => onDragStart(e, index)}
    onDragEnd={onDragEnd}
    onDragOver={e => onDragOver(e, index)}
    onDrop={e => onDrop(e, index)}
  >
    <SyntaxHighlighter language="javascript" style={docco}>
      {text}
    </SyntaxHighlighter>
    <button type="button" className="invisible destroy" onClick={() => destroyBlock(index)}>x</button>
  </li>
);
