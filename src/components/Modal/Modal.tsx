import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
