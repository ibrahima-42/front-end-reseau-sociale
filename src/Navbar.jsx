import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

function Navbar({ profile }) {
    const [numtDemandes, setNumDemandes] = useState(0);

    useEffect(() => {
        const fetchNotif = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/demande/recues`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data.data)) {
                        setNumDemandes(data.data.length); // Compter les demandes reçues
                    }
                }
            } catch (error) {
                console.error('Error fetching: ' + error);
            }
        };

        fetchNotif(); // Appeler la fonction au chargement du composant
    }, []);

    const handleLogout = () => {
        //Suppression token du user
        localStorage.removeItem('token');
        //Supprission egalement des infos du user 
        localStorage.removeItem('user');

        // Redirigez l'utilisateur vers la page de login
        navigate("/");
    }
    return (
        <>
        <header className="header">
        <div className="container">
            <Link id="logo" to="/Acceuil">reseau sociale</Link>

            <div id="search">
                <input type="search" placeholder="chercher un post" />
                <button id="found">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </button>
            </div>
            <div className="link">
                <nav>
                <ul id="outils">
                    <li>
                    <Link to="/create"> Creer post <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff"  ><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg></Link>
                    </li>
                    <li>
                    <Link to="/message">Message <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" ><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg></Link>
                    </li>
                </ul>
                <div>
                    <ul id="out">
                    <li onClick={handleLogout}>
                        <Link  to="/" >Deconnecter <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff"  ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></Link>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>
            </div>
        </header>

        <div className="sidebar">
            <Link id='home-link' to ="/Acceuil">
            <div className='set'>
            <img src="src/assets/Home.png" alt="setting" />
            <p>Accueil</p>
            </div>
            </Link>
            <Link id='ami' to="/ami">
            <div className='set'>
            <img src="src/assets/Profile.png" alt="setting" />
            <p>Amies</p>
            </div>
            </Link>
            <div className='set'>
            <img src="src/assets/Video.png" alt="setting" />
            <p>Storie</p>
            </div>
            <div className='set'>
            <img src="src/assets/Discovery.png" alt="setting" />
            <p>Decouverte</p>
            </div>
            <Link id='link-notif' to="/reception">
            <div className='set'>
            <img src="src/assets/Notification.png" alt="setting" />
            <p>Notification <div className="number">{numtDemandes}</div> </p>
            </div>
            </Link>
            <Link id='activity' to="/blog">
            <div className='set'>
            <img src="src/assets/Activity.png" alt="setting" />
            <p>Activity</p>
            </div>
            </Link>
            <div className='set'>
            <img src="src/assets/Setting.png" alt="setting" />
            <p>parametre</p>
            </div>
        </div>
        </>
    )
}

export default Navbar
