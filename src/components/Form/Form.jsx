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

          <div className="col-sm-3">
          
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              placeholder="CEP"
              aria-label="CEP"
              {...register("cep")}
            />
                   
            <input
              type="text"
              className="form-control"
              placeholder="Local, Bairro, Cidade - Estado"
              aria-label="Local"
              {...register("localizacao")}
            />
         
            <input
              type="text"
              className="form-control"
              placeholder="Latitude"
              aria-label="Latitude"
              {...register("latitude")}
            />
         
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
              className="form-descricao"
              placeholder="Descrição"
              aria-label="Descrição"
              {...register("descricao")}
            />
          </div>

          </div>

          {customButton ? (
            customButton
          ) : (
            <button type="submit" className="btn-primary-form">
              Cadastrar
            </button>
          )}
        </form>
      </div>
    </>
  );
}
