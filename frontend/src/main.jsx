import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// if (window.matchMedia('(display-mode: standalone)').matches) {
//   (async () => {
//     if(Notification.permission !== 'granted') {
//       try {
//         const notificationPermission = await Notification.requestPermission();
//         if (notificationPermission === 'granted') {
//           console.log("Notification permission granted.");
//         }
//       } catch (error) {
//         console.error("Failed to request notification permission:", error);
//       }
//     } else {
//       console.log("Notification permission already granted.");
//     }
    
//     if (!navigator.permissions) {
//       console.log("Permissions API not supported. Requesting location access directly.");
//       navigator.geolocation.getCurrentPosition(
//         position => console.log("Location permission granted:", position),
//         error => console.log("Location permission denied:", error.message)
//       );
//     } else {
//       try {
//         const locationPermissionStatus = await navigator.permissions.query({ name: 'geolocation' });
//         if (locationPermissionStatus.state !== 'granted') {
//           navigator.geolocation.getCurrentPosition(
//             position => console.log("Location permission granted:", position),
//             error => console.log("Location permission denied:", error.message)
//           );
//         } else {
//           console.log("Location permission already granted.");
//         }
//       } catch (error) {
//         console.error("Failed to request location permission:", error);
//       }
//     } 
//   })();
// } else {
//   console.log("The PWA is not installed.");
// }
