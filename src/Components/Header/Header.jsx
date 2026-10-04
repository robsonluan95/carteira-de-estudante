import {useContext} from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { toast} from 'react-toastify'
import { signOut } from 'firebase/auth'
import { auth } from '../../FireBase/FireBase'


const Header = () => {
    const {user,setUser,setUserDetails}=useContext(UserContext)
    const navigate=useNavigate()
    async function handlesair(){
      try{
        await signOut(auth)
        toast.success('Usuário desconectado')
        setUser(null)
        setUserDetails({})
        navigate("/login")
      }catch(error){
        console.error(error)
        toast.error('Erro ao sair')
      }
    }
  return (
    <div className='container-header'>
      <Link  className='link-home' to={"/"}><h2>Carteira de Estudante</h2></Link>
        
        <div className='container-link'>
            {user?(<button className='btn btn-sair' onClick={()=>handlesair()}>sair</button>):(<Link to={"/login"}>Login</Link>)}
            {user?(<Link to={"/carteira"}>Carteira</Link>):(<Link to={"/cadastrar"}>Cadastrar</Link>)}
            
        </div>
    </div>
  )
}

export default Header
