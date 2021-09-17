import React, { useState, useEffect } from 'react'

export default function Members(){

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch("/get_comments").then(res => 
            res.json().then(data => {
                setMembers(data.coments)
            })
        )
    }, [])
  
    console.log(comments)
    
    return (
        <div className="App">
        </div>
    )

}