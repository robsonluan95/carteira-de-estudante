import { useEffect, useState } from 'react'
import "./Home.css"
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../FireBase/FireBase'
import { toast } from 'react-toastify'
const Home = () => {
    const {user,loading}=useContext(UserContext)
    const [dadosUser,setDadosUser]=useState({})
    const userUID=user?user.uid:""
    
    useEffect(()=>{
      if (!userUID) return
      async function buscarDados(){
        try{
          const q=query(collection(db,"dadosCarteira"),where("UID","==",userUID))
          const querySnapshot =  await getDocs(q);
          if (querySnapshot.empty){
            setDadosUser({})
            toast.warn("Ainda não foi registrado!")
            return
          }
          const dados=querySnapshot.docs[0].data()
          setDadosUser({
            nome:dados.nome,
            cpf:dados.cpf,
            rg:dados.rg,
            dataNascimento:dados.dataNascimento,
            curso:dados.curso,
            instituicao:dados.instituicao,
            matricula:dados.matricula,
            nivelEnsino:dados.nivelEnsino,
            cidade:dados.cidade,
            UID:dados.UID,
          })
        }catch(error){
          console.error(error)
          toast.error("Erro ao buscar os dados da carteira")
        }
      }
      buscarDados()
    },[userUID])

    if (loading) return <p>Loading...</p>
    if (!user) return <Navigate to="/login" replace/>
    
  return (
   
    <div>
        <>
          <div className='container-card'>
            <div className='container-DNR'>
              <h1>DNE</h1>
              <span>Documento Nacional do Estudante</span>
              <img alt='MEC' src='https://www.ufpb.br/cpa/contents/noticias/a-cpa-comissao-propria-de-avaliacao-informa-que-ja-enviou-seu-relatorio-de-gestao-do-ano-de-2017-a-cpme/mec.png/@@images/bd00b145-32db-4493-8b65-fa13595b92e4.png'/>
            </div>

            <div className='container-dados'>
              <div className='container-foto'> 
                    <h1></h1>
              </div>
              <div className='container-estudante'>
                <h1>Dados do Estudante :</h1>
                <div className='container-dados-estudante'>
                  <h4>Nome: {dadosUser.nome}</h4>
                  <h4>CPF: {dadosUser.cpf}</h4>
                  <h4>RG: {dadosUser.rg}</h4>
                  <h4>Data de nascimento: {dadosUser.dataNascimento}</h4>
                </div>
              </div>
              
              <div className='container-escola'>
                <h4>Curso: {dadosUser.curso}</h4>
                <h4>Instituicao: {dadosUser.instituicao}</h4>
                <h4>Matricula: {dadosUser.matricula}</h4>
                <h4>Nivel de Ensino: {dadosUser.nivelEnsino}</h4>
                <h4>Cidade: {dadosUser.cidade}</h4>
              </div>
            </div>
            
            <div className='container-codigos'>
              <div >
                <img alt='QR Code' src='https://png.pngtree.com/png-clipart/20220605/original/pngtree-black-qr-code-for-web-png-image_7964376.png'/>
              </div>
              <div className='container-codigo-uso'>
                <span>Codigo de uso:</span>
                <span>8000551654896</span>
              </div>
              <div>
                <h1 className='Ano'>{new Date().getFullYear()}</h1>
              </div>
            </div>
            
          </div>
        </>
    </div>
  )
}

export default Home