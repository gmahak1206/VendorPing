import axios from 'axios';

let base = 'http://localhost:3001';

export const getCheckJWT = async () => {
    try {
        await axios.get(`${base}/api/oauth/checkJWT`, { withCredentials: true });
    } catch(error) {
        return false;
    }

    return true;
}