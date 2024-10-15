// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";
import { destiny } from "../../services/serviceMaps";
import "./RegisterLocations.css";

function RegisterLocation() {
  const [Locais, setLocais] = useState([]);
  const usuarioId = useAuth();

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const response = await useAxios("/destinos", { method: "GET" });
        setLocais(response.data);
      } catch (error) {
        console.error("Erro ao buscar destinos: ", error);
      }
    };
    dataAxios();
  }, []);
  const { register, handleSubmit, formState, setValue, reset, watch } =
    useForm();
  const cep = watch("cep");

  async function addLocation(data) {
    try {
      const locationData = {
        ...data,
        usuarioId: usuarioId.user.id,
      };
      const response = await useAxios("/destinos", {
        method: "POST",
        data: locationData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Local cadastrado com sucesso!");
        reset();
      } else {
        alert("Erro ao cadastrar local", response.data);
      }
    } catch (error) {
      console.error("Erro ao cadastrar local:", error);
    }
  }
  async function addressPlace(cep) {
    if (cep && cep.length === 8) {
      try {
        const response = await destiny(cep);

        setValue("localizacao", response.destinyLocation);
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
    <>
      <div className="container-form">
        <div>
          <Sidebar className="sidebar" />
        </div>

        <div className="form-container-pai">
            <h1>Cadastro de Locais</h1>
          <div className="titulo">
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
    </>
  );
}
export default RegisterLocation;
