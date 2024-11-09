import axios from 'axios';

let base = '.';

export const siginup = async (body) => {
    await axios.post(`${base}/api/customer/signup`, body, { withCredentials: true });
}

export const signin = async (body) => {
    await axios.post(`${base}/api/customer/signin`, body, { withCredentials: true });
}

export const getUserNotificationPreference = async () => {
   const { data } = await axios.get(`${base}/api/customer/notification`,  { withCredentials: true });
   return data;
}

export const toggleUserNotification = async () => {
    await axios.post(`${base}/api/customer/notification`, {},  { withCredentials: true });
}

export const saveLoc = async (lat, long) => {
    await axios.post(`${base}/api/customer/location`, {
        latitude: lat,
        longitude: long,
    }, { withCredentials: true });
}