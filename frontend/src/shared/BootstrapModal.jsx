// BootstrapModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const BootstrapModal = ({ show, handleClose, title, body, children }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || "Popup Title"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}
                {/* <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
};

export default BootstrapModal;
