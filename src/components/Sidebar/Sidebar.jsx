import {
  HomeIcon,
  LogOut,
  MapPinPlus,
  Table2Icon,
  User,
} from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../../../images/descubra-floripa.png";
import { useAuth } from "../../contexts/Auth";

export function Sidebar() {
  const { user, signOut } = useAuth();

  return user ? (
    <>
      <div className="elements-sidebar">
        <div className="sidebar-logo">
          {/* <h6>Descubra Floripa</h6> */}
          <img
            src={logo}
            alt="Descubra Floripa Logo"
            className="sidebar-logo"
          />
        </div>
        <div className="user">
          <User size={28} className="user" />
          <span>Olá, {user.nome}</span>
        </div>
        <div className="home">
          <Link  to={"/dashboard"} style={{ textDecoration: "none" }}>
            <HomeIcon size={28} className="links"/>
            <span className="links">Home</span>
          </Link>
        </div>
        <div className="locations">
          <Link
            to={"/dashboard/tabelaLocais"}
            style={{ textDecoration: "none" }}
          >
            <Table2Icon size={28} className="mappin links" />
            <span className="links">Lista Locais</span>
          </Link>
        </div>
        <div className="locations">
          <Link
            to={"/dashboard/cadastrarLocais"}
            style={{ textDecoration: "none" }}
          >
            <MapPinPlus size={28} className="mappin links" />
            <span className="links">Cadastro Locais</span>
          </Link>
        </div>
        <div className="exit">
          <button onClick={signOut} className="logout buttonSair">
            <LogOut size={28} /> Sair
          </button>
          {/* <span > Sair</span> */}
        </div>
      </div>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}
