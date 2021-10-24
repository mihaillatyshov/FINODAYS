import React, { useState } from 'react'
import { ServerAPI_POST } from '../../libs/ServerAPI'

const CommentForm = ({ userInput, onFormSubmit }) => {
	const [commentText, setCommentText] = useState('')

	const handleTextAreaChange = (e) => {
		setCommentText(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		
		ServerAPI_POST({ 
			url : '/comments', 
			sendObj : { 'userID' : Math.round(1 + Math.random() * (100 - 1)), 'text' : commentText }, 
			onDataReceived : (data) => { 
				setCommentText('')
				onFormSubmit()
			} 
		})

	}
	
	return (
		<form onSubmit={handleSubmit}>
			<textarea
				cols = "50"
				rows = "10"
				maxLength = "512"
				placeholder="New comment field" 
				required
				value={commentText} 
				onChange={handleTextAreaChange} 
			/><br />
			<input className="btn btn-dark" type="submit" value="Submit" /> 
			<br /><br />
		</form>
	)
}

export default CommentForm