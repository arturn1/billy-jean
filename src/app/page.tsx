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
      ) : (
        <PageTransition variant={AnimationVariants.FadeIn}>
          <Home initialUsers={initialUsers} initialChats={initialChats} />
          </PageTransition>
      )}
    </AnimatePresence>
  );
}
