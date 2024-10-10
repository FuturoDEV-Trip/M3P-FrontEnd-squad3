import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";
import { destiny } from "../../services/serviceMaps";
import "./RegisterLocations.css";

function RegisterLocation() {
  const [locais, setLocais] = useState([]);
  const usuarioId = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/destinos");
        if (!response.ok) {
          throw new Error("Erro ao buscar Locais");
        }
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        console.error("Erro ao buscar Locais:", error);
      }
    };

    fetchData();
  }, []);

  const { register, handleSubmit, formState, setValue, reset, watch } = useForm();
  const cep = watch("cep");

  async function addLocation(data) {
    try {
      const locationData = {
        destino_nome: data.destino_nome, 
        localizacao: data.localizacao,   
        descricao: data.descricao,
        cep: data.cep,
        latitude: data.latitude,
        longitude: data.longitude,
        usuarioId: usuarioId.user.id,   
      };
      const response = await api.post("/destinos", locationData); 

      if (response.ok) {
        alert("Local cadastrado com sucesso!");
      }
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar local:", error);
    }
  }

  async function addressPlace(cep) {
    if (cep && cep.length === 8) {
      try {
        const response = await destiny(cep);
        setValue("localizacao", response.address_name); 
        setValue("logradouro", response.address);
        setValue("bairro", response.district);
        setValue("cidade", response.city);
        setValue("estado", response.state);
        setValue("latitude", response.lat);
        setValue("longitude", response.lng);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }

  useEffect(() => {
    addressPlace(cep);
  }, [cep, reset, addLocation]);

  return (
    <div className="container-form">
      <div className="elements-sidebar">
        <Sidebar className="sidebar" />
      </div>
      <div className="form-container">
        <div className="titulo">
          <h1>Cadastro Locais</h1>
        </div>
        <Form
          register={register}
          handleSubmit={handleSubmit}
          addLocation={addLocation}
          setValue={setValue}
          reset={reset}
          className="form"
        />
      </div>
    </div>
  );
}

export default RegisterLocation;
