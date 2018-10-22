import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SkModal = (props) => {
	
	const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

	return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle} className={props.className}>
          <ModalHeader toggle={props.toggle} close={closeBtn}>{props.modalTitle}</ModalHeader>
          <ModalBody>
            {props.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.toggle}>{props.closeBtnLabel}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );	
}

export default SkModal;