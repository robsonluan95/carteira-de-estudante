//Criando contexto
import { createContext,useState,useEffect } from "react";
import { auth } from "../FireBase/FireBase"
export const  UserContext = createContext();
import { onAuthStateChanged } from "firebase/auth";
//criando porvider
export const UserContextProvider=({children})=>{

    const [user,setUser]=useState();
    const [userDetails,setUserDetails]=useState({})
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        async function checklogin(){
            onAuthStateChanged(auth,(user)=>{
                if (user){
                    console.log(user)
                    setUser(user)
                }else{
                    setUser(false)
                    setUserDetails({})
                }
            })
            setloading(true)
        }
        checklogin()
    },[])
    return(
        <UserContext.Provider value={{ user , setUser, userDetails, setUserDetails,loading,setloading}}>
            {children}
        </UserContext.Provider>
    )
}