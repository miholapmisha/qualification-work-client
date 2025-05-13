import { createPortal } from "react-dom";
import Alert, { AlertType } from "./Alert";
import { useAlerts } from "./AlertsProvider";

type AlertsWrapperProps = {
    alerts: AlertType[]
}

const AlertsWrapper = ({ alerts }: AlertsWrapperProps) => {

    const { removeAlert } = useAlerts()
    const alertContainer = document.getElementById('alert-container')

    if (!alertContainer) return null

    return createPortal(
        <div className="z-[99999] fixed top-0 right-2 space-y-2">
            {alerts.map(alert => (
                <Alert key={alert.id} alert={alert} onClose={(alert) => removeAlert(alert)} />
            ))}
        </div>
        , alertContainer)
}

export default AlertsWrapper