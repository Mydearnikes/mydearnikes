
import ExploreMDN from "@/components/Homepage/ExploreMDN/ExploreMDN";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import LatestDropHero from "@/components/Homepage/latestDropHero/LatestDropHero";
import ShopByCategory from "@/components/Homepage/ShopByCategories/ShopByCategory";



// import SaleHero from "@/components/eventspecial/Sale";

export default function Home() {
  return (
    <div>
      <h1 className="text-sm font-bold font-mono">
        {/* <SaleHero/> */}

        <HeroSection />
        <LatestDropHero />
        <ShopByCategory/>
        <ExploreMDN/>

      </h1>
    </div>
  );
}
