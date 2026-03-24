"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Intro Animation (Play immediately)
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
        );
      }

      // 2. Images ScrollTrigger
      if (imagesRef.current) {
        gsap.fromTo(
          imagesRef.current.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Our Story ScrollTrigger
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Stats ScrollTrigger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main ref={containerRef} className="pt-32 pb-32 bg-bg min-h-screen text-fg overflow-hidden border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          
          {/* ── Section 1: Intro Typography ── */}
          <section ref={introRef} className="mt-10 mb-16 lg:mb-24 flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
            <div className="lg:w-2/3">
              <span className="text-accent font-bold text-sm md:text-base uppercase tracking-wider mb-6 block">
                We are Go Vertical
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[100px] font-black leading-[1.05] tracking-tight text-fg">
                We set out to create<br/>
                <span className="text-fg-muted font-semibold mt-1 block">a better way to adventure</span>
              </h1>
            </div>
            <div className="lg:w-1/3 flex lg:justify-end pb-2">
              <p className="text-fg-muted font-medium text-lg lg:text-xl leading-relaxed max-w-sm">
                Together—the local guides and partners of Go Vertical—we are reinventing authentic outdoor experiences end-to-end.
              </p>
            </div>
          </section>

          {/* ── Section 2: Split Asymmetrical Images ── */}
          <section ref={imagesRef} className="mb-24 lg:mb-32 flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch pt-4">
            {/* Main large image */}
            <div className="relative w-full md:w-[65%] aspect-video md:aspect-auto md:min-h-[500px] lg:min-h-[600px] bg-border rounded-3xl md:rounded-[40px] md:rounded-br-[120px] overflow-hidden shadow-sm group">
              <Image
                src="/images/pexels-photo-2387418.jpeg"
                alt="Group of adventurers"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
            {/* Secondary companion image */}
            <div className="relative w-full md:w-[35%] aspect-[4/3] md:aspect-auto md:min-h-[500px] lg:min-h-[600px] bg-border rounded-3xl md:rounded-[40px] overflow-hidden shadow-sm group">
              <Image
                src="/images/pexels-photo-869258.jpeg"
                alt="Canyoning experience"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
          </section>

          {/* ── Section 3: Our Story ── */}
          <section className="mb-24 lg:mb-40">
            <div ref={storyRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
              
              <div className="md:col-span-5 flex items-start gap-4">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-black text-fg leading-none tracking-tight">
                  Our<br/>Story
                </h2>
                <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-fg mt-2" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                </svg>
              </div>

              <div className="md:col-span-7 flex flex-col gap-8 text-fg-muted font-medium text-lg md:text-xl leading-relaxed pt-2">
                <p>
                  Born and raised in the heart of the Anti-Atlas mountains, I have spent my entire life exploring these magnificent landscapes. What began as childhood adventures through mountain trails and hidden valleys has evolved into a passion for sharing these extraordinary places with visitors from around the world.
                </p>
                <p>
                  The Anti-Atlas is more than just mountains—it's a living tapestry of Berber culture, ancient traditions, and breathtaking natural beauty. Every trail has a story, every village holds centuries of heritage, and every sunset paints the rocks in colors that must be seen to be believed.
                </p>
                <p>
                  As a certified mountain guide with deep roots in this region, I combine professional expertise with intimate local knowledge to create authentic, safe, and unforgettable experiences. Whether you're seeking adrenaline-filled adventures or peaceful connection with nature, I'm here to guide you through the hidden treasures of my homeland.
                </p>
              </div>

            </div>
          </section>

          {/* ── Section 4: The Stats / Numbers ── */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
              
            <div className="md:col-span-5">
              <span className="text-accent font-bold text-sm md:text-base uppercase tracking-wider block sticky top-32">
                Numbers speak for us best of all
              </span>
            </div>

            <div ref={statsRef} className="md:col-span-7 flex flex-col">
              
              {/* Stat Row 1 */}
              <div className="grid grid-cols-[auto_1fr] items-center gap-8 md:gap-16 py-8 md:py-12 border-t-2 border-border group hover:border-accent transition-colors">
                <div className="text-5xl sm:text-6xl lg:text-[80px] font-black text-fg w-24 md:w-40 leading-none">
                  15<span className="text-accent">+</span>
                </div>
                <p className="text-fg-muted font-medium text-sm md:text-base leading-relaxed">
                  Over 15 years of combined guiding experience in the Anti-Atlas region, navigating complex trails, climbing routes, and hidden natural wonders.
                </p>
              </div>
              
              {/* Stat Row 2 */}
              <div className="grid grid-cols-[auto_1fr] items-center gap-8 md:gap-16 py-8 md:py-12 border-y-2 border-border group hover:border-accent transition-colors">
                <div className="text-5xl sm:text-6xl lg:text-[80px] font-black text-fg w-24 md:w-40 leading-none">
                   5<span className="text-accent">c</span>
                </div>
                <p className="text-fg-muted font-medium text-sm md:text-base leading-relaxed">
                  More than 500 adventurers guided safely through the Anti-Atlas mountains, leaving with unforgettable authentic Moroccan experiences.
                </p>
              </div>

              {/* Stat Row 3 */}
              <div className="grid grid-cols-[auto_1fr] items-center gap-8 md:gap-16 py-8 md:py-12 border-b-2 border-border group hover:border-accent transition-colors">
                <div className="text-5xl sm:text-6xl lg:text-[80px] font-black text-fg w-24 md:w-40 leading-none">
                  4k<span className="text-accent">m</span>
                </div>
                <p className="text-fg-muted font-medium text-sm md:text-base leading-relaxed">
                  Over 4,000 meters in peak altitudes conquered across our extensive trail networks. From deep gorges to the highest rocky summits.
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
