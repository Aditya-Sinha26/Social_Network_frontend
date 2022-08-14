import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'

export const UserProfile = () => {
    const {state,dispatch} = useContext(UserContext)
    const [Prof,setProf] = useState(null)
    const [Profile,setProfile] = useState()
    const [userProfile,setUserProfile] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [posts,setposts] = useState([])
    const [showFollow,setshowFollow] = useState(true)
    const {userid} = useParams()

    //console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           console.log(result)
           setUserProfile(result.user.name)
           setUserEmail(result.user.email)
           setProfile(result.posts.length)
           setposts(result.posts)
           setProf(result)
           console.log(Prof)
        })
    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:
            {
                "Content-type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
                return {user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data._id]
                }
            }
            })
            setshowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:
            {
                "Content-type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item!==data._id)
                return {user:{
                    ...prevState,
                    users:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            }
            })
            setshowFollow(true)
            window.location.reload();
        })
    }

  return (
    <>
    {
        posts?
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
                <h4>{userProfile}</h4>
                <h5>{userEmail}</h5>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    width:"108%"
                }}>
                    <h6>{Profile} posts</h6>
                    <h6> followers</h6>
                    {/* Prof.user === undefined?"loading":Prof.user.followers=== undefined?"loading":Prof.user.followers.length */}
                    <h6> following</h6>
                </div>
                
                <button onClick={()=>{
                    followUser()
                }} className="btn waves-effect waves-light #e57373 blue lighten-2" type="submit" name="action">follow
                <i className="material-icons right"
                ></i>
                </button> 
                <button onClick={()=>{
                    unfollowUser()
                }} className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">unfollow
                <i className="material-icons right"
                ></i>
                </button>
                
            </div>
        </div>
        <div className='gallery'>
        {
            posts.map(item=>{
                return(
                    <img key={item._id} className='item' src = {item.photo}/>
                )
            })
        }       
        </div>
    </div>


        :
        "Loading..."
    }
    
    </>
  )
}
