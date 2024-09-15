import React, { useState } from "react";

import { metronome } from "ldrs";
import { Navigate, useNavigate } from "react-router-dom";

metronome.register();

function Create() {
    //ici jai creer des useState pour les different champs hhhhhhhh
    const [post, setPost] = useState([]);
    const [title, setTitle] = useState("");
    const [errortitle, setTitleerror] = useState("");
    const [description, setDescription] = useState("");
    const [errordescription, setDescriptionerror] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("false");
    const [imageError, setImageError] = useState("");
    const [loader, setLoader] = useState("off");

    const subForm = async () => {
        // setLoader("on");  setLoader permet de faire des chargement personnaliser mais je l'ai pas utiliser ici 
        console.log("Title:", title);
        console.log("Description:", description);

        // il est préférable d'envoyer des données sous la forme d'un objet lorsque tu envoies des fichiers comme une image et des données textuelles
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status ? 1 : 0);


        //ajouter l'image que s'il est disponible
        if(image){
            formData.append('image',  image);
        }

        const token = localStorage.getItem("token");

        if (!token) {
        alert("Veuillez vous connecter pour publier un post");
        setLoader("off");
        return;
        }

        try {
        const response = await fetch("http://127.0.0.1:8000/api/ajoutPost", {
            method: "POST",
            body: formData,
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 422) {
            // Validation error
            setTitleerror(
                errorData.errors.title ? errorData.errors.title[0] : ""
            );
            setDescriptionerror(
                errorData.errors.description ? errorData.errors.description[0] : ""
            );
            // setImageError(errorData.errors.image ? errorData.errors.image[0]: "");
            } else {
            console.error("Erreur:", errorData.message);
            alert("Erreur lors de la création du post. Veuillez réessayer.");
            }
            setLoader("off");
            return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setPost((post) => [...post, data]);
        setTitle("");
        setDescription("");
        setTitleerror("");
        setDescriptionerror("");
        setImage("");
        } catch (error) {
        console.error("Error fetching data:", error);
        alert(
            "Erreur lors de la création du post. Veuillez réessayer plus tard."
        );
        } finally {
        setLoader("off");
        }
    };

    function ChangeStatus() {
        setStatus((status) => !status);
    }

    return (
        <>
        <div className="ajout">
            <div className="content">
            {/* <PagePost allPost={post}></PagePost> */}
            <h2>Créer un post</h2>
            <div id="form-post" action="">
                <div className="etats" onClick={ChangeStatus}>
                <button className="status">
                    {status ? (
                    <>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#100f0f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-earth"
                        >
                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                        <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                        <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                        <circle cx="12" cy="12" r="10" />
                        </svg>
                        Public
                    </>
                    ) : (
                    <>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#100f0f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-earth-lock"
                        >
                        <path d="M7 3.34V5a3 3 0 0 0 3 3" />
                        <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                        <path d="M12 2a10 10 0 1 0 9.54 13" />
                        <path d="M20 6V4a2 2 0 1 0-4 0v2" />
                        <rect width="8" height="5" x="14" y="6" rx="1" />
                        </svg>
                        Privé
                    </>
                    )}
                </button>
                </div>
                <input
                type="file"
                id="canon"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
                <label id="labes" htmlFor="canon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    image
                </label>
                <div>
                <input
                    id="field-title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre du post"
                />
                <span className="error">{errortitle}</span>
                </div>
                <div>
                <textarea
                    name="description"
                    id="area"
                    cols="30"
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
                <span className="error">{errordescription}</span>
                </div>
                
                <button onClick={subForm}>
                {loader === "on" ? "Publicatoin..." : "Publier"}
                </button>
            </div>
            </div>
        </div>
        </>
    );
}

export default Create;
