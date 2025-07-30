import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const encryptPayload = (payload) => {
  return CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
};