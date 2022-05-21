import { axiosClient } from '@/components/axiosClient';

export function iWebLens(data: any) {
  return axiosClient.post(
    import.meta.env.VITE_IMAGE_RECOGNITION_URL,
    JSON.stringify(data),
  );
}
