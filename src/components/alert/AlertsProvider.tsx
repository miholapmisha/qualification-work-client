import { createContext, PropsWithChildren, useContext, useState } from "react"
import { AlertType } from "./Alert"
import AlertsWrapper from "./AlertsWrapper"

type AlertContextType = {
    alerts: AlertType[]
    addAlert: (alert: AlertType) => void,
    removeAlert: (alert: AlertType) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

const AlertsProvider = ({ children }: PropsWithChildren) => {
    const [alerts, setAlerts] = useState<AlertType[]>([])
    const addAlert = (alert: AlertType) => {
        setAlerts(prevAlerts => [...prevAlerts, alert])
    }

    const removeAlert = (alert: AlertType) => {
        setAlerts(prevAlerts => prevAlerts.filter(item => item.id !== alert.id))
    }

    return (
        <AlertContext.Provider value={{ addAlert, removeAlert, alerts }}>
            {children}
            <AlertsWrapper alerts={alerts} />,
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