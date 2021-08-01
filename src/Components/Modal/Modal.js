import clsx from 'clsx';
import React from 'react';

const Modal = () => {
    const [openModal, setOpenModal] = React.useState(false);
    return (<>
        <button
            type="button"
            onClick={() => { setOpenModal(!openModal) }}
            class="btn btn-outline-success btn-uppercase" >
            <span className="hidden md:block">open Modal</span>
        </button>

        <div className={clsx("modal", {
            open: openModal,
        })} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" class="btn btn-outline-success btn-uppercase">
                            <i class="fa fa-plus"></i>  <span className="hidden md:block">Create User</span>
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-uppercase">
                            <i class="fa fa-plus"></i>  <span className="hidden md:block">Create User</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>);
}
export default Modal