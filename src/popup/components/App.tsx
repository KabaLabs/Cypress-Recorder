import * as React from 'react';
import { Button } from './Button';
import { CodeDisplay } from './CodeDisplay';

export interface AppProps { }

export const App = (props: AppProps) => (
  <div>
    This is the App file
    <CodeDisplay />
    <Button />
  </div>
);
