import React from 'react'
import './MyStyles.css'

export const CommentForm = ({ userInput, onFormChange, onFormSubmit }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                cols = "50"
                rows = "10"
                maxLength = "512"
                placeholder="New comment field" 
                required
                value={userInput} 
                onChange={handleChange} 
            /><br />
            <input className="btn btn-dark" type="submit" value="Submit" /> 
            <br /><br />
        </form>
    )
}