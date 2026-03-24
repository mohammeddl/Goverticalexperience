import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
      </main>
      <Footer />
    </>
  );
}
