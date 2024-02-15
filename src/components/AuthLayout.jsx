import React from 'react'
import { useState, useEffect } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        // make it more easy to understand

        // if (authStatus === true) {
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return  loader ? <h1>Loading...</h1> : <>{children}</>
    
}
