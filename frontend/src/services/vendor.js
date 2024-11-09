import axios from 'axios';

let base = 'http://localhost:3001';

export const signin = async (body) => {
    await axios.post(`${base}/api/vendors/signin`, body, { withCredentials: true });
}