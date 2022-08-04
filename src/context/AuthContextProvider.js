import React,{useContext,createContext,useState, useEffect} from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth";
import {provider} from "../utils/firebase"
const AuthContext=createContext();
const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}
const AuthContextProvider=({children})=>{

  const [currentUser,setcurrentUser]=useState();
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const onSubscribe=auth.onAuthStateChanged((user)=>{
      setcurrentUser(user)
      setLoading(false)
    })
    return onSubscribe;
  },[])

function signup(email,password){
  return auth.createUserWithEmailAndPassword(email,password)
}

function login(email,password){
 return auth.signInWithEmailAndPassword(email, password);
}

function logout(){
  auth.signOut();
}

function loginWithGoogle(){
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  const auth = getAuth();
  auth.signInWithPopup(provider);
}

const values={
  signup,login,logout,loginWithGoogle
} 
return <AuthContext.Provider value={values}>
 {!loading && children}
</AuthContext.Provider>
}

export default AuthContextProvider