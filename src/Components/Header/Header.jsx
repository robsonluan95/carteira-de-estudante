import {useContext} from 'react'
import "./Header.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
      <Link  className='link-home' to={"/"}><span className='logo'>CE</span><h2>Carteira de Estudante</h2></Link>
        
        <div className='container-link'>
            {user?(
              <>
                <NavLink to={"/"} end>Minha carteira</NavLink>
                <NavLink to={"/carteira"}>Meus dados</NavLink>
                <button className='btn btn-secundario' onClick={()=>handlesair()}>Sair</button>
              </>
            ):(
              <>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/cadastrar"}>Cadastrar</NavLink>
              </>
            )}
            
        </div>
    </div>
  )
}

export default Header
