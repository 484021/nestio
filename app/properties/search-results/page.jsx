"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { FaArrowAltCircleLeft, FaSadCry } from "react-icons/fa";
import Link from "next/link";
import PropertySearchForm from "@/components/PropertySearchForm";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(
        `/api/properties/search-results?location=${location}&propertyType=${propertyType}`
      );
      const data = await res.json();
      if (!data.length) return setLoading(false);
      setProperties(data);
      setLoading(false);
    };
    fetchResults();
  }, [location, propertyType]);
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px8">
          <PropertySearchForm />
        </div>
      </section>

      {loading ? (
        <Spinner loading={loading} />
      ) : properties.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen ">
          <h1 className="text-center my-7 text-2xl font-bold hover:underline">
            No properties found in{" "}
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <Link
            href="/properties"
            className="text-blue-500 flex gap-2 items-center mb-5"
          >
            <FaArrowAltCircleLeft />
            Back to properties
          </Link>
          <FaSadCry className="text-gray-600 mx-auto text-5xl mt-7 font-bold" />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
          <h1 className="text-center mt-7 text-2xl font-bold">
            Properties in {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <Link
            href="/properties"
            className="text-blue-500 flex gap-2 items-center mb-5"
          >
            <FaArrowAltCircleLeft />
            Back to properties
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
