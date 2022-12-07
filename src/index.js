import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login'
import Signup from './components/Signup'
import Findtea from './components/Findtea'
import Collection from './components/Collection'
import TeaGenerator from './components/TeaGenerator'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/findtea" element={<Findtea />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/teagenerator" element={<TeaGenerator />} />
    </Routes>
  </BrowserRouter>
);
