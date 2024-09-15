import React from 'react'

function CommentList({text}) {
    return (
        <div>
            <li>
            <span>
            {text}
            </span>
            </li>
        </div>
    )
}

export default CommentList
