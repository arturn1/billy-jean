'use client'

import { Chat } from "@/models/Chat";
import { User } from "@/models/User";
import { getFakeUsers, getFakeChats } from "../data/fakeDatabase";
import Home from "./Home/page";
import { useState, useEffect } from "react";
import Auth from "./Login/page";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { AnimationVariants } from '@/enums/AnimationVariants';
import PageQrCode from "./QRCode/page";

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [initialChats, setInitialChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (storedUser) {
          setCurrentUser(storedUser);
          const users = await getFakeUsers();
          const chats = await getFakeChats(storedUser.id);
          setInitialUsers(users);
          setInitialChats(chats);
        }
        setLoading(false);
      }
    };

    loadData();
  }, []); // A lista de dependências vazia garante que isso só será executado uma vez


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://jocil4350.c35.integrator.host/session/status/invest_wa_api', {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'x-api-key': 'invest_wa_api'
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const result = await response.json();
  //       console.log(result);
  //     } catch (err) {
  //       console.log('Error fetching data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!currentUser ? (
        <PageTransition variant={AnimationVariants.FadeIn}>
          <Auth />
        </PageTransition>
      ) :
        currentUser.id == '1' ? 
        <PageQrCode initialUser={currentUser}/> :
        (
          <PageTransition variant={AnimationVariants.FadeIn}>
            <Home initialUsers={initialUsers} initialChats={initialChats} />
          </PageTransition>
        )

      }
    </AnimatePresence>
  );
}
