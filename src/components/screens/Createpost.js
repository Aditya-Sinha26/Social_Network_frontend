import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'

export const Createpost = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState("")

    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
    
                })
            }).then(res=>res.json()).then(data=>{
                if(data.error){
                    console.log(data.error)
                    M.toast({html:data.error,classes:'#c62828 red darken-3'})
                }else{
                    M.toast({html:"Created post successfully",classes:"#ce93d8 purple lighten-3"})
                    navigate("/")
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","socialnetwork")
        data.append("cloud_name","sinhacloud")
        fetch("https://api.cloudinary.com/v1_1/sinhacloud/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            seturl(data.url)
        }).catch(err=>{
            console.log(err);
        })

    }
  return (
    <div className='card input-filed'
    style={{
        margin:"10px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>
        
        <input type="text" placeholder="Title" 
            value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
        />
        <input type="text" placeholder="Description"
            value={body}
            onChange={(e)=>{
                setBody(e.target.value)
            }}
        />
        <div className="file-field input-field">
        <div className="btn waves-effect waves-light #e57373 red lighten-2">
            <span>Upload photo</span>
            <input type="file"
            onChange={(e)=>{
                setimage(e.target.files[0])
            }}
            />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
        <button className="btn waves-effect waves-light #e57373 red lighten-2"
        onClick={()=>postDetails()}>
            Upload Post
        </button>
    </div>
  )
}
