import React, { useEffect, useState } from 'react'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

export default function Comments() {

    const [comments, setComments] = useState([])
    const [NeedUpdate, setNeedUpdate] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("/get_comments")
    })
    
    return (
        <div>
            <CommentForm onNewComment={() => setNeedUpdate(true)} onChangeMessage={mes => {setMessage(mes)}}/>
            <CommentsList comments={comments} />
            <p>{message}</p>
        </div>
    )

}