import React,{useContext,useState} from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { toast} from 'react-toastify'
import { signOut } from 'firebase/auth'
import { auth } from '../../FireBase/FireBase'




const Header = () => {
    const {user,setUser,userDetails,setUserDetails}=useContext(UserContext)
    async function handlesair(){
      await signOut(auth)
      toast.success('Usuário desconectado', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      setUser()
      setUserDetails({})            
        
    }
  return (
    <div className='container-header'>
        <h2>Carteira de Estudante</h2>
        <div className='container-link'>
            {user?(<button className='btn btn-sair' onClick={()=>handlesair()}>sair</button>):(<Link to={"/login"}>Login</Link>)}
            {user?(<Link to={"/carteira"}>Carteira</Link>):(<Link to={"/cadastrar"}>Cadastrar</Link>)}
            
        </div>
    </div>
  )
}

export default Header