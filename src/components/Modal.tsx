import React, { useEffect, useRef } from "react";

interface ModalProps {
    id: string;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    show?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ id, title, children, actions, show }) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (show && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [show]);

    return (
        <dialog ref={modalRef} id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {title && <div className="badge badge-error">{title}</div>}
                <div className="py-4">{children}</div>
                <div className="modal-action">
                    {actions || (
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    )}
                </div>
            </div>
        </dialog>
    );
};
