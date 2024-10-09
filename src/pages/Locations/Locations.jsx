import { PenBoxIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";
import "./Locations.css";

function Locations() {
  const [Locais, setLocais] = useState([]);
  const userId = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api("/Destinos/"); 
        if (!response.ok) {
          throw new Error("Erro ao buscar Destinos");
        }
        const data = await response.json();
        setLocais(data); 
      } catch (error) {
        console.error("Erro ao buscar Destinos:", error);
      }
    };
    fetchData();
  }, []);
  

  async function deleteLocation(id) {
    try {
      const locationResponse = await api(`/Destinos/${id}`); // Altere para "/Destinos/"
      const location = await locationResponse.json();
     
      if (userId.user.id === location.usuarioId) {
        const response = await api(`/Destinos/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const newLocais = Locais.filter((item) => item.id !== id); // Manter a variável de estado ou mudar para algo como "Destinos"
          setLocais(newLocais); // Manter a variável ou mudar para "setDestinos"
          alert("Destino excluído com sucesso!");
        }
      } else {
        alert("Você não tem permissão para excluir este destino");
      }
    } catch (error) {
      console.error("Erro ao excluir destino:", error);
    }
  }  
  return (
    <div className="container-List">
      <div className="list-elements-sidebar">
        <Sidebar />
      </div>
      <div className="list-container">
        <div className="titulo-list">
          <h1>Lista dos Destinos</h1> {/* Alterado para "Destinos" */}
        </div>
        <table className="table table-borderless custom-table table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Destino</th> {/* Alterado */}
              <th>Cidade</th>
              <th>Estado</th>
              <th>Descrição</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Locais.map((item) => (  // Se preferir, renomeie Locais para Destinos
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.destino_nome}</td> {/* Altere para refletir a estrutura do destino */}
                <td>{item.localizacao}</td>
                <td>{item.estado}</td>
                <td>{item.descricao}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td className="table-icon">
                  <Link to={`/dashboard/destinos/${item.id}`}> {/* Altere para "/destinos/" */}
                    <PenBoxIcon size={28} className="pen" id="pen" />
                  </Link>
                  <button
                    onClick={() => deleteLocation(item.id)}
                    className="delete"
                  >
                    <Trash2 size={28} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Locations
