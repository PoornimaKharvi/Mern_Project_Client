import { Button, Modal } from "react-bootstrap";

import React, { useState } from "react";

const Errorpop = ({modalshow,handleClose,modalerror}) => {

  return (
    <div>
      <Modal show={modalshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalerror}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Errorpop;

