import React from 'react'

export const Members = ({ members }) => {
    return (
        <div>
            {(typeof members === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                members.map((member, i) => (
                    <p key={i}>{member}</p>
                ))
            )}
        </div>
    )
}