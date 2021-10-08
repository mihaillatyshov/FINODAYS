import React, { useState } from 'react'
import './MyStyles.css'
import { PagesMenu } from './PagesMenu'

export const CommentsList = ({ comments }) => {

    const CommentsOnPage = 5
    const [PageId, setPageId] = useState(1)
    const HandlePageChange = (inputPage) => {
        setPageId(inputPage)
    }
    
    let ShowComments = []
    for (let i = (PageId - 1) * CommentsOnPage; i < Math.min((PageId - 1) * CommentsOnPage + CommentsOnPage, comments.length); i++)
    {
        ShowComments.push(comments[i])
    }

    return (
        <div className="comments-block mx-auto">
            <PagesMenu PageId={PageId} ElementsCount={comments.length} ElementsOnPage={CommentsOnPage} OnPageChange={HandlePageChange} />
            {(typeof comments === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th> ID           </th>
                            <th> User ID      </th>
                            <th> Сomment text </th>
                            <th> Toxic        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ShowComments.map((comment, i) => (
                                <tr key={comment.id} className="">
                                    <th key="id"      className="" scope="row"> {(PageId - 1) * CommentsOnPage + i} </th>
                                    <td key="user_id" className="">             {comment.user_id}                   </td>
                                    <td key="text"    className="">             {comment.text}                      </td>
                                    <td key="toxic"   className="">             {comment.toxic}                     </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}