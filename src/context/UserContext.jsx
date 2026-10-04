//Criando contexto
import { createContext,useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase/FireBase"

export const  UserContext = createContext();

//criando provider
export const UserContextProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [userDetails,setUserDetails]=useState({})
    // true enquanto o Firebase ainda não informou se existe usuário logado
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if (user){
                setUser(user)
            }else{
                setUser(null)
                setUserDetails({})
            }
            setloading(false)
        })
        return unsubscribe
    },[])
    return(
        <UserContext.Provider value={{ user , setUser, userDetails, setUserDetails,loading,setloading}}>
            {children}
        </UserContext.Provider>
    )
}
