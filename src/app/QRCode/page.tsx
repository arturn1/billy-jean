'use client';

import { Message as MessageModel } from "@/models/Message";
import { QrCode as QrCodeModel, createQrCode } from "@/models/QrCode";
import { User } from "@/models/User";
import { useState, useEffect } from "react";
import { QrCodeService } from "../../services/QrCodeService";  
 

interface QrCodeProps {
  initialUser: User;
}
const newSession: QrCodeModel = createQrCode("", false, "", "") as QrCodeModel;

function PageQrCode({ initialUser }: QrCodeProps) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const [currentQrCode, setQrCode] = useState<QrCodeModel>(newSession);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (!currentQrCode?.state) {
      fetchMessages(currentQrCode);
    }
  }, [currentQrCode]);

  const fetchMessages = async (dataQrCode: QrCodeModel) => {
    setLoading(true);
    try {
      const data = QrCodeService.getSession(dataQrCode) as unknown as QrCodeModel;
      console.log(data);
      // setQrCode(data);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <img src="" />
    </div>
  );
}

export default PageQrCode;