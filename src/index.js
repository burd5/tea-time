import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login'
import Signup from './components/Signup'
import Findtea from './components/Findtea'



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
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
