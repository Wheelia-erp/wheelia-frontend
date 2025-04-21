import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ex: http://localhost:3001
  withCredentials: true, // Garante envio do cookie de autenticação
});

backendApi.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;
    const cookieHeader = config.headers?.Cookie || config.headers?.cookie;

    console.log("➡️ Requisição DIRETA ao backend");
    console.log("URL:", fullUrl);
    if (cookieHeader) {
      console.log("Cookie:", cookieHeader);
    } else {
      console.log("Cookie: (nenhum enviado)");
    }

    return config;
  },
  (error) => {
    console.error("❌ Erro na requisição direta:", error);
    return Promise.reject(error);
  }
);

export default backendApi;
