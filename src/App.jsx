import React from 'react';
import './App.css'
import Layout from './Layout.jsx'
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<Home />} /> 
        
      </Route>
    </Routes>
  </Router>
    
  )
}

