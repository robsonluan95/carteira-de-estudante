import {useState,useEffect,useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { db} from '../../FireBase/FireBase'
import { collection, addDoc,getDocs,query,where } from "firebase/firestore"; 
import { toast } from 'react-toastify';

const Carteira = () => {
    const {user,loading}=useContext(UserContext)
    const userUID=user?user.uid:"";
    const [jaCadastrado,setJaCadastrado]=useState(false)

    const [nome,setNome]=useState("")
    const [cpf,setCPF]=useState("")
    const [rg,setRG]=useState("")
    const [dataNascimento,setDataNascimento]=useState("")
    const [curso,setCurso]=useState("")
    const [instituicao,setinstituicao]=useState("")
    const [matricula,setMatricula]=useState("")
    const [nivelEnsino,setNivelEnsino]=useState("")
    const [cidade,setCidade]=useState("")


    useEffect(()=>{
        if (!userUID) return
        async function attdados(){
            try{
                const q=query(collection(db,"dadosCarteira"),where("UID","==",userUID))
                const querySnapshot =  await getDocs(q);
                setJaCadastrado(!querySnapshot.empty)
            }catch(error){
                console.error(error)
            }
        }
        attdados()
    },[userUID])

    
    async function handleGerar(){
        if (!nome || !cpf || !rg || !dataNascimento || !curso || !instituicao || !matricula || !nivelEnsino || !cidade ) {
            toast.error('Por favor, preencha todos os campos');
            return;
        }
        
        if (jaCadastrado){ 
            toast.error("Documento ja existente!");
            return
        }
    
        try{
            await addDoc(collection(db,"dadosCarteira"),{
                nome,
                cpf,
                rg,
                dataNascimento,
                curso,
                instituicao,
                matricula,
                nivelEnsino,
                cidade,
                UID:userUID
            })
            toast.success('Carteira cadastrada com Sucesso');
            setJaCadastrado(true)
            setNome("")
            setCPF("")
            setRG("")
            setDataNascimento("")
            setCurso("")
            setinstituicao("")
            setMatricula("")
            setNivelEnsino("")
            setCidade("")
        }catch(error){
            console.error(error)
            toast.error(`Erro ao cadastrar carteira: ${error.message}`);
        }
    }

    if (loading) return <p className='carregando'>Carregando...</p>
    if (!user) return <Navigate to="/login" replace/>

  return (
    <form className='form-card form-card-largo' onSubmit={(e)=>{e.preventDefault();handleGerar()}}>
            <h1>Dados da carteira</h1>
            <p className='subtitulo'>Preencha seus dados para gerar a carteira</p>
            <div className='form-grid'>
                <div className='campo'>
                    <label htmlFor='nome'>Nome Completo</label>
                    <input id='nome' placeholder='Nome Completo' value={nome} onChange={(e)=>{setNome(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='cpf'>CPF</label>
                    <input id='cpf' placeholder='Numero do CPF' inputMode='numeric' value={cpf} onChange={(e)=>{setCPF(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='rg'>RG</label>
                    <input id='rg' placeholder='Numero do RG' inputMode='numeric' value={rg} onChange={(e)=>{setRG(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='dataNascimento'>Data de nascimento</label>
                    <input id='dataNascimento' type='date' value={dataNascimento} onChange={(e)=>{setDataNascimento(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='curso'>Curso</label>
                    <input id='curso' placeholder='Nome do Curso' value={curso} onChange={(e)=>{setCurso(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='instituicao'>Instituição</label>
                    <input id='instituicao' placeholder='Nome da Instituição' value={instituicao} onChange={(e)=>{setinstituicao(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='matricula'>Matrícula</label>
                    <input id='matricula' placeholder='Numero da Matricula' inputMode='numeric' value={matricula} onChange={(e)=>{setMatricula(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='nivelEnsino'>Nível de Ensino</label>
                    <input id='nivelEnsino' placeholder='Ex.: Superior' value={nivelEnsino} onChange={(e)=>{setNivelEnsino(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='cidade'>Cidade</label>
                    <input id='cidade' placeholder='Nome da Cidade' value={cidade} onChange={(e)=>{setCidade(e.target.value)}} />
                </div>
                <div className='campo'>
                    <label htmlFor='uid'>UID</label>
                    <input id='uid' value={user.uid} disabled />
                </div>
            </div>
            <button type='submit' className='btn'>Gerar carteira</button>
    </form>
  )
}

export default Carteira
