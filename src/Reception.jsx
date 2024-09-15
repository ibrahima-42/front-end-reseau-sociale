import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Reception({ profile }) {
    const [Notification, setNotification] = useState([]);

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

                if (!response.ok) {
                    const errorFetch = await response.json();
                    throw new Error(`Error fetching response: ${errorFetch}`);
                }

                const data = await response.json();
                
                if (Array.isArray(data.data)) {
                    setNotification(data.data);
                } else {
                    console.error('Données reçues non valides:', data);
                    setNotification([]);
                }

            } catch (error) {
                console.error('Error fetching: ' + error);
            }
        };

        fetchNotif();
    }, []);

    const accepterDemande = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/accepter-demande/${id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Error fetching URL: ' + errorData);
            }

            // Mise à jour des notifications après acceptation de la demande
            setNotification((prev) => prev.filter((notif) => notif.id !== id));

        } catch (error) {
            console.error('Error fetching URL: ' + error);
        }
    };

    const nombreDemande = () => {
        return Notification.length;
    }

    return (
        <div className="reception">
            <div className="container">
                <h3>historique des demande</h3>
                {Notification.length === 0 ? (
                    <span>Pas de notification pour vous</span>
                ) : (
                    <ul className='notif-liste'>
                {/* <Navbar nombreDemande={nombreDemande} /> */}
                        {Notification.map((notif) => (
                            <li id='notificate' key={notif.id}>
                                {notif.user.profile_URL ? (
                                    <img src={notif.user.profile_URL} alt={notif.user.name} width="100" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-off">
                                        <line x1="2" x2="22" y1="2" y2="22" />
                                        <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
                                        <line x1="13.5" x2="6" y1="13.5" y2="21" />
                                        <line x1="18" x2="21" y1="12" y2="15" />
                                        <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
                                        <path d="M21 15V5a2 2 0 0 0-2-2H9" />
                                    </svg>
                                )}
                                <p>{notif.user.name}</p>
                                <button onClick={() => accepterDemande(notif.id)}>Accepter</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Reception;

