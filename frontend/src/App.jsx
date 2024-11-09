import { useState, useEffect } from 'react'
import './app.css'
import Flow from './pages/Flow';
import Customer from './pages/Customer';
import Vendor from './pages/Vendor';
import { getCheckJWT } from './services/oauth';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [mode, setMode] = useState('customer');

  const handleSetMode = (mode) => {  
    localStorage.setItem('mode', mode);
    setMode(mode);
  };

  useEffect(() => {
    getCheckJWT().then((bool) => {
      if(bool) {
        setUserLoggedIn(bool)
      } else {
        localStorage.removeItem("permissionAsked");
      }
    })

    const mode = localStorage.getItem('mode');
    if(mode) {
      setMode(mode);
    }
  }, [])

  return (
    <>
    {(console.log(mode))}
      { userLoggedIn ? 
        (
          (mode === 'customer') ?
          <Customer/> :
          <Vendor/>
        ) :
        <Flow setUserLoggedIn={setUserLoggedIn} setMode={handleSetMode} mode={mode} /> 
      }
    </>
  )
}

export default App
