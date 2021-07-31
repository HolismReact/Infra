import { get } from "../../Base/Api";
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Filtering from "./ListComponents/Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./ListComponents/Sorting";
import Items from "./ListComponents/Items";
import ListActions from "./ListComponents/ListActions";

export const ListContext = React.createContext({
  listParameters: {},
  reloadItems: () => { }
});

const List = (props) => {

  const [listParameters, setListParameters] = useState(CreateListParameters());

  return  <div className="card">
    <div className="card-header">
      <h6 className="card-title">{props.title}</h6>
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
      <ListContext.Provider value={{
        listParameters: listParameters,
        reloadItems: () => { }
      }}>

        <Filtering filters={props.filters} />
        <Sorting sorts={props.sorts} />
        <ListActions actions={props.listActions} />
        <Items entity={props.entity} headers={props.headers} row={props.row} card={props.card} />
        {/* <div>
        {data.map(item => <div key={item.id}>{item.id}</div>)}
      </div> */}
      </ListContext.Provider>

    </div>
  </div>

};

export default List;