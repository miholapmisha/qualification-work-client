import { useState, useEffect } from "react"
import CloseIcon from "../common/icons/CloseIcon"
import InfoIcon from "../common/icons/InfoIcon"

export type AlertType = {
    id: string
    type: 'success' | 'error',
    message: string,
    timeout?: number
}

type AlertProps = {
    alert: AlertType,
    onClose: (alert: AlertType) => void
}

const alertStyles = {
    success: 'bg-green-600',
    error: 'bg-red-600'
}

const Alert = ({ alert, onClose }: AlertProps) => {

    const [isVisible, setIsVisible] = useState(false)

    const hide = () => {
        setTimeout(() => onClose(alert), 300)
        setIsVisible(false)
    }

    useEffect(() => {
        const animationTimeout = setTimeout(() => setIsVisible(true), 100)
        let closeTimeout = undefined
        if (alert.timeout) {
            closeTimeout = setTimeout(hide, alert.timeout)
        }

        return () => {
            if (closeTimeout) {
                clearInterval(closeTimeout)
            }
            clearInterval(animationTimeout)
        }
    }, [alert])

    return (
        <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'} transition-all
                                    ${alertStyles[alert.type]}
                                    duration-400 w-full max-w-[456px]
                                    flex space-x-2 items-start justify-between 
                                    p-4 border 
                                    text-white rounded-lg`} role="alert">
            <InfoIcon fill="white" />
            <div>
                <span className="font-medium">{alert.message}</span>
            </div>
            <div className="cursor-pointer">
                <CloseIcon onClick={() => {
                    hide()
                }} fill="white" />
            </div>
        </div>
    )

}

export default Alert