import axios from 'axios';

let base = '.';

export const signin = async (body) => {
    await axios.post(`${base}/api/vendors/signin`, body, { withCredentials: true });
}