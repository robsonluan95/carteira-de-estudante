import {useState} from 'react'
import "./Cadastrar.css"
import {auth} from "../../FireBase/FireBase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Cadastrar = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  let navigate=useNavigate()
  async function handleCadastro(){
    try{
      // o usuário do contexto é atualizado pelo onAuthStateChanged
      await createUserWithEmailAndPassword(auth,email,password)
      toast.success('Usuário Cadastrado com Sucesso')
      navigate("/carteira")
    }catch(error){
      console.error(error)
      if(error.code==="auth/invalid-email"){
        toast.warn('Email invalido')
      }else if (error.code==="auth/email-already-in-use"){
        toast.warn('Email em uso')
      }else if (error.code==="auth/missing-password"){
        toast.warn('Digite uma senha')
      }else if (error.code==="auth/weak-password"){
        toast.warn('Senha muito curta (mínimo 6 caracteres)')
      }else{
        toast.warn('Erro!')
      }
    }
  }
  return (
    <form className='container-cadastrar' onSubmit={(e)=>{e.preventDefault();handleCadastro()}}>
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
        <button type='submit' className='btn btn-cadastrar'>Cadastrar</button>
    </form>
  )
}

export default Cadastrar
