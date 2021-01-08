import './nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em componentes */}
            <Link to="/">
                <i className="fa fa-inbox"></i>  Início
            </Link>
            <Link to="/clientes">
                <i className="fa fa-user"></i>  Clientes
            </Link>
            <Link to="/versions">
                <i className="fa fa-database"></i>  Versões
            </Link>
        </nav>
    </aside>