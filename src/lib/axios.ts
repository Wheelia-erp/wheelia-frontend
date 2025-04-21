import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});  


    let sessionExpiredToastShown = false;

    api.interceptors.request.use(
    (config) => {
        const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
        const cookieHeader = config.headers?.Cookie || config.headers?.cookie;

        console.log('➡️ Requisição Axios');
        console.log('URL:', fullUrl);
        if (cookieHeader) {
        console.log('Cookie:', cookieHeader);
        } else {
        console.log('Cookie: (nenhum enviado)');
        }

        return config;
    },
    (error) => {
        console.error('❌ Erro na requisição:', error);
        return Promise.reject(error);
    }
    );


    api.interceptors.response.use(
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
        }, 300000);
        }

        return Promise.reject(error);
    }
    );

export default api;






