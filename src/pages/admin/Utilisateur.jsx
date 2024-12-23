

export const Utilisateur = ({ title, btnAdd = false }) => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="text-start mb-3">Utilisateurs</h1>
          <div className="d-flex align-items-center">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Rechercher..."
                />
                <span class="input-group-text">
                SearchIcon
                </span>
              </div>
            </div>
            <div>
              <span className="ms-2">
              PrevIcon
              </span>
              <span className="ms-2">
              SuivIcon
              </span>
            </div>
            <span className="fw-bold">Page 1 / 2</span>
            <button className="btn btn-primary ms-auto">Ajouter</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom Prénom</th>
                <th scope="col">Post</th>
                <th scope="col">Contact</th>
                <th scope="col">Genre</th>
                <th scope="col">Etat du compte</th>
                <th scope="col" className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(11).keys()].map((data, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>Traore Ali</td>
                    <td>Sécretaire</td>
                    <td>75 xx xx xx</td>
                    <td>Homme</td>
                    <td>Actif</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button className="btn btn-primary mx-1 rounded-3" data-bs-toggle="modal" data-bs-target="#voir">
                           Voir
                        </button>

                        <button className="btn btn-danger mx-1 rounded-3">
                           Banir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="modal fade"
        id="voir"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Information sur l'utilisateur
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="d-flex">
              <img
                className="rounded-3"
                width={"172px"}
                src="https://source.unsplash.com/random/800x800/?person=1"
                alt=""
              /><div className="ms-2 text-start w-100">
                
                <div className="d-flex w-100">
                <h3 className="me-auto">Traore Ali</h3>
                <span>Secretaire</span>

                </div>
                <span>Homme</span><br />
                <span>ali@gmail.com</span><br />
                <span>+226 xx xx xx xx</span><br />


              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
