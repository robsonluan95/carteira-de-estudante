import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../FireBase/FireBase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const {user,setUser}=useContext(UserContext)
    const [dadosUser,setDadosUser]=useState({})
    const [dadosUID,setDadosUID]=useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
      async function buscarDados(){
        const querySnapshot =  await getDocs(collection(db,"dadosCarteira"));
        querySnapshot.forEach((doc) => {
          setDadosUID(doc.data().UID)
          if (doc.data().UID===(user.uid)||(doc.data().UID===dadosUID)){
            setDadosUser({
              nome:doc.data().nome,
              cpf:doc.data().cpf,
              rg:doc.data().rg,
              dataNascimento:doc.data().dataNascimento,
              curso:doc.data().curso,
              instituicao:doc.data().instituicao,
              matricula:doc.data().matricula,
              nivelEnsino:doc.data().nivelEnsino,
              cidade:doc.data().cidade,
              UID:doc.data().UID,
            })
            console.log(doc.data().nome);
          }else{
            toast.warn("Ainda não foi registrado!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              
          }
          
          
        });
      }
      buscarDados()
    },[])
    
  return (
   
    <div>
       {user?(
        <>
          <div>
            <h1>{dadosUser.nome}</h1>
            <h1>{dadosUser.cpf}</h1>
            <h1>{dadosUser.rg}</h1>
            <h1>{dadosUser.dataNascimento}</h1>
            <h1>{dadosUser.curso}</h1>
            <h1>{dadosUser.instituicao}</h1>
            <h1>{dadosUser.matricula}</h1>
            <h1>{dadosUser.nivelEnsino}</h1>
            <h1>{dadosUser.cidade}</h1>
          </div>
        </>
       ):(<p>Loading...</p>)}
    </div>
  )
}

export default Home