import React,{useContext,useState} from 'react'
import "./Login.css"
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FireBase/FireBase';

const Login = () => {
    const {user,setUser}=useContext(UserContext)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigator= useNavigate()
    async function handleEntrar(){
        await signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            toast.success('Usuário conctado', {
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
            navigator("/")
        })
        .catch((error)=>{
            console.log(error)
            if (error.code==="auth/invalid-email"){
                toast.warn(`Email invalido!`, {
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
            }else if (error.code==="auth/invalid-login-credentials"){
                toast.warn(`Senha errada!`, {
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
                toast.warn(`Error`, {
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
    <div className='container-login'>
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
        
        <button className="btn btn-entrar" onClick={()=>handleEntrar()}>Entrar</button>
    </div>
  )
}

export default Login