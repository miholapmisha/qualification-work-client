import { PropsWithChildren, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export type ModalProps = {
    isOpen: boolean,
    onClose: () => void
} & PropsWithChildren

const Modal = ({ children, isOpen, onClose }: ModalProps) => {

    const modalRef = useRef<HTMLDialogElement>(null)
    const modalContainer = document.getElementById('modal')

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }
    }, [isOpen])

    if (!modalContainer) {
        return null
    }

    return createPortal(
        <dialog className="p-[1rem] max-w-[80%] fixed top-1/2 left-1/2 
                            transform -translate-x-1/2 -translate-y-1/2 
                            backdrop:bg-black/30
                            bg-white rounded-lg shadow-lg"
            ref={modalRef} onClose={() => onClose()}>
            {isOpen ? children : null}
        </dialog>,
        modalContainer
    )
}

export default Modal