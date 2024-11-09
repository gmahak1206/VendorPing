import Button from 'react-bootstrap/Button';

const startPing = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: 'START_PING' });
        });
    }
}

const stopPing = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: 'STOP_PING' });
        });
    }
}

const Vendor = () => {
    
    return (
        <div style={{ display: 'flex', height: "100vh", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Button variant="primary" onClick={startPing}>start</Button>
            <Button variant="primary" onClick={stopPing}>stop</Button>
        </div>
    )
}

export default Vendor;