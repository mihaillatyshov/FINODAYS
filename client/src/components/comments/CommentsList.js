import React from 'react'

const CommentsList = ({ commentsData, pageId, pageSize }) => {	

	return (
		<div>
			{(typeof commentsData === 'undefined') ? (
				<p>Loading...</p>
			) : (
				<table className="table table-dark table-striped">
					<thead>
						<tr>
							<th> ID		   		</th>
							<th> User ID	  	</th>
							<th> Сomment text 	</th>
							<th> Toxic			</th>
						</tr>
					</thead>
					<tbody>
						{
							commentsData.comments.map((comment, i) => (
								<tr key={comment.id} className="">
									<th key="id"	  	className="" scope="row"> 	{comment.id} 						</th>
									<td key="user_id" 	className="">			 	{comment.user_id}				   	</td>
									<td key="text"		className="">			 	{comment.text}						</td>
									<td key="toxic"   	className="">			 	{comment.toxic}					 	</td>

								</tr>
							))
						}
					</tbody>
				</table>
			)}
 	   </div>
	)
}

export default CommentsList