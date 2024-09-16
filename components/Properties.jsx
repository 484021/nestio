"use client";
import PropertyCard from "./PropertyCard";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    try {
      const fetchProperties = async () => {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.totalProperties);

        setLoading(false);
      };
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  }, [page, pageSize]);

  properties.sort((a, b) => {
    new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handlePageChange = (page) => {
    setPage(page);
   
  };
  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onPageChange={handlePageChange}
              />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
      </div>
    </section>
  );
}
