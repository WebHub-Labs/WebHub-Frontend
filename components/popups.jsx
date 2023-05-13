import React from 'react'
import Modal from 'react-modal';
import Image from "next/image";

const Popup = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-content">
        <Image src={imageUrl} width='1440' height='100' alt="Image" />
      </div>
    </Modal>
  )
}

export default Popup
