import Modal from "./Modal";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: ConfirmationModalProps) => {


    return <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{title || "Confirmation"}</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end space-x-3">
                <button
                    className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onConfirm}
                >
                    Delete
                </button>
            </div>
        </div>
    </Modal>
}

export default ConfirmationModal