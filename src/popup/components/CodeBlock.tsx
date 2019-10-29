import * as React from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/styles/hljs/docco'; 

registerLanguage('javascript', js);

export interface CodeBlockProps {
  index: number,
  onDragStart: (e: React.DragEvent, i: number) => void,
  onDragOver: (e: React.DragEvent, i: number) => void,
  onDrop: (e: React.DragEvent, i: number) => void,
  text: string,
  destroyBlock: (i: number) => void,
  dragStatus: string,
}

export default ({ index, text, destroyBlock, onDragStart, onDragOver, onDrop, dragStatus }: CodeBlockProps) => (
  <li
    className={dragStatus}
    draggable
    //isBeingDragged={index === draggedIdx}
    onDragStart={e => onDragStart(e, index)}
    // onDragEnter={e => onDragEnter(e, index)}
    onDragOver={e => onDragOver(e, index)}
    onDrop={e => onDrop(e, index)}
  >
    <SyntaxHighlighter language="javascript" style={docco}>
      {text}
    </SyntaxHighlighter>
    <button type="button" className="invisible destroy" onClick={() => destroyBlock(index)}>x</button>
  </li>
);
