import React from "react"
import {useState, useEffect} from "react"
import {Redirect} from "react-router-dom"
import Axios from "axios"
import {toast} from "react-toastify"

const Logout = ({setUser}) => {

    const [redirect, setRedirect] = useState(false) 

    useEffect(()=>{
        (async () => {
            try{
                const resp = await Axios.get("/api/logout");
                if (resp.status === 200){
                    setUser(false)
                    toast("You Logged out",{
                        type:toast.TYPE.SUCCESS
                    })
                    setRedirect(true)
                }
            }catch(error){
                toast("Error",{
                    type: toast.TYPE.ERROR
                })
            }
        })();
    },[])

    if(redirect) return (<Redirect to="/blogs"/>)

    return null

}

export default Logout;