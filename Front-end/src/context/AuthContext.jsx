import React , {createContext, useState, useEffect} from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setIsAuthenticated(true)

        }else{
            setIsAuthenticated(false)
        }
    },[])
    return(
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
//custom hook for accesing the context
const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(context === undefined || null){
        throw new Error('useAuth must be within an AuthProvider')
    }
    return context;
}

export {AuthProvider, useAuth}