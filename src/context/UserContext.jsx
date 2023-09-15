//Criando contexto
import { createContext,useState } from "react";
export const  UserContext = createContext();
//criando porvider
export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(false);
    return(
        <UserContext.Provider value={{ user , setUser }}>
            {children}
        </UserContext.Provider>
    )
}