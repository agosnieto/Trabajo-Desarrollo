
import { NavLink } from "react-router-dom";
import "../App.css";
import "./Header.css"

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg text-white" style={{ backgroundColor: '#37373f' }}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/"><img src="/img/logo1.png" alt="" width={200} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/vendedores"}>
                Vendedores
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="vendedores/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="vendedores/alta">Alta</NavLink></li>
                <li><NavLink className="dropdown-item" to="vendedores/baja">Baja</NavLink></li>
                <li><NavLink className="dropdown-item" to="vendedores/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/ventas"}>
                Ventas
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="ventas/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="ventas/alta">Alta</NavLink></li>
                <li><NavLink className="dropdown-item" to="ventas/baja">Baja</NavLink></li>
                <li><NavLink className="dropdown-item" to="ventas/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/articulos"}>
                Articulos
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="articulos/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="articulos/alta">Alta</NavLink></li>
                <li><NavLink className="dropdown-item" to="articulos/baja">Baja</NavLink></li>
                <li><NavLink className="dropdown-item" to="articulos/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/clientes"}>
                Clientes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="clientes/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="clientes/alta">Alta</NavLink></li>
                <li><NavLink className="dropdown-item" to="clientes/baja">Baja</NavLink></li>
                <li><NavLink className="dropdown-item" to="clientes/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/barrios"}>
                Barrio
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="barrios/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="barrios/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/sucursales"}>
                 Sucursales
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="sucursales/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="sucursales/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/tipoclientes"}>
                Tipo Clientes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="tipoclientes/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="tipoclientes/modificar">Modificar</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to={"/tipoarticulos"}>
                Tipo Articulo
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="tipoarticulos/consulta">Consulta</NavLink></li>
                <li><NavLink className="dropdown-item" to="tipoarticulos/modificar">Modificar</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Header() {
  return (
    <header>
      <Menu/>
    </header>
  );
}
