"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Message({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const res = await fetch(`/api/messages/${message._id}`, {
      method: "PUT",
    });
    if (res.status === 200) {
      const { read } = await res.json();
      setIsRead(read);
      setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
      if (read) {
        toast.success("Message marked as read");
      } else {
        toast.success("Message marked as unread");
      }
    } else {
      console.log(error);

      toast.error("Failed to mark message as read");
    }
  };
  const handleDeleteMessage = async () => {
    const res = await fetch(`/api/messages/${message._id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      setIsDeleted(true);
      setUnreadCount((prev) => prev - 1);
      toast.success("Message deleted");
    } else {
      console.log(error);

      toast.error("Failed to delete message");
    }
  };
  console.log(message);

  if (isDeleted) return null;
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {
        /* if not read */
        !isRead && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-lime-500 rounded-md text-white">
            New!
          </div>
        )
      }
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-500" : "bg-blue-500 text-white"
        }   py-1 px-3 rounded-md`}
        onClick={handleReadClick}
      >
        {isRead ? "Mark as Unread" : "Mark as Read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDeleteMessage}
      >
        Delete
      </button>
    </div>
  );
}
