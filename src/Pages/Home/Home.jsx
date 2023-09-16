import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
const Home = () => {
    const {user,setUser}=useContext(UserContext)
    console.log(user)
  return (
    
    <div>
       {user?(
        <>
        <h1>{`Welcome ${user.email}`}</h1><br/>
        </>
       ):(<p>Loading...</p>)}
    </div>
  )
}

export default Home