import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import UpdateProfile from './Pages/UpdateProfile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
        <Route exact path='/signin' element={< SignIn />}></Route>
        <Route exact path='/updateprofile' element={< UpdateProfile />}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
