import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/lib/utils";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";

export default async function PropertiesPage() {

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
}
