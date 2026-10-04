import {useState} from 'react'
import "./Login.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FireBase/FireBase';

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigator= useNavigate()
    
    async function handleEntrar(){
        try{
            // o usuário do contexto é atualizado pelo onAuthStateChanged
            await signInWithEmailAndPassword(auth,email,password)
            toast.success('Usuário conectado')
            navigator("/")
        }catch(error){
            console.error(error)
            if (error.code==="auth/invalid-email"){
                toast.warn(`Email invalido!`)
            }else if (error.code==="auth/invalid-login-credentials"||error.code==="auth/invalid-credential"||error.code==="auth/wrong-password"||error.code==="auth/user-not-found"){
                toast.warn(`Email ou senha incorretos!`)
            }else if (error.code==="auth/missing-password"){
                toast.warn(`Esqueceu de inserir a senha!`)
            }else{
                toast.warn(`Erro ao entrar!`)
            }
        }
    }
  return ( 
    <form className='container-login' onSubmit={(e)=>{e.preventDefault();handleEntrar()}}>
        <h1>Login</h1>
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
        
        <button type='submit' className="btn btn-entrar">Entrar</button>
    </form>
  )
}

export default Login
