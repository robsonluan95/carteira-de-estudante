import React, { useState,useContext } from 'react'
import "./Cadastrar.css"
import {db , auth} from "../../FireBase/FireBase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from 'react-toastify'
import { UserContext } from '../../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

const Cadastrar = () => {
  const {user,setUser}=useContext(UserContext)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  let navigate=useNavigate()
  console.log(email)
  async function handleCadastro(){
    await createUserWithEmailAndPassword(auth,email,password )
    .then(()=>{
      toast.success('Usuário Cadastrado com Sucesso', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setUser(true)
        navigate("/carteira")
    }).catch((error)=>{
      if(error.code==="auth/invalid-email"){
        toast.warn('Email invalido', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setUser(false)
      }else if (error.code==="auth/email-already-in-use"){
        toast.warn('Email em uso', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setUser(false)
      }else if (error.code==="auth/missing-password"){
        toast.warn('Senha errada', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setUser(false)
      }else if (error.code==="auth/weak-password"){
        toast.warn('Senha muito curta', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setUser(false)
      }else{
        toast.warn('Erro!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setUser(false)
      }
    })
  }
  return (
    <div className='container-cadastrar'>
      <h1>Cadastre-se</h1>
        <div className='container-input'>
            <div className='container-email'>
                <h2>Email: </h2>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Digite seu e-mail...' />
            </div>
            <div className='container-password'>
                <h2>Senha:</h2>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Digite sua senha...' />
            </div>
        </div>
        <button className='btn btn-cadastrar' onClick={()=>handleCadastro()}>Cadastrar</button>
    </div>
  )
}

export default Cadastrar