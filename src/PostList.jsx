import React, { useState,useEffect } from "react";
import { format } from 'date-fns';

const date = new Date();
const formattedDate = format(date, 'yyyy-MM-dd'); // Formats the date to "2024-09-11"

function PostList({ id, title, description, username, profile, name, image ,handleDelete, handleComment,comment,setComment,commentaire,loadComments,created}) {
    const [commentForm, setCommentform] = useState(false);
    const [fondSVg, setFondsvg] = useState(false);
    const [sup, setSup] = useState(false);


    useEffect(() => {
        loadComments(id);
    },[id,loadComments]);

    function commenter() {
        setCommentform((commentForm) => !commentForm);
    }

    function fond() {
        setFondsvg((fondSVg) => !fondSVg);
    }

    function SupPost(){
        setSup((sup) => ! sup);
    }

    return (
        <>
        <li key={id} id="ligne">
            {/* <div id="box-todo"></div> */}
            <div id="head-post">
            <div className="profile">
            <img
                src={`http://127.0.0.1:8000/storage/${profile}`}
                alt={`${username}`}
            />
            {name}
            </div>
            <div id="post-action">
                <button onClick={SupPost}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a9a2a2"  stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
            </div>
            </div>

            {sup && (
                <div id="sup-action">
                    <div onClick={() =>handleDelete(id)} id="trash">
                    {/* <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a51818" i stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg> */}
                    supprimer
                    </div>
                    {/* <div id="post-update">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    modifier
                    </div> */}
                </div>
            )
            }
            

            <div id="title">
            <h3>{title}</h3>
            </div>
            <div>
            <span id="desc">{description}</span>
            <div className="Poster">
                <img src={`http://127.0.0.1:8000/storage/${image}`} alt="" />
            </div>
            </div>
            {/* <span id='by'>poster par @<b>{username}</b></span> */}
            <span id="created"> creer :{formattedDate} </span>

            <div className="action">
            <div>
                <svg
                id="like"
                onClick={fond}
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={fondSVg ? "red" : "none"}
                stroke="#636363"
                >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
            </div>
            <div>
                <svg
                onClick={commenter}
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={commentForm ? "#38A1FF" : "none"}
                stroke="#636363"
                >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
            </div>
            <div>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#636363"
                >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
                </svg>
            </div>
            </div>
            {commentForm && (
            <div id="comments">
            <input
                type="text"
                placeholder="votre commentaire"
                value={comment}
                name="text"
                onChange={(e) => setComment(e.target.value)} // Met à jour l'état local avec la valeur de l'input
            />
            <button id="button-commente" onClick={() => handleComment(id, comment)}>commenter</button> {/* Appel à handleComment avec l'ID du post et le commentaire */}
            <div>
            {commentaire.length === 0 ? (<span id="not-comment"> pas de commetaire sur ce post</span>):(
            <ul id="liste-comment">
                {commentaire.map((commente => (
                    <li key={commente.id}>
                    <img
                        src={`http://127.0.0.1:8000/storage/${commente.user.profile}`}
                        alt=""
                    />
                        <strong>{commente.user.name}:</strong> {commente.text}
                    </li>
                )))}
            </ul>)
            }
            </div> 
            </div>
            )}
            
        </li>
        </>
    );
}

export default PostList;
