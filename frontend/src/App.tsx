import React from 'react';
import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global'
import GlobalContext from './context';

function App() {
  return (
    <>
      <GlobalContext>
        <Dashboard />
        <GlobalStyle />
      </GlobalContext>
    </>
  );
}

export default App;
