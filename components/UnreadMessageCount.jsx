"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { useEffect } from "react";

export default function UnreadMessageCount({ session }) {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  useEffect(() => {
    if (!session) return;
    // Fetch unread message count from API

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("/api/messages/unread-count");
        const data = await response.json();
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadCount();
  }, [session]);
  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
}
