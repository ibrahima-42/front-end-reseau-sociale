import React from 'react'
import Navbar from './Navbar'

function Blog({ profile , username}) {
    return (
        <>
        <Navbar />
        <div className="blog-personel">
            <div className="container">
            {/* <h1> hello worldddd </h1> */}
            <div>
                <img
                        src={`http://127.0.0.1:8000/storage/${profile}`}
                        alt="profile"
                    />
                    {username}
            </div>
                
            </div>
        </div>
        </>
    )
}

export default Blog
