import React, { useState, useEffect } from 'react'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

//class Comments extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = {comments: [], NeedUpdateComments: true}
//    }
//
//    componentDidMount() {
//        console.log("Test m 1")
//
//        fetch('/get_comments')
//            .then((response) => {
//                return response.json();
//            })
//            .then((data) => {
//                console.log(data);
//            });
//
//        await fetch("/get_comments").then(res => 
//            res.json().then(data => {
//                this.setState({comments : data.comments})
//                console.log("Test m 2")
//            })
//        )
//        this.setState({NeedUpdateComments: false})
//    }
//
//    componentDidUpdate() {
//        if (this.state.NeedUpdateComments)
//        {
//            fetch("/get_comments").then(res => 
//                res.json().then(data => {
//                    this.setState({comments : data.comments})
//                })
//            )
//            this.setState({NeedUpdateComments: false})
//        }
//    }
//
//    render() {
//        return (
//            <div>
//                <CommentsList comments={this.state.comments} />
//            </div>
//        )
//    }
//}
//
//export default Comments

async function UpdateComments() {
    const responce = await fetch("/get_comments")
    
    return await responce.json()
}

export default function Comments() {

    const [comments, setComments] = useState([])
    const [NeedUpdate, setNeedUpdate] = useState(true)

    //useEffect(() => {
    //    fetch("/get_comments").then(res => 
    //        res.json().then(data => {
    //            setComments(data.comments)
    //        })
    //    )
    //}, [])
    if (NeedUpdate)
    {
        UpdateComments().then(data => {
            setComments(data.comments)
        })
        setNeedUpdate(false)
    }
    console.log("Comments: ", comments)
    
    return (
        <div>
            <CommentForm onNewComment={() => setNeedUpdate(true)}/>
            <CommentsList comments={comments} />
        </div>
    )

}