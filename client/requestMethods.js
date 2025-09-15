import axios from 'axios';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080/api';

export const publicRequest = axios.create({
  baseURL: appUrl,
  headers: { 'Content-Type': 'application/json' },
});

publicRequest.interceptors.request.use((config) => {
  try {
    const persisted = typeof window !== 'undefined' ? localStorage.getItem('persist:root') : null;
    if (persisted) {
      const user = JSON.parse(JSON.parse(persisted).user || '{}');
      const token = user?.currentUser?.data?.token || user?.currentUser?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});
