import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//Pages
import Home from './Pages/Home/Home'
import Header from './Components/Header/Header'
import Login from './Pages/Login/Login'
import Cadastrar from './Pages/Cadastrar/Cadastrar'
import Carteira from './Pages/Carteira/Carteira'

const Rotas = () => {
  return (
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastrar' element={<Cadastrar/>}/>
                <Route path='/carteira' element={<Carteira/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default Rotas