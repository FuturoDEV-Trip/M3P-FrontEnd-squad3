import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { api } from "../../services/api";

export function EditLocation() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  async function onUpdate(data) {
    const response = await api(`/Locais/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Local atualizado com sucesso!");
    }
  }
  async function recoverLocation() {
    try {
      const response = await api(`/Locais/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do local");
      }
      const data = await response.json();
      if (data) {
        reset(data);
      }
      
    } catch (error) {
      console.error("Erro ao buscar o local:", error);
    }
  }

  useEffect(() => {
    recoverLocation();
  }, [id, reset]);

  return (
    <div className="container-form">
      <div className="elements-sidebar">
        <Sidebar className="sidebar" />
      </div>
      <div className="form-container">
        <div className="titulo">
          <h1>Atualizar Locais</h1>
        </div>
        <Form
          register={register}
          handleSubmit={handleSubmit}
          addLocation={onUpdate}
          Locations={recoverLocation}
          id={id}
          reset={reset}
          className="form"
          customButton={<button type="btn-custom">Atualizar</button>}
        ></Form>
      </div>
    </div>
  );
}
