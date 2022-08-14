import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import M from 'materialize-css'

export const Signup = () => {
    const navigate = useNavigate()
    const [name,setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email id",classes:'#c62828 red darken-3'})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email

            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:'#c62828 red darken-3'
            })
            }else{
                M.toast({html:data.message,classes:"#ce93d8 purple lighten-3"})
                navigate("/signin")
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
        placeholder="Name"
        value={name}
        onChange={(e)=>{
            setname(e.target.value)
        }}
        />
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
        <button
        onClick={()=>{
            PostData()
        }} 
        className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">Sign up
    <i className="material-icons right">send</i>
  </button>
  <h6><Link to="/signin">Already have an account?
  </Link></h6>
      </div>
    </div>
  )
}
