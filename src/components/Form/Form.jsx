export function Form({
  register,
  handleSubmit,
  addLocation,
  setValue,
  reset,
  onUpdate,
  id,
  customButton,
  Locations,
}) {
  return (
    <>
      <div className="col g-9">
        <form className="form-container" onSubmit={handleSubmit(addLocation)}>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="CEP"
              aria-label="CEP"
              {...register("cep")}
            />
          </div>
          {/* <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Local"
              aria-label="Local"
              {...register("local")}
            />
          </div> */}
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Local, Bairro, Cidade - Estado"
              aria-label="Local"
              {...register("localizacao")}
            />
          </div>
          {/* <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              aria-label="Cidade"
              {...register("cidade")}
            />
          </div> */}
          {/* <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              aria-label="Estado"
              {...register("estado")}
            />
          </div> */}
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Latitude"
              aria-label="Latitude"
              {...register("latitude")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Longitude"
              aria-label="Longitude"
              {...register("longitude")}
            />
          </div>
          <div className="col-sm-4">
            <textarea
              type="text"
              className="form-control"
              placeholder="Descrição"
              aria-label="Descrição"
              {...register("descricao")}
            />
          </div>
          {customButton ? (
            customButton
          ) : (
            <button type="submit" className="btn btn-primary-form">
              Cadastrar
            </button>
          )}
        </form>
      </div>
    </>
  );
}
