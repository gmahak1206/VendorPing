import { useState } from "react";
import { myGetBoolItemFromLocalStorage } from "../utils/helper";
import { getUserNotificationPreference, saveLoc, toggleUserNotification } from "../services/customer";
import Button from 'react-bootstrap/Button';

const handleLocation = async () => {
    if (!navigator.permissions) {
        console.log("Permissions API not supported. Requesting location access directly.");
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    console.log("Location permission granted:", position);
                    await saveLoc(position.coords.latitude, position.coords.longitude);
                },
                error => console.log("Location permission denied:", error.message)
            );
        } catch(error) {
            console.error("Failed to request location permission:", error);
        }
    } else {
        try {
            const locationPermissionStatus = await navigator.permissions.query({ name: 'geolocation' });
            if (locationPermissionStatus.state !== 'granted') {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        console.log("Location permission granted:", position);
                        await saveLoc(position.coords.latitude, position.coords.longitude);
                    },
                    error => console.log("Location permission denied:", error.message)
                );
            }
        } catch(error) {
            console.error("Failed to request location permission:", error);
        }
    }
}

const temp = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: 'START_PING' });
        });
    }
}

const temp1 = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: 'STOP_PING' });
        });
    }
}

const Customer = () => {
    const [notificationPermission, setNotificationPermission] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    useState(() => {
        // if (window.matchMedia('(display-mode: standalone)').matches) {
            const permissionAsked = myGetBoolItemFromLocalStorage('permissionAsked');

            if(!permissionAsked) {
                (async () => {
                    if(Notification.permission !== 'granted') {
                        try {
                            const notificationPermission = await Notification.requestPermission();
                            if (notificationPermission === 'granted') {
                                console.log("Notification permission granted.");
                                setNotificationPermission(true);

                                if ('serviceWorker' in navigator) {
                                    navigator.serviceWorker.ready.then(registration => {
                                        registration.active.postMessage({ type: 'REGISTER_PUSH_SUBSCRIPTION' });
                                    });
                                }
                            }
                        } catch (error) {
                            console.error("Failed to request notification permission:", error);
                        }
                    }                
                })();

                localStorage.setItem('permissionAsked', true)
            } else {
                console.log(Notification.permission)
                setNotificationPermission(Notification.permission === 'granted');
            }

            getUserNotificationPreference().then((bool) => {
                setNotificationEnabled(bool);
            })
        // } else {
        //     console.log("The PWA is not installed.");
        // }
    }, []);

    return (
        <>
            <div style={{ display: 'flex', height: "100vh", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                {
                    notificationPermission ?
                    <Button variant="primary" onClick={() => {
                        toggleUserNotification().then(() => {
                            setNotificationEnabled(!notificationEnabled);
                        })
                    }}>{ notificationEnabled ? "Disable" : "Enable" } Notifications</Button> :
                    <Button variant="primary" disabled>Enable Notifications</Button> 
                }
                <Button variant="primary" onClick={() => {
                    handleLocation();
                }}>Get Location</Button>
            </div> 
        </>
    )
}

export default Customer;