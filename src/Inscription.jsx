import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Inscription() {
    const [register, setRegister] = useState([]);
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [password_confirmation, setPasswordconfimr] = useState("");
    const [loader, setLoader] = useState("off");

    const navigate = useNavigate();

    const subRegister = async (e) => {
        e.preventDefault();
        // setLoader("on");

        // Créez un objet FormData pour inclure les données du formulaire et le fichier d'image
        let formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);
        formData.append('profile', profile); // Ajoutez l'image de profil

        try {
            const response = await fetch("http://127.0.0.1:8000/api/registerUser", {
                method: "POST",
                body: formData, // Envoyez les données sous forme de FormData
                headers: {
                    // Ne définissez pas Content-Type ici, car il sera automatiquement défini par FormData
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    setErrorName(errorData.errors.name ? errorData.errors.name[0] : "");
                    setErrorUsername(errorData.errors.username ? errorData.errors.username[0] : "");
                    setErrorEmail(errorData.errors.email ? errorData.errors.email[0] : "");
                    setErrorPassword(errorData.errors.password ? errorData.errors.password[0] : "");
                } else {
                    console.error("Error:", errorData.message);
                    alert(`Erreur lors de l'inscription`);
                }
            } else {
                const data = await response.json();
                setRegister((register) => [...register, data]);
                setProfile(null);
                setName("");
                setUsername("");
                setEmail("");
                setPassword("");
                setPasswordconfimr("");
                navigate('/');
            }
        } catch (error) {
            console.log("Error fetching data: ", error);
            alert(`Erreur lors de l'inscription, veuillez réessayer plus tard`);
        } finally {
            // setLoader("off");
        }
    }

    const containerStyle = {
        backgroundImage: `url('src/assets/Desktop - 1.png')`,
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
                <form id='connect' onSubmit={subRegister}>
                    <h2 id='log'>Inscription</h2>
                    <input
                        type="file"
                        name="profile"
                        accept="image/*"
                        id='identifier'
                        onChange={(e) => setProfile(e.target.files[0])} // Correctement récupérer le fichier
                        placeholder='Choisir un profil'
                    />
                    <label id='jm' htmlFor="identifier">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>

                        profile
                    </label>
                    <input className='champs' type="text" placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                    {errorName && <span className='error'>{errorName}</span>}
                    <input className='champs' type="text" placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errorUsername && <span className='error'>{errorUsername}</span>}
                    <input className='champs' type="email" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errorEmail && <span className='error'>{errorEmail}</span>}
                    <input className='champs' type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errorPassword && <span className='error'>{errorPassword}</span>}
                    <input className='champs' type="password" placeholder='Confirm password' name='password_confirmation' value={password_confirmation} onChange={(e) => setPasswordconfimr(e.target.value)} />
                    {errorPassword && <span className='error'>{errorPassword}</span>}
                    <button type='submit' id='sub'>
                        {loader === "on" ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Inscription;
