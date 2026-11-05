import { Banner } from "@/components/banner";
import { EventGallery } from "@/components/event-gallery";
import FeaturedEvents from "@/components/featured-events";
import { FooterBottom } from "@/components/footer-bottom";
import { FooterTop } from "@/components/footer-top";
import { KeyFeatures } from "@/components/key-features";
import { Navbar } from "@/components/navbar";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <KeyFeatures />
        <FeaturedEvents />
        <EventGallery />
        <Newsletter />
      </main>
    </>
  );
}
