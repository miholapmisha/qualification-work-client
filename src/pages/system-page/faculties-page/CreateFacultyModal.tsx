import Modal, { ModalProps } from "../../../components/Modal"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

const AddFacultyModal = ({ ...props }: ModalProps) => {

    return (
        <Modal {...props}>
            <div className="flex flex-col w-[334px] space-y-5">
                <div className="space-y-2">
                    <span className="font-secondary">Enter a non-empty faculty name </span>
                    <Input />
                </div>
                <div className="flex space-x-8">
                    <Button classes="flex-1" onClick={() => props.onClose()}>Close</Button>
                    <Button classes="flex-1" onClick={() => props.onClose()}>Save</Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddFacultyModal