import { get } from "../../Base/Api";
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateListParameters from "../../Base/CreateListParameters";

export const ListContext = React.createContext({ name: 'defaultValueForListContext' });

const Filters = ({ filters }) => {

  // const [filtersJson, setFiltersJson] = useState([]);

  const applyFilters = () => {
    console.log(filters);
    for (var i = 0; i < filters.props.children.length; i++) {
      console.log(filters[i]);
    }
  };

  return <div id='filters'>
    {filters}
    <Button variant="contained">Remove Filters</Button>
    <Button variant="contained" color="primary" onClick={() => applyFilters()}>
      Apply
    </Button>
  </div>
}

const List = (props) => {

  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  // const [creationDialogOpen, setCreationDialogOpen] = useState();
  // const [scroll, setScroll] = useState('paper');
  const [listParameters, setListParameters] = useState(CreateListParameters());

  useEffect(() => {
    setLoading(true);
    get(`${props.entity}/list`).then((data) => {
      setData(data.data);
      setLoading(false);
    }, (error) => {
      //error(error);
      console.error(error);
      setLoading(false);
    });
  }, []);

  // const openCreationDialog = (scrollType) => () => {
  //     setCreationDialogOpen(true);
  //     setScroll(scrollType);
  // };

  // const closeCreationDialog = () => {
  //     setCreationDialogOpen(false);
  // };

  return <ListContext.Provider value={listParameters}>
    {
      loading
        ?
        <div>loading...</div>
        :
        <>
          <div>{props.title}</div>
          <Filters filters={props.filters} />
          <div>{props.sorts}</div>
          <div>
            {
              props.creation
                ?
                <div>add</div>
                :
                null
            }
          </div>
          <div>
            {props.listActions()}
          </div>
          <div>
            {data.map(item => <div key={item.id}>{item.id}</div>)}
          </div>
        </>
    }
  </ListContext.Provider>
};

export default List;


/*
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ScrollDialog() {





  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

*/