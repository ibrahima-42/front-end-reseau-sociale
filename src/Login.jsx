import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`Formulaire soumis`);
        console.log(`Email: ${email}`);
        
        if (email === "" || password === "") {
            alert(`Tous les champs doivent être remplis`);
        } else {
            let newUser = { email, password };
            try {
                const response = await fetch("http://127.0.0.1:8000/api/loginUser", {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: { "Content-Type": "application/json" },
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 422) {
                        // Gérer les erreurs de validation
                        console.error('Erreur de validation:', errorData.errors);
                        alert('Erreur de validation. Vérifiez vos informations.');
                    } else {
                        console.error('Erreur:', errorData.message);
                        alert('Erreur de connexion. Vérifiez vos informations.');
                    }
                    return;
                }

                const data = await response.json();
                const token = data.token;

                // Stocker le token (par exemple, dans le local storage)
                localStorage.setItem('token', token);

                // Naviguer vers une autre page après une connexion réussie
                navigate('/Acceuil');
                
            } catch (error) {
                console.error('Erreur pendant la requête:', error);
                alert('Erreur de connexion. Veuillez réessayer plus tard.');
            }
        }
    }


    const containerStyle = {
        backgroundImage: `url('src/assets/Desktop\ -\ 1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={containerStyle}>
        <div id='page-login'>
            <form id='connect' onSubmit={handleSubmit}>
                <h1 id='log'>connexion</h1>
                <input 
                    className='champs' 
                    type="text" 
                    name='email'
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    className='champs' 
                    type="password" 
                    name='password'
                    placeholder='Mot de passe' 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button id='sub' type='submit'>Se connecter</button>
                <span id='info-connect'>Creer un compte <b><Link to="/Inscription">S'inscrire</Link></b> </span>
            </form>
        </div>
        </div>
        
    );
}

export default Login;
