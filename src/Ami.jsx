import React, { useEffect, useState } from 'react';

function Ami() {
    const [amis, setAmis] = useState([]);
    const [status, setStatus] = useState({}); // État pour gérer les statuts des demandes

    useEffect(() => {
        const fetchAmi = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Erreur HTTP: ' + response.status);
                }

                const data = await response.json();
                setAmis(data);
            } catch (error) {
                console.error("Fetching error: " + error);
            }
        };
        fetchAmi();
    }, []);

    const envoyerDemandeAmi = async (amiId) => {
        console.log(" ###### envoi de la demande...");
        console.log("Token:", localStorage.getItem("token"));
        console.log("Ami ID:", amiId);
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/demande", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    ami_id: amiId, 
                }),
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error('Erreur lors de l\'envoi de la demande: ' + errorResponse.error);
            }
    
            const result = await response.json();
            console.log("Demande envoyée: ", result);
    
            // Mettre à jour le statut de la demande d'ami
            setStatus(Status => ({
                ...Status,
                [amiId]: "Demande envoyée"
            }));
        } catch (error) {
            console.error("Erreur: ", error);
        }
    };
    

    return (
        <div className="liste-ami">
            <div className="container">
                <h1>Ajouter de nouveaux amis</h1>
                {amis.length > 0 ? (
                    <ul className="friends">
                        {amis.map((ami) => (
                            <li id="friendly" key={ami.id}>
                                {ami.profile_URL ? (
                                    <img src={ami.profile_URL} alt={ami.name} width="100" />
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
                                <p>{ami.name}</p>
                                <button  
                                    id='ajouter-ami'
                                    onClick={() => envoyerDemandeAmi(ami.id)} 
                                    disabled={status[ami.id] === "Demande envoyée"}>
                                    {status[ami.id] === "Demande envoyée" ? "Demande envoyée" : "Ajouter"}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun ami à afficher.</p>
                )}
            </div>
        </div>
    );
}

export default Ami;
