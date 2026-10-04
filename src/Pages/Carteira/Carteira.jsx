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

    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to="/login" replace/>

  return (
    <div>
                <div>
                    <h3>Nome Completo:</h3>
                    <input placeholder='Nome Completo' value={nome} onChange={(e)=>{setNome(e.target.value)}} />
                </div>
                <div>
                    <h3>CPF:</h3>
                    <input placeholder='Numero do CPF' inputMode='numeric' value={cpf} onChange={(e)=>{setCPF(e.target.value)}}/>
                </div>
                <div>
                    <h3>RG:</h3>
                    <input placeholder='Numero do RG' inputMode='numeric' value={rg} onChange={(e)=>{setRG(e.target.value)}} />
                </div>
                <div>
                    <h3>Data de nascimento:</h3>
                    <input type='date'  value={dataNascimento} onChange={(e)=>{setDataNascimento(e.target.value)}}/>
                </div>
                <div>
                    <h3>Curso:</h3>
                    <input placeholder='Nome do Curso'  value={curso} onChange={(e)=>{setCurso(e.target.value)}}/>
                </div>
                <div>
                    <h3>Instituição:</h3>
                    <input placeholder='Nome da Instituição' value={instituicao} onChange={(e)=>{setinstituicao(e.target.value)}} />
                </div>
                <div>
                    <h3>Matricula:</h3>
                    <input placeholder='Numero da Matricula' inputMode='numeric' value={matricula} onChange={(e)=>{setMatricula(e.target.value)}} />
                </div>
                <div>
                    <h3>Nivel de Ensino:</h3>
                    <input placeholder='Nivel de Ensino' value={nivelEnsino} onChange={(e)=>{setNivelEnsino(e.target.value)}} />
                </div>
                <div>
                    <h3>Nome da Cidade:</h3>
                    <input placeholder='Nome da Cidade' value={cidade} onChange={(e)=>{setCidade(e.target.value)}}/>
                </div>
                <div>
                    <h3>UID:</h3>
                    <input placeholder='UID'  value={user.uid} disabled />
                </div>

                <button onClick={()=>{handleGerar()}}>Gerar!</button>
    </div>
  )
}

export default Carteira
