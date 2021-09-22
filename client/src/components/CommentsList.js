import React from 'react'
import './MyStyles.css'

export const CommentsList = ({ comments }) => {
    return (
        <div>
            {(typeof comments === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                <table className="table_comments"><tbody>
                    <tr className="tr_comments_init">
                        <td className="td_comments_1"> ID </td>
                        <td className="td_comments_2"> User ID </td>
                        <td className="td_comments_3"> Сomment text </td>
                        <td className="td_comments_4"> Toxic </td>
                    </tr>
                    {comments.map((comment, i) => (
                        <tr key={comment.id} className={"tr_comments_" + (i % 2)}>
                            <td key="id"      className="td_comments_Id">     {comment.id}      </td>
                            <td key="user_id" className="td_comments_UserId"> {comment.user_id} </td>
                            <td key="text"    className="td_comments_Text">   {comment.text}    </td>
                            <td key="toxic"   className="td_comments_Toxic">  {comment.toxic}   </td>
                        </tr>
                    ))}
                </tbody></table>
            )}
        </div>
    )
}