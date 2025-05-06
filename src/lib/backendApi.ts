import axios from 'axios';
import { toast } from 'sonner';

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ex: http://localhost:3001
  withCredentials: true, // Garante envio do cookie de autenticação
});

let sessionExpiredToastShown = false;

backendApi.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
    const cookieHeader = config.headers?.Cookie || config.headers?.cookie;

    console.log('➡️ Requisição DIRETA ao backend');
    console.log('URL:', fullUrl);
    if (cookieHeader) {
      console.log('Cookie:', cookieHeader);
    } else {
      console.log('Cookie: (nenhum enviado)');
    }

    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição direta:', error);
    return Promise.reject(error);
  }
);

backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const isBrowser = typeof window !== 'undefined';
    const status = error.response?.status;

    if (isBrowser && status === 401 && !sessionExpiredToastShown) {
      sessionExpiredToastShown = true;

      toast('Sessão expirada', {
        description: 'Você foi desconectado. Faça login novamente.',
        duration: 4000,
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 4000);
    }

    return Promise.reject(error);
  }
);

export default backendApi;
