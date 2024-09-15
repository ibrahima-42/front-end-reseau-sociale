import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PostList from "./PostList";
// import Blog from "./Blog";

export default function Acceuil({ allPost = [] }) {
  const [posts, setPosts] = useState(allPost);
  const [comment, setComment] = useState('');
  const [commented, setCommentaire] = useState({});
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/listePost", {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 422) {
            setTitleError(errorData.errors.title ? errorData.errors.title[0] : "");
            setDescriptionError(
              errorData.errors.description ? errorData.errors.description[0] : ""
            );
          }
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  function handleDelete(id) {
    if (window.confirm("Voulez-vous vraiment supprimer le post ?")) {
      fetch("http://127.0.0.1:8000/api/deletePost/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data", data);
          setPosts((posts) => posts.filter((post) => post.id !== id)); // Correction ici
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  const handleComment = (id, commentText) => {
    fetch(`http://127.0.0.1:8000/api/ajoutComment/` + id, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " +localStorage.getItem("token"), // Si vous utilisez Sanctum, assurez-vous d'envoyer le token d'authentification
        },
        body: JSON.stringify({ text: commentText }),
    })
    .then(response => response.json())
    .then(data => {
        // Gérer la réponse
        console.log('Commentaire ajouter avec sucess' , data)
        setComment("");
    })
    .catch(error => {
        console.error('Error:', error);
    });
};


function commentPost(postId) {
  return fetch(`http://127.0.0.1:8000/api/${postId}/comments`, {
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commentaires');
    }
    return response.json();
  });
}

const loadComments = (postId) => {
  commentPost(postId).then(data => {
    setCommentaire(commented => ({
      ...commented,
      [postId]: data // Met à jour les commentaires pour le post spécifique
    }));
  }).catch(error => {
    console.error('Error loading comments:', error);
  });
};


  return (
    <>
      <div className="home-post">
        <div className="content">
        {/* <Navbar profile={post.user.profile}  /> */}
        {/* <Blog profile={user.profile} username={user.username} /> */}

          {posts.length === 0 ? (
            "Aucun post disponible"
          ) : (
            <ul id="ulll">
              {posts.map((post) => (
                <PostList
                  key={post.id}
                  id={post.id}
                  profile={post.user.profile}
                  title={post.title}
                  description={post.description}
                  username={post.user.username}
                  name={post.user.name}
                  image={post.image}
                  comment={comment}
                  setComment={setComment}
                  handleDelete={handleDelete}
                  handleComment={handleComment} 
                  loadComments={loadComments}
                  commentaire={commented[post.id] || []}
                  created={post.created_at}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
