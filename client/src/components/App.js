import React, { useState } from 'react';
import Routes from './Routes';
import Nav from "./shared/Nav";

function App() {

  const [user, setUser] = useState(false);

  return (
    <>
      <Nav />
      <Routes setUser={setUser} />
    </>
  );
}

export default App;
