import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Card } from "../../components/Cards/Card";
import { MapMarker } from "../../components/MapMarker/MapMarker";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Table } from "../../components/Table/Table";
import useAxios from "../../hooks/useAxios";
import "./Dashboard.css";
import axios from 'axios';

function Dashboard() {
  const [Locais, setLocais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const { user, signIn } = useContext(AuthContext); 

  useEffect(() => {
    useAxios("/destinos").then((response) => {
      setLocais(response.data);
    });
    // const fetchData = async () => {
    //   try {
    //     const response = await api("/Locais/");
    //     if (!response.ok) {
    //       throw new Error("Erro ao buscar Locais");
    //     }
    //     const data = await response.json();
    //     setLocais(data);
    //   } catch (error) {
    //     console.error("Erro ao buscar Locais:", error);
    //   }
    // };
 // fetchData();
  }, []);

  useEffect(() => {
    useAxios("dashboard/usuarios").then((response) => {
      let usuariosLogados = response.data.usuariosLogados;
      setUsuarios(usuariosLogados);
      console.log(usuariosLogados);
    });
    // const userData = async () => {
    //   try {
    //     const response = await api("/usuario/");
    //     if (!response.ok) {
    //       throw new Error("Erro ao buscar usuarios");
    //     }
    //     const data = await response.json();
    //     setUsuarios(data);
    //   } catch (error) {
    //     console.error("Erro ao buscar usuarios:", error);
    //   }
    // };
    // userData();
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
          <h1>Dashboard</h1> 
          <div>
      {!user && ( // Verifica se o usuário não está logado
       <div>
      <Link to={'/login'}>
        <h4>Faça o login aqui</h4>
      </Link>
       </div>
         )}
         </div>

        </div>
        <div className="containerCards">
          <Card
            title="Usuários Ativos"
            count={usuarios}
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
            <h4>Locais Cadastrados</h4> <h4>Mapa</h4>
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
                <MapMarker locais={Locais} selectedLocation={selectedLocation} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
