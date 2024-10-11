import { PenBoxIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";
import "./Locations.css";

function Locations() {
  const [Locais, setLocais] = useState([]);
  const userId = useAuth();

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

  async function deleteLocation(id) {
    try {
      const locationResponse = await useAxios(`/destinos/${id}`);
      const location = await locationResponse.json();
   
      if (userId.user.id === location.usuarioId) {
        const response = await useAxios(`/destinos/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const newLocais = Locais.filter((item) => item.id !== id);
          setLocais(newLocais);
          alert("Local excluído com sucesso!");
        }
      } else {
        alert("Você não tem permissão para excluir este local");
      }
    } catch (error) {
      console.error("Erro ao excluir local:", error);
    }
  }
  return (
    <div className="container-List">
      <div className="list-elements-sidebar">
        <Sidebar />
      </div>
      <div className="list-container">
        <div className="titulo-list">
          <h1>Lista dos locais</h1>
        </div>
        <table className="table table-borderless table-primary custom-table table-hover table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Local</th>
              <th>Localização</th>
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
                  <Link to={`/dashboard/locais/${item.id}`}>
                    <PenBoxIcon size={28} className="pen" id="pen" />
                  </Link>
                  <button
                    onClick={() => deleteLocation(item.id)}
                    className="btn-delete"
                    id="btn-delete"
                  >
                    <Trash2 size={28} className="delete" />
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
