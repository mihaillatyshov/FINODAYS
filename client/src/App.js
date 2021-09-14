import React, { useState, useEffect } from 'react'
import { MemberForm } from './components/MemberForm'
import { Members } from './components/Members'

function App(){

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
            {
            <MemberForm onNewMember={member => setMembers(currentMembers => [...currentMembers, member])}/>
            } 
            <Members members={members} />
        </div>
    )

}

export default App