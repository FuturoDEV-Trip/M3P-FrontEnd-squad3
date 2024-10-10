import { PenBoxIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";
import "./Locations.css";

function Locations() {
  const [Locais, setLocais] = useState([]);
  const { user } = useAuth(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/Destinos/");
        if (response.status !== 200) {
          throw new Error("Erro ao buscar Destinos");
        }
        const data = response.data; 
        setLocais(data);
      } catch (error) {
        console.error("Erro ao buscar Destinos:", error);
      }
    };
    fetchData();
  }, []);

  // Função para deletar um destino
  async function deleteLocation(id) {
    try {
      const response = await api.get(`/Destinos/${id}`); 
      const location = response.data;

      // Verifica se o usuário logado é o dono do destino
      if (user.id === location.usuario_id) {
        const deleteResponse = await api.delete(`/Destinos/${id}`); 
        if (deleteResponse.status === 204) {
          const newLocais = Locais.filter((item) => item.id !== id); 
          setLocais(newLocais); 
          alert("Destino excluído com sucesso!");
        }
      } else {
        alert("Você não tem permissão para excluir este destino.");
      }
    } catch (error) {
      console.error("Erro ao excluir destino:", error);
    }
  }

  // Função para lidar com tentativa de edição sem permissão
  const handleEditPermission = (location) => {
    if (user.id === location.usuario_id) {
      return `/dashboard/destinos/${location.id}`;
    } else {
      alert("Você não tem permissão para editar este destino.");
      return "#"; 
    }
  };

  return (
    <div className="container-List">
      <div className="list-elements-sidebar">
        <Sidebar />
      </div>
      <div className="list-container">
        <div className="titulo-list">
          <h1>Lista dos Destinos</h1>
        </div>
        <table className="table table-borderless custom-table table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Destino</th>
              <th>Cidade</th>
              <th>Descrição</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Locais.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.destino_nome}</td>
                <td>{item.localizacao}</td>
                <td>{item.descricao}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td className="table-icon">
                  {/* Verifica permissão antes de permitir a navegação para a edição */}
                  <Link to={handleEditPermission(item)}>
                    <PenBoxIcon size={28} className="pen" id="pen" />
                  </Link>
                  <button onClick={() => deleteLocation(item.id)} className="delete">
                    <Trash2 size={28} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Locations;
