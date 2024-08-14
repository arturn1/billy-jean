import { v4 as uuidv4 } from 'uuid';

export interface QrCode {
  id: string;
  sessionId: string;
  apiKey: string;
  state: string;
  qrCode: boolean;
  qrCodeImagem: any,
  message: string;
  createdAt: Date;
  updatedAt: Date;
}


export const createQrCode = (state: string, qrCode: boolean, qrCodeImagem: any, message: string): QrCode => ({
  id: uuidv4(),
  apiKey: "feitosadev",
  sessionId: "invest_wa_api",
  state: state,
  qrCode: qrCode,
  qrCodeImagem: qrCodeImagem,
  message: message,
  createdAt: new Date(),
  updatedAt: new Date(),
});
