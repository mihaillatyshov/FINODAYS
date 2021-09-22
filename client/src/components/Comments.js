import React, { useEffect, useState } from 'react'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

export default function Comments() {

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')

    useEffect(() => {
        fetch("/get_comments").then(responce => {
            if (responce.ok){
                return responce.json()
            }
        }).then(data => {
            if (typeof data === 'undefined') {
                console.log("Bad get responce")
            }
            else {
                setComments(data.comments)
                console.log(data)
            }
        })
    }, [])
    
    const handleFormChange = (inputValue) => {
        setAddComment(inputValue)
    }

    const handleFormSubmit = () => {
        const comment = {"userID" : Math.round(1 + Math.random() * (100 - 1)), "text" : addComment}

        fetch('/add_comment', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body : JSON.stringify(comment)
        }).then(responce => responce.json()).then(message => {
            console.log(message)
            setAddComment('')
            getLatestComments()
        })
    }

    const getLatestComments = () => {
        fetch("/get_comments").then(responce => {
            if (responce.ok){
                return responce.json()
            }
        }).then(data => {
            setComments(data.comments)
            console.log(data)
        })
    }

    return (
        <div> 
            <CommentForm userInput={addComment} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <CommentsList comments={comments} />
        </div>
    )

}