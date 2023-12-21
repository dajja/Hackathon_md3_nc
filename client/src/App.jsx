import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Todo from './components/Todo';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/todo' element={<Todo />}/>
    </Routes>
  )
}
