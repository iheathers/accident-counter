import React from 'react';
import Counter from './counter';
import MutationObserverCounter from './MutationObserverExample';

const Application = () => (
  <main className="flex items-center h-full place-content-center bg-cyan-900">
    <MutationObserverCounter />
  </main>
);

export default Application;
