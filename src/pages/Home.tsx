import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from "react"
const Home = () => {
  const {user, isLoading} = useAuth()

  if(user && !isLoading){
    return <Navigate to="/profile" replace/>
  }
  return (
    <div>
      asdfd
    </div>
  )
}

export default Home
