import React, { useState } from 'react'

export const MemberForm = ({onNewMember}) => {
    const [name, setName] = useState('');
    return (
        <form>
            <input type="text" placeholder="member name" value={name} onChange={e => setName(e.target.value)} />
            <input type="button" value="Submit" onClick={async () => {
                const res = await fetch('/add_member', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(name)
                })

                if (res.ok) {
                    console.log('Responce worked!')
                    onNewMember(name)
                }
            }}/>

        </form>
    )
}