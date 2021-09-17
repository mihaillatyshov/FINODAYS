import React, { useState } from 'react'

export const MemberForm = ({onNewMember}) => {
    const [name, setName] = useState('');
    return (
        <form>
            <input type="text" placeholder="member name" value={name} onChange={e => setName(e.target.value)} />
            <input type="button" value="Submit" onClick={async () => {
                const member = {name, "text" : "some text2"}
                const res = await fetch('/add_member', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(member)
                })

                console.log(JSON.stringify(member))

                if (res.ok) {
                    console.log('Responce worked!')
                    res.json().then(data => {
                        console.log(data)
                    })
                    onNewMember(name)
                }
            }}/>

        </form>
    )
}