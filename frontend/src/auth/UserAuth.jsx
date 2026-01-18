"use client"
import React, {useState,useEffect, useContext} from 'react'
import { UserContext } from '../context/user_context'
import { useRouter } from 'next/navigation'

const UserAuth = ({children}) => {
    const {user} = useContext(UserContext)
    const [Loading, setLoading] = useState(true)
    const navigate = useRouter()
    
    useEffect (() => {
        if (user ) {
            setLoading(false)
        }
        const token = localStorage.getItem('token')
        if (!token) {
            navigate.push("/login");
        }
        if (!user) {
            navigate.push("/login");
        }
        setLoading (false)
    }, [user, navigate])

    if(Loading){
        return <div>Loading...</div>
    }

  return (
    <>
      {children}
    </>
  )
}

export default UserAuth
