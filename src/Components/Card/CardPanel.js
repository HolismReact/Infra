const CardPanel = () => {
  return (<div className="card">
    <div className="card-header">
      <h6 className="card-title">Sizing Input</h6>
      <ul className="list-inline card-tools">
        <li className="list-inline-item mb-0">
          <button type="button" class="btn btn-outline-success btn-uppercase">
            <i class="fa fa-save"></i> <span className="hidden md:block" >Create User </span>
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-outline-secondary btn-uppercase">
            <i class="fa fa-plus"></i>  <span className="hidden md:block">Create User</span>
          </button>
        </li>
      </ul>
    </div>
    <div className="card-body">
      test card
    </div>
  </div>
  );
}
export default CardPanel;