import React, { useState, useEffect } from 'react'
import { MemberForm } from './MemberForm'
import { MembersList } from './MembersList'

export default function Members(){

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch("/members").then(res => 
            res.json().then(data => {
                setMembers(data.members)
            })
        )
    }, [])
  
    console.log(members)
    
    return (
        <div className="App">
            <MemberForm onNewMember={member => setMembers(currentMembers => [...currentMembers, member])}/>
            <MembersList members={members} />
        </div>
    )

}