import { useState } from 'react'
import Rotas from './router'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {


  return (
    <div>
      <ToastContainer autoClose={2000}/>
        <Rotas/>
    </div>
  )
}

export default App
