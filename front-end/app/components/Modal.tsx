'use client'
import React, { useEffect, useRef } from 'react';

type ModalProps = {
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ handleClose, children }) => {

  const modalStyle: React.CSSProperties = {
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    height: '70vh',
    width: '50vw',
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <>
        <div style={modalStyle} className='bg-neutral text-primary top-1/2 left-1/2 fixed rounded-lg'>
          <div onClick={(e) => e.stopPropagation()}>
            {children}
            <button onClick={handleClose} className='btn btn-primary'>Close</button>
          </div>
        </div>
    </>
  );
};

export default Modal;