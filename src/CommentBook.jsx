import React from 'react'

function CommentBook() {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
        };
    
        const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment(postId, comment);
            setComment("");
        }
        };
    
        return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            />
            <button type="submit">Comment</button>
        </form>
        );
    }

export default CommentBook
