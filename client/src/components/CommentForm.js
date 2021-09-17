import React, { useState } from 'react'
import './MyStyles.css'

export const CommentForm = ({onNewComment, onChangeMessage}) => {
    //const [userID, setUserID] = useState('');
    const [text, setText] = useState('');
    return (
        <form>
            <textarea
                cols = "50"
                rows = "10"
                maxLength = "512"
                placeholder="New comment field" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            /><br />
            <input type="button" value="Submit" onClick={async () => {
                if (text !== "") {
                    const comment = {"userID" : Math.round(1 + Math.random() * (100 - 1)), text}
                    const res = await fetch('/add_comment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(comment)
                    })

                    console.log(JSON.stringify(comment))

                    if (res.ok) {
                        console.log('Responce worked!')
                        res.json().then(data => {
                            console.log(data.res)
                            if (data.res == 4) {
                                onChangeMessage("Good message!")
                            }
                        })
                        onNewComment()
                    }
                }
            }}/> <br /><br />
        </form>
    )
}