import { useEffect, useState } from "react"
import CloseIcon from "./icons/CloseIcon"
import InfoIcon from "./icons/InfoIcon"
import { createPortal } from "react-dom"

type AlertBlockProps = {
    alertMessage: string | null,
    onCloseAlert: () => void,
    absolute?: boolean
}

const AlertBlock = ({ alertMessage, onCloseAlert, absolute = false }: AlertBlockProps) => {

    const [isVisible, setIsVisible] = useState(false)
    const alertContainer = document.getElementById('alert-container')

    useEffect(() => {
        if (alertMessage) {
            const timeout = setTimeout(() => setIsVisible(true), 100)
            return () => clearInterval(timeout)
        } else {
            setIsVisible(false)
        }
    }, [alertMessage])

    const alert = (<div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'} transition-all 
                                    ${absolute ? 'right-2 top-2 max-w-[456px]' : ''}
                                    duration-400 absolute w-full 
                                    flex space-x-2 items-start justify-between 
                                    p-4 bg-red-600 border 
                                    text-white rounded-lg`} role="alert">
                        <InfoIcon fill="white" />
                        <div>
                            <span className="font-medium">{alertMessage}</span>
                        </div>
                        <div className="cursor-pointer">
                            <CloseIcon onClick={() => {
                                setTimeout(() => onCloseAlert(), 300)
                                setIsVisible(false)
                            }} fill="white" />
                        </div>
                    </div>)

    if (absolute && alertContainer) {
        return createPortal(alert, alertContainer)
    }

    return alert
}

export default AlertBlock
