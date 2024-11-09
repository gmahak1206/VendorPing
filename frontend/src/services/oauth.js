import axios from 'axios';

let base = '.';

export const getCheckJWT = async () => {
    try {
        await axios.get(`${base}/api/oauth/checkJWT`, { withCredentials: true });
    } catch(error) {
        return false;
    }

    return true;
}