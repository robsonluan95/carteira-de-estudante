import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
const Home = () => {
    const {user}=useContext(UserContext)
  return (

    <div>
       <h1>{user}</h1> 
    </div>
  )
}

export default Home