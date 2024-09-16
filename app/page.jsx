import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}
