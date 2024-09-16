"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchProperty } from "@/lib/utils";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const fetchedProperty = await fetchProperty(id);
        setProperty(fetchedProperty);
      } catch {
        console.log("Error fetching property");
      } finally {
        setIsLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }

    if (!property && !isLoading) {
      return (
        <h1 className="text-center text-2xl font-bold mt-10">
          Property Not Found!
        </h1>
      );
    }
  }, [id, property, isLoading]);

  return (
    <>
      {isLoading && <Spinner loading={isLoading} />}
      {!isLoading && property ? (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />

                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      ) : (
        //Property not found if no property
        !property &&
        !isLoading && (
          <h1 className="text-center text-2xl font-bold mt-10">
            Property Not Found!
          </h1>
        )
      )}
    </>
  );
}
