"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function BookmarkButton({ property }) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const propertyId = property._id;
  console.log(isBookmarked);
  const [loading, setLoading] = useState(true);

  //Check if property is bookmarked send post request
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmark = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, propertyId }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmark();
  }, [propertyId, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please login to bookmark the property");
      return;
    }
    //handle bookmark logic here
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, propertyId }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Error bookmarking property");
      return;
    }
  };
  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="mr-2" /> ...Loading
      </button>
    );
  }
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
}
