import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LandingBox } from './LandingBox';

export const App: React.FC = () => {
  const [isRecording, setIsRecording] = React.useState<Boolean>(false);
  const [hasRecorded, setHasRecordered] = React.useState<Boolean>(false);

  return (
    <div id="App">
      <Header />
      <LandingBox />
      <Footer />
    </div>
  );
};
