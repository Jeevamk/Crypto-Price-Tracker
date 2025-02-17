import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from "./pages/Home";
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotProtectedRoute from './components/NotProtectedRoute.jsx';
import CoinGraph from './components/coinGraph/CoinGraph.jsx'
import './App.css'
import VerifyEmail from './pages/VerifyEmail.jsx';
import SearchHistoryPage from './pages/SearchHistoryPage.jsx'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/login" 
            element={
              <NotProtectedRoute>
                  <AuthForm />
              </NotProtectedRoute>
            }
             />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/signup" element={<AuthForm/>} />
          <Route
            path="/:symbol"
            element={
              <ProtectedRoute>
                <CoinGraph />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/search-history" 
            element={
              <ProtectedRoute>
                <SearchHistoryPage /> 
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}
