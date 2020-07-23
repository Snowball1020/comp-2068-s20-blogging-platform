import React, { useState } from 'react';
import Routes from './Routes';
import Nav from "./shared/Nav";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const [user, setUser] = useState(false);

  return (
    <>
      <ToastContainer />
      <Nav user={user} />
      <Routes user={user} setUser={setUser} />
    </>
  );
}

export default App;
