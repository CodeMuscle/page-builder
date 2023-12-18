// App.tsx
import React from 'react';
import '../styles.css';

import MiniPageBuilder from './components/MiniPageBuilder';

const App: React.FC = () => {
  return (
    <div>
      <h1>Mini Page Builder App</h1>
      <MiniPageBuilder />
    </div>
  );
};

export default App;
