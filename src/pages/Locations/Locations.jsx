import { PenBoxIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";
import "./Locations.css";

function Locations() {
  const [Locais, setLocais] = useState([]);
  const { user } = useAuth();
 const navigate = useNavigate();

  useEffect(() => {
    useAxios("/destinos").then((response) => {
      setLocais(response.data);
    });

  }, []);

  // Função para deletar um destino
  async function deleteLocation(id) {
    try {
      const locationResponse = await useAxios(`/destinos/${id}`);
      const location = await locationResponse.data;

      if (user.id === location.usuario_id) {
        const response = await useAxios(`/destinos/${id}`, {
          method: "DELETE",
        });
        if (response.status === 204) {
          const newLocais = Locais.filter((item) => item.id !== id);
          setLocais(newLocais);
          alert("Local excluído com sucesso!");
        }
      } else {
        alert("Você não tem permissão para excluir este destino.");
      }
    } catch (error) {
      console.error("Erro ao excluir destino:", error);
    }
  }

  async function updateLocation(id) {
    try {
      const locationResponse = await useAxios(`/destinos/${id}`);
      const location = await locationResponse.data;
      if (user.id === location.usuario_id) {
        navigate(`/dashboard/locais/${id}`);
        const response = await useAxios(`/destinos/${id}`, {
          method: "PUT",
        });
        if (response.status === 201) {
          const newLocais = Locais.filter((item) => item.id !== id);
          setLocais(newLocais);
          alert("Local atualizado com sucesso!");
        }
      } else {
        alert("Você não tem permissão para atualizar este destino.");
      }
    } catch (error) {
      console.error("Erro ao atualizar destino:", error);
    }
  }

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
              <th>Nome do Local</th>
              <th>Localização</th>
              <th>Descrição</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Link GoogleMaps</th>
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
                <td>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver no Google Maps
                  </a>
                </td>
                <td className="table-icon">
                  {/* Verifica permissão antes de permitir a navegação para a edição */}
                  <button onClick={() => updateLocation(item.id)} className="delete">
                    <PenBoxIcon size={28} className="pen" id="pen" />
                  </button>
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
  );
}

export default Locations;
