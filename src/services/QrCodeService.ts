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
  getSession: async (QrCodeData: QrCodeModel): Promise<QrCodeModel> => {
    const route = `${endpoint}${sessionRoutes.status}/${QrCodeData.sessionId}`;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Content-Type": "application/json;charset=UTF-8",
      'Accept': 'application/json',
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
      if (containsStringInObject(data, ["false", "null", "session_not_found"])) {
        const session = await QrCodeService.setSession(QrCodeData);
        const respQrCode = await createQrCode(data?.success, false, "", data?.message) as QrCodeModel;
      }
      else if (containsStringInObject(data, ["false", "null", "session_not_connected"]))
      {

      }else{
        
      }
  
      return QrCodeData;
    } catch (error) {
      console.error('Failed to fetch session:', error);
      throw error;
    }
  },

  getQrCode: (sessionId: string, apikey: string) => {
    // Aqui você pode implementar a lógica para obter o QR Code
  },
  
  setSession: async (QrCodeData: QrCodeModel): Promise<QrCodeModel> => {
    const route = `${endpoint}${sessionRoutes.start}/${QrCodeData.sessionId}`;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Content-Type": "application/json;charset=UTF-8",
      'Accept': 'application/json',
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
  
      const data = await response.json();
      const respQrCode = await createQrCode(data?.success, false, "", data?.message) as QrCodeModel;
      
      return respQrCode;
    } catch (error) {
      console.error('Falha ao recuperar a sessão:', error);
      throw error;
    }
  },
  

  terminateAllSession: (sessionId: string, apikey: string) => {
    // Aqui você pode implementar a lógica para terminar todas as sessões
  },

};

const containsStringInObject = (object: { [key: string]: any }, stringsToCheck: string[]): boolean => {
  return Object.values(object).some(value => 
    stringsToCheck.includes(value)
  );
}

