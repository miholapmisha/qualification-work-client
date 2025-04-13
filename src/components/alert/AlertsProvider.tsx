import { createContext, PropsWithChildren, useContext, useState } from "react"
import Alert, { AlertType } from "./Alert"
import { createPortal } from "react-dom"

type AlertContextType = {
    addAlert: (alert: AlertType) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

const AlertsProvider = ({ children }: PropsWithChildren) => {
    const [alerts, setAlerts] = useState<AlertType[]>([])
    const alertContainer = document.getElementById('alert-container')

    const addAlert = (alert: AlertType) => {
        setAlerts(prevAlerts => [...prevAlerts, alert])
    }

    const removeAlert = (alert: AlertType) => {
        setAlerts(prevAlerts => prevAlerts.filter(item => item.id !== alert.id))
    }

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
            {alertContainer &&
                createPortal(
                    <div className="z-10 absolute top-0 right-2 space-y-2">
                        {alerts.map(alert => (
                            <Alert key={alert.id} alert={alert} onClose={(alert) => removeAlert(alert)} />
                        ))}
                    </div>,
                    alertContainer
                )}
        </AlertContext.Provider>
    )
}

export const useAlerts = () => {

    const alertsContext = useContext(AlertContext)

    if (!alertsContext) {
        throw new Error("useAlertsContext should be used inside of AlertsProvider")
    }

    return alertsContext
}

export default AlertsProvider