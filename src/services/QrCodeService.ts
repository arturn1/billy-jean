import { QrCode as QrCodeModel, createQrCode } from "@/models/QrCode";

const endpoint = "https://jocil4350.c35.integrator.host/session";
const sessionRoutes = {
  start: "/start",
  status: "/status",
  qr: "/qr",
  image: "/image",
  terminateAll: "/terminateAll",
};

export const QrCodeService = {
  getSession: async (QrCodeData: QrCodeModel): Promise<SessionResponse> => {
    const route = `${endpoint}${sessionRoutes.status}/${QrCodeData.sessionId}`;
    const headers = {
      'x-api-key': QrCodeData.apiKey,
    };

    try {
      const response = await fetch(route, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Failed to fetch session:', error);
      throw error;
    }
  },
  getQrCode: async (QrCodeData: QrCodeModel): Promise<any> => {
    const route = `${endpoint}${sessionRoutes.qr}/${QrCodeData.sessionId}${sessionRoutes.image}`;
    console.log('route',route)
    const headers = {
      'x-api-key': QrCodeData.apiKey,
    };

    
    try {
      const response = await fetch(route, {
        method: 'GET',
        headers: headers,
      });
      
      if (!response.ok) {
        throw new Error('Ocorreu um erro na conexão.');
      }
      
      const data = await response;
      return data.url;

    } catch (error) {
      console.error('Falha ao recuperar a sessão:', JSON.stringify(error, null, 2));
      throw error;
    }
  },

  setSession: async (QrCodeData: QrCodeModel): Promise<QrCodeModel> => {
    const route = `${endpoint}${sessionRoutes.start}/${QrCodeData.sessionId}`;
    const headers = {
      'x-api-key': QrCodeData.apiKey,
    };

    try {
      const response = await fetch(route, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Não há conexão com a internet.');
      }

      return await response.json();

    } catch (error) {
      console.error('Falha ao recuperar a sessão:', error);
      throw error;
    }
  },

  terminateAllSession: (sessionId: string, apikey: string) => {
    // Aqui você pode implementar a lógica para terminar todas as sessões
  },

};

