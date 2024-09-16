"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function SavedProperties() {
  //get user bookmarks and display in savedproperties page
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      //get user bookmarks from bookmarks api route and save into properties to map over
      try {
        const response = await fetch("/api/bookmarks");
        const data = await response.json();
        setProperties(data.bookmarks);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch bookmarks");
        console.error("Error fetching bookmarks:", error);
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);



  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <h1 className="text-2xl mb-4 text-center">Saved Properties</h1>
          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (
              <p>No saved properties</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
