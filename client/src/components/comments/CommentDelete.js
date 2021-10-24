import React, { useState } from 'react'
import { ServerAPI_DELETE } from '../../libs/ServerAPI'

const CommentDelete = ({ onCommentDeleted }) => {
	const [idToDelete, setIdToDelele] = useState('');
	
	const handleTextChange = (e) => {
		setIdToDelele(Math.round(e.target.value.split(' ').join('')))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		
		ServerAPI_DELETE({ 
			url : '/comments', 
			urlParams : {
				id : idToDelete
			},
			onDataReceived : (data) => { 
				onCommentDeleted() 
				setIdToDelele('')
			} 
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="row">
				<div className="col-auto">
					<input type="number" required className="form-control" value={idToDelete} onChange={handleTextChange} />
				</div>
				<div className="col-auto">
					<input type="submit" className='btn btn-dark' value="Delete" />
				</div>
				<br /><br />
			</form>
		</div>
	)
}

export default CommentDelete
