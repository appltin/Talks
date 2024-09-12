import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RuleModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Community Posting Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
            <li>No violent or hateful speech</li>
            <li>No posting of illegal content</li>
            <li>Maintain courtesy and respect others</li>
            <li>Follow community guidelines</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RuleModal;