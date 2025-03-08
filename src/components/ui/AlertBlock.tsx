import { useEffect, useState } from "react"
import CloseIcon from "./icons/CloseIcon"
import InfoIcon from "./icons/InfoIcon"

type AlertBlockProps = {
    alertMessage: string | null
    onCloseAlert: () => void
}

const AlertBlock = ({ alertMessage, onCloseAlert }: AlertBlockProps) => {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (alertMessage) {
            const timeout = setTimeout(() => setIsVisible(true), 100)
            return () => clearInterval(timeout)
        } else {
            setIsVisible(false)
        }
    }, [alertMessage])

    return (
        <>
            <div className={`${isVisible ? 'opacity-100 -translate-y-1.5' : 'opacity-0 translate-y-0'} transition-all duration-400 absolute w-full flex space-x-2 items-start justify-between p-4 bg-red-600 border text-white rounded-lg`} role="alert">
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
            </div>
        </>
    )
}

export default AlertBlock
