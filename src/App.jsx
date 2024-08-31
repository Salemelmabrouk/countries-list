// src/App.jsx
import { useState } from 'react';
import './index.css';  // Ensure Tailwind and Bootstrap CSS are imported
import NavBar from './components/NavBar';
import Countries from './components/Countries';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Countries />
    </>
  );
}

export default App;
