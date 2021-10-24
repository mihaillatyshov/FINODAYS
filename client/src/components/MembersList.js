import React from 'react'

export const MembersList = ({ members }) => {
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