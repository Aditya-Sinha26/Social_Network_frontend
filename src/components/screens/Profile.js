import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

export const Profile = () => {
    const {state,dispatch} = useContext(UserContext)
    const [mypics,setPics] = useState([])
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result)
        })
    },[])
  return (
    <div style={{
        maxWidth:"550px",margin:"0px auto"
    }}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src="https://images.unsplash.com/photo-1659126404817-63ddbbae1b06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
            </div>
            <div>
                <h4>{state?state.name:"loading"}</h4>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    width:"108%"
                }}>
                    <h6>{mypics.length} posts</h6>
                    {/* <h6>{state?state.followers.length:"0"} followers</h6>
                    <h6>{state?state.following.length:"0"} following</h6> */}
                </div>
            </div>
        </div>
        <div className='gallery'>
        {
            mypics.map(item=>{
                return(
                    <img key={item._id} className='item' src = {item.photo}/>
                )
            })
        }
        
        
        </div>
    </div>
  )
}
