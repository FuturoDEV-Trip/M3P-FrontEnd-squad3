import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from 'react-router-dom';
import banner from '../../assets/banner-dashboard.svg';
import logo from '../../assets/logo-descubra-floripa.png';
import { Card } from "../../components/Cards/Card";
import { MapMarker } from "../../components/MapMarker/MapMarker";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Table } from "../../components/Table/Table";
import { AuthContext } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";
import "./Dashboard.css";

function Dashboard() {
  const [Locais, setLocais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const { user, signIn } = useContext(AuthContext); 

  useEffect(() => {
    useAxios("/destinos",{}).then((response) => {
      setLocais(response.data);
    });
  }, []);

  useEffect(() => {
    useAxios("dashboard/usuarios",{}).then((response) => {
      let usuariosLogados = response.data.usuariosLogados;
      setUsuarios(usuariosLogados);
    });
  }, []);

  const handleRowClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
  };

  const handleLogin = async () => {
    const email = ''; 
    const password = ''; 
    const success = await signIn({ email, password });
    if (!success) {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className="container-dashboard">
      {/* Renderiza o Sidebar apenas se o usuário estiver autenticado */}
      {user && (
        <div className="sidebar">
          <Sidebar className="elements-sidebar" />
        </div>
      )}

      <div className="main-content">
        <div className="titleAndLogin">
          <img src={logo} alt="Logo" className="sidebar-logo" />{" "}
          {/* Adicionado logo */}
          <div className="dashboardAlinhamento">
            <Link to={`/`}>Dashboard</Link>
            <div className="tittleAndLoginDashboardDeco"></div>
          </div>
          <div className="sobreNosAlinhamento">
            <Link to={`/`}>Sobre Nós</Link>
            <div className="tittleAndLoginSobreNosDeco"></div>
          </div>
          <div className="blogAlinhamento">
            <Link to={`/`}>Blog</Link>
            <div className="tittleAndLoginBlogDeco"></div>
          </div>
          <div>
            {!user && ( // Verifica se o usuário não está logado
              <div>
                <button
                  onClick={() => (window.location.href = `/login`)}
                  className="botao_login_dashboard"
                >
                  Faça seu login
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="container-banner">
          <img src={banner} alt="Banner Dashboard" />
        </div>

        <div className="titulodashboard">
          <h2>Dashboard</h2>
        </div>

        <div className="containerCards">
          <Card
            title="Usuários Ativos"
            count={usuarios.length === 0 ? 0 : usuarios}
            className="card"
          />
          <Card
            title="Locais Cadastrados"
            count={Locais.length}
            className="card"
          />
        </div>
        <div className="containerTableAndMap">
          <div className="titleTableAndMap">
            <h4 className="ajustar-alinhamento-locais-cadastrados">
              Locais Cadastrados
            </h4>{" "}
            <h4>Mapa</h4>
          </div>
          <div className="tableAndMap">
            <div className="table-container">
              <Table locais={Locais} onRowClick={handleRowClick} />
            </div>
            <div className="mapmarker">
              <MapContainer
                center={[-27.600326174840735, -48.64763669286935]}
                zoom={13}
                className="mapContainer"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapMarker
                  locais={Locais}
                  selectedLocation={selectedLocation}
                />
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="rodape">
          <p>Desenvolvido por Squad 3</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
