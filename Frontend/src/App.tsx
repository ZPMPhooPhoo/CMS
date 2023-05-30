import React from 'react';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './pages/auth/login';
import {Routers} from './route';

export const App = () => {
  return (
    <Routers/>
  );
};
