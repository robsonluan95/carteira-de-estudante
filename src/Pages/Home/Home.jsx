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

    function formatarData(data){
      if (!data) return ""
      const [ano,mes,dia]=data.split("-")
      return `${dia}/${mes}/${ano}`
    }

    if (loading) return <p className='carregando'>Carregando...</p>
    if (!user) return <Navigate to="/login" replace/>

  return (
    <div className='carteira'>
      <div className='carteira-topo'>
        <div>
          <h1>DNE</h1>
          <span className='carteira-rotulo'>Documento Nacional do Estudante</span>
        </div>
        <img className='carteira-logo' alt='MEC' src='https://www.ufpb.br/cpa/contents/noticias/a-cpa-comissao-propria-de-avaliacao-informa-que-ja-enviou-seu-relatorio-de-gestao-do-ano-de-2017-a-cpme/mec.png/@@images/bd00b145-32db-4493-8b65-fa13595b92e4.png'/>
      </div>

      <div className='carteira-corpo'>
        <div className='carteira-foto'>
          <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z'/></svg>
        </div>

        <dl className='carteira-dados'>
          <div className='dado dado-largo'><dt>Nome</dt><dd>{dadosUser.nome||"-"}</dd></div>
          <div className='dado'><dt>CPF</dt><dd>{dadosUser.cpf||"-"}</dd></div>
          <div className='dado'><dt>RG</dt><dd>{dadosUser.rg||"-"}</dd></div>
          <div className='dado'><dt>Nascimento</dt><dd>{formatarData(dadosUser.dataNascimento)||"-"}</dd></div>
          <div className='dado'><dt>Matrícula</dt><dd>{dadosUser.matricula||"-"}</dd></div>
          <div className='dado dado-largo'><dt>Curso</dt><dd>{dadosUser.curso||"-"}</dd></div>
          <div className='dado'><dt>Nível de ensino</dt><dd>{dadosUser.nivelEnsino||"-"}</dd></div>
          <div className='dado'><dt>Instituição</dt><dd>{dadosUser.instituicao||"-"}</dd></div>
          <div className='dado'><dt>Cidade</dt><dd>{dadosUser.cidade||"-"}</dd></div>
        </dl>
      </div>

      <div className='carteira-codigos'>
        <img className='carteira-qr' alt='QR Code' src='https://png.pngtree.com/png-clipart/20220605/original/pngtree-black-qr-code-for-web-png-image_7964376.png'/>
        <div className='carteira-codigo-uso'>
          <span>Código de uso:</span>
          <strong>8000551654896</strong>
        </div>
        <span className='carteira-data'>{new Date().toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  )
}

export default Home
