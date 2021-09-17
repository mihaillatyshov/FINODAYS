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
                        <tr key={i} className={"tr_comments_" + (i % 2)}>
                            {comment.map((field, j) => (
                                <td key={j} className={"td_comments_" + (j + 1)}>
                                    {field}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody></table>
            )}
        </div>
    )
}