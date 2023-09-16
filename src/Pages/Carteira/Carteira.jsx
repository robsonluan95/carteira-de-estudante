import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { auth,db} from '../../FireBase/FireBase'
import { collection, addDoc,getDocs } from "firebase/firestore"; 
import { toast } from 'react-toastify';

const Carteira = () => {
    const {user,setUser}=useContext(UserContext)
    const userUID=user?user.uid:"";
    const [dadoRepetido,setDadoRepetido]=useState("")

    const [nome,setNome]=useState("")
    const [cpf,setCPF]=useState("")
    const [rg,setRG]=useState("")
    const [dataNascimento,setDataNascimento]=useState("")
    const [curso,setCurso]=useState("")
    const [instituicao,setinstituicao]=useState("")
    const [matricula,setMatricula]=useState("")
    const [nivelEnsino,setNivelEnsino]=useState("")
    const [cidade,setCidade]=useState("")
    const [UID,setUID]=useState("")


    useEffect(()=>{
        async function attdados(){
            const querySnapshot =  await getDocs(collection(db,"dadosCarteira"));
            querySnapshot.forEach((doc) => {
                setDadoRepetido(doc.data().UID);
            })
        }
        attdados()
        
    },[])

    
    async function handleGerar(){
        if (!nome || !cpf || !rg || !dataNascimento || !curso || !instituicao || !matricula || !nivelEnsino || !cidade ) {
            toast.error('Por favor, preencha todos os campos', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        
        
        if (userUID===dadoRepetido){ 
            toast.error("Documento ja existente!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return
        }
    
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
        }).then(()=>{
            toast.success('Carteira cadastrada com Sucesso', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setNome("")
            setCPF("")
            setRG("")
            setDataNascimento("")
            setCurso("")
            setinstituicao("")
            setMatricula("")
            setNivelEnsino("")
            setCidade("")
        }).catch((error)=>{
            toast.success(`${error}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

  return (
    <div>
        {user?(
            
            <div>
                    
                <div>
                    <h3>Nome Completo:</h3>
                    <input placeholder='Nome da Cidade' value={nome} onChange={(e)=>{setNome(e.target.value)}} />
                </div>
                <div>
                    <h3>CPF:</h3>
                    <input placeholder='Numero do CPF' type='number' value={cpf} onChange={(e)=>{setCPF(e.target.value)}}/>
                </div>
                <div>
                    <h3>RG:</h3>
                    <input placeholder='Numero do RG' type='number'value={rg} onChange={(e)=>{setRG(e.target.value)}} />
                </div>
                <div>
                    <h3>Data de nascimeto:</h3>
                    <input placeholder='Nome do Curso' type='date'  value={dataNascimento} onChange={(e)=>{setDataNascimento(e.target.value)}}/>
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
                    <input placeholder='Numero da Matricula' type='number' value={matricula} onChange={(e)=>{setMatricula(e.target.value)}} />
                </div>
                <div>
                    <h3>Nivel de Ensino:</h3>
                    <input placeholder='Nivel de Ensino:' value={nivelEnsino} onChange={(e)=>{setNivelEnsino(e.target.value)}} />
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
        ):(<div>Loading...</div>)}
        
        
    </div>
  )
}

export default Carteira