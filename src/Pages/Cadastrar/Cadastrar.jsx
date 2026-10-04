import {useState} from 'react'
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
    <form className='form-card' onSubmit={(e)=>{e.preventDefault();handleCadastro()}}>
      <h1>Cadastre-se</h1>
        <p className='subtitulo'>Crie sua conta para gerar a carteira</p>
        <div className='campo'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Digite seu e-mail...' />
        </div>
        <div className='campo'>
            <label htmlFor='senha'>Senha</label>
            <input id='senha' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Digite sua senha...' />
        </div>
                <button type='submit' className='btn'>Cadastrar</button>
    </form>
  )
}

export default Cadastrar
