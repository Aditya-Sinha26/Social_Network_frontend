import React, { useState , useContext} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import Mo from 'materialize-css'
import { UserContext } from '../../App'

export const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            Mo.toast({html:"Invalid Email id",classes:'#c62828 red darken-3'})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                email:email

            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                console.log(data.error)
               //Mo.toast({html:data.error,classes:'#c62828 red darken-3'})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                Mo.toast({html:"Sign in successful",classes:"#ce93d8 purple lighten-3"})
                navigate("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='mycard'>
        <div className="card auth-card">
        <h3>The Social Network</h3>
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e)=>{
            setemail(e.target.value)
        }}
        />
        <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e)=>{
            setpassword(e.target.value)
        }}
        />
        <button className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">Login
    <i className="material-icons right"
    onClick={()=>{
        PostData()
    }}>send</i>
  </button>
  <h6><Link to="/signup">Don't have an account?</Link></h6>
      </div>
    </div>
  )
}
