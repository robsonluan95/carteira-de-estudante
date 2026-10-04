import Rotas from './router'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} theme="dark"/>
        <Rotas/>
    </div>
  )
}

export default App
