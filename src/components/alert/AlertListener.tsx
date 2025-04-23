import { useEffect } from "react";
import { useAlerts } from "./AlertsProvider";
import { ApiResponse } from "../../services/api/common";

const AlertListener = () => {
    const { addAlert } = useAlerts();

    useEffect(() => {
        const handleApiError = (event: CustomEvent) => {
            addAlert(event.detail);
        };

        window.addEventListener('api-error', handleApiError as EventListener);

        return () => {
            window.removeEventListener('api-error', handleApiError as EventListener);
        };
    }, [addAlert]);

    return null;
};

export const createAlertEvent = (data: ApiResponse) => {
    if (data && data.error) {
        const event = new CustomEvent('api-error', {
            detail: {
                id: crypto.randomUUID(),
                message: data.data?.message || 'An error occurred',
                type: "error"
            }
        });
        window.dispatchEvent(event);
    }
};

export default AlertListener;