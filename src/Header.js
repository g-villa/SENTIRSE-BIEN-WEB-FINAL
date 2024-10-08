import './header.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from './App.js';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setUserFlag, userFlag, user, userName } = useContext(DataContext);
    const history = useNavigate();

    // Verifica si el usuario está logueado y su email es el especificado
    const isAdmin = user && userName === "admin1@gmail.com"; // Reemplaza con el email del administrador

    return (
        <div className={`header ${menuOpen ? 'active' : ''}`}>
            <div className='icono'>
                <Link to='/'>
                    <img src={Icono} className='icono' alt='logo' />
                </Link>
            </div>

            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar' : 'Menú'}
            </button>

            <div className='opciones'>
                <button onClick={() => { history('/about') }}>Acerca de</button>
                <button onClick={() => { history('/citas') }}>Citas</button>
                <button onClick={() => { history('/servicios') }}>Servicios</button>
                <button onClick={() => { history('/contacto') }}>Contacto</button>
                <button onClick={() => { history('/noticias') }}>Noticias</button>
                {isAdmin && (
                    <button onClick={() => { history('/admin') }}>Admin</button>
                )}
            </div>

            <button className='login' onClick={() => {
                if (user) {
                    signOut(auth);
                    setUserFlag(false);
                } else {
                    history('/login');
                }
            }}>
                {user ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
        </div>
    );
}

export default Header;