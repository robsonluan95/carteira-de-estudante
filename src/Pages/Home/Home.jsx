import React, { useEffect, useState } from 'react'
import "./Home.css"
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
          <div className='container-card'>
            <div className='container-DNR'>
              <h1>DNE</h1>
              <span>Documento Nacional do Estudante</span>
              <img src='https://www.ufpb.br/cpa/contents/noticias/a-cpa-comissao-propria-de-avaliacao-informa-que-ja-enviou-seu-relatorio-de-gestao-do-ano-de-2017-a-cpme/mec.png/@@images/bd00b145-32db-4493-8b65-fa13595b92e4.png'/>
            </div>

            <div className='container-dados'>
              <div className='container-foto'> 
                    <h1></h1>
              </div>
              <div className='container-estudante'>
                <h1>Dados do Estudante :</h1>
                <div className='container-dados-estudante'>
                  <h3>Nome: {dadosUser.nome}</h3>
                  <h3>CPF: {dadosUser.cpf}</h3>
                  <h3>RG: {dadosUser.rg}</h3>
                  <h3>Data de nascimento: {dadosUser.dataNascimento}</h3>
                </div>
              </div>
              
              <div className='container-escola'>
                <h3>Curso: {dadosUser.curso}</h3>
                <h3>Instituicao: {dadosUser.instituicao}</h3>
                <h3>Matricula: {dadosUser.matricula}</h3>
                <h3>Nivel de Ensino: {dadosUser.nivelEnsino}</h3>
                <h3>Cidade: {dadosUser.cidade}</h3>
              </div>
            </div>
            
            <div className='container-codigos'>
              <div >
                <img src='https://png.pngtree.com/png-clipart/20220605/original/pngtree-black-qr-code-for-web-png-image_7964376.png'/>
              </div>
              <div className='container-codigo-uso'>
                <span>Codigo de uso:</span>
                <span>Documento Nacional do Estudante</span>
              </div>
              <div>
                <h1 className='Ano'>2023</h1>
              </div>
            </div>
            
          </div>
        </>
       ):(<p>Loading...</p>)}
    </div>
  )
}

export default Home