'use client';

import { useState, useEffect } from "react";
import { Message as MessageModel } from "@/models/Message";
import { QrCode as QrCodeModel, createQrCode } from "@/models/QrCode";
import { QrCodeService } from "../../services/QrCodeService";


const newSession: QrCodeModel = createQrCode("", false, "", "") as QrCodeModel;

function PageQrCode() {
  const [qrCodeGenerate, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const apiSession = await getSession(newSession);

      if (apiSession?.success === false && apiSession?.state === null) {
        if (apiSession?.message === "session_not_found") {
          await handleSessionNotFound(newSession);
        } else if (apiSession?.message === "session_not_connected") {
          await handleSessionNotConnected(newSession);
        }
      }
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const getSession = async (session: QrCodeModel) => {
    return await QrCodeService.getSession(session);
  };

  const handleSessionNotFound = async (session: QrCodeModel) => {
    await QrCodeService.setSession(session);
    await fetchAndSetQrCode(session);
  };

  const handleSessionNotConnected = async (session: QrCodeModel) => {
    await fetchAndSetQrCode(session);
  };

  const fetchAndSetQrCode = async (session: QrCodeModel) => {
    const respQrCode = await QrCodeService.getQrCode(session);
    if (respQrCode) {
      const qrCode = createQrCode("CONNECTED", true, respQrCode, "") as QrCodeModel;
      const imageUrl = await fetchQrCodeImage(qrCode.qrCodeImagem, qrCode.apiKey);
      setQrCode(imageUrl);
    }
  };

  const fetchQrCodeImage = async (url: string, apiKey: string) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-2xl font-semibold text-white-800 mb-4">QRCode</h2>
      {loading ? (
        <div className="w-64 h-64 bg-gray-300 animate-pulse mb-4 rounded shadow-lg"></div>
      ) : qrCodeGenerate ? (
        <img 
          src={qrCodeGenerate} 
          alt="QR Code" 
          width={256} 
          className="mb-4 shadow-lg rounded" 
        />
      ) : null}
    </div>
  );
}

export default PageQrCode;
