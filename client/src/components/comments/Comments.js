import React, { useEffect, useState } from 'react'
import { ServerAPI_GET } from '../../libs/ServerAPI'
import CommentDelete from './CommentDelete'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'
import PagesMenu from '../PagesMenu'

const Comments = () => {
	const [pageData, setPageData] = useState({id : 0, size : 5})
	const [commentsData, setCommentsData] = useState({comments : [], count : 0})

	const getLatestComments = (pageId, pageSize) => {
		ServerAPI_GET({
			url : '/comments', 
			urlParams : {
				page : pageId,
				page_size : pageSize
			},
			onDataReceived : (data) => {
				setCommentsData({ comments : data.comments, count : data.count})
			}
		})
	}

	useEffect(() => {
		getLatestComments(pageData.id, pageData.size)
	}, [pageData])
	
	const handleCommentsChanged = () => {
		getLatestComments(pageData.id, pageData.size) 
	}

	const handlePageChange = (newPage) => {
		setPageData({...pageData, id : newPage})
	}

	return (
		<div> 
			<CommentForm onFormSubmit={handleCommentsChanged} />
			<div className="comments-block mx-auto">
				<PagesMenu pageId={pageData.id} elementsCount={commentsData.count} pageSize={pageData.size} onPageChange={handlePageChange} />
				<CommentsList commentsData={commentsData} pageId={pageData.id} pageSize={pageData.size} />
			</div>
			<CommentDelete onCommentDeleted={handleCommentsChanged} />
		</div>
	)

}

export default Comments