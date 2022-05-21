import axios from 'axios';
/**
 *
 * @param images json object {id: uuid(), image: base64()}
 */
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_IMAGE_RECOGNITION_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
