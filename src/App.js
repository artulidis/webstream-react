import React from 'react';
import {BrowserRouter as Router, Routes, Route, useRoutes} from 'react-router-dom'
import LoginPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import LayoutPage from './pages/LayoutPage';
import {GlobalProvider} from './global/GlobalContext';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './global/PrivateRoute';

function App() {

  return (
    <Router>
      <GlobalProvider>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>

          <Route path='/' exact element={<MainPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<LoginPage/>} />

          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/profile' element={<ProfilePage/>} />
          </Route>

        </Route>
      </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
