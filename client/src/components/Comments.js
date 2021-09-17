import React, { useState } from 'react'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

async function UpdateComments() {
    const responce = await fetch("/get_comments")
    
    return await responce.json()
}

export default function Comments() {

    const [comments, setComments] = useState([])
    const [NeedUpdate, setNeedUpdate] = useState(true)
    const [message, setMessage] = useState("")

    if (NeedUpdate)
    {
        UpdateComments().then(data => {
            setComments(data.comments)
        })
        setNeedUpdate(false)
    }
    console.log("Comments: ", comments)
    
    return (
        <div>
            <CommentForm onNewComment={() => setNeedUpdate(true)} onChangeMessage={mes => {setMessage(mes)}}/>
            <CommentsList comments={comments} />
            <p>{message}</p>
        </div>
    )

}