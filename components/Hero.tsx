"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const slides = [
  { src: "/images/pexels-photo-869258.jpeg",    alt: "Kayaking in Anti-Atlas", title: "Canyoning" },
  { src: "/images/pexels-photo-2387418.jpeg",   alt: "Group adventure", title: "Biking" },
  { src: "/images/pexels-photo-2573568.jpeg",   alt: "Hiking through Morocco", title: "Hiking" },
  { src: "/images/pexels-photo-2582937.jpeg",   alt: "Outdoor expedition", title: "Climbing" },
  { src: "/images/pexels-photo-2666598.jpeg",   alt: "Adventure camp", title: "Bivouac" },
];

const MountainIcon = () => (
  <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21l-8-12-8 12M16 21l-4-6-4 6M12 21l-2-3-2 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 110 18 9 9 0 010-18z" opacity="0.2" />
  </svg>
);

const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // GSAP Refs
  const containerRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const ctaColRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slider Interval
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // GSAP Entry Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Massive Headline (Slide up + fade)
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
      )
      // 2. Right CTA column (Fade in + slight slide left)
      .fromTo(
        ctaColRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      // 3. Slider Container (Scale up + fade)
      .fromTo(
        sliderRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
        "-=0.9"
      )
      // 4. Staggered bottom stats
      .fromTo(
        statsRef.current?.children ? gsap.utils.toArray(statsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1"
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <>
      {/* ── Desktop Hero (1024px+) ── */}
      <section 
        ref={containerRef} 
        className="hidden lg:flex relative pt-32 pb-16 px-16 max-w-[1600px] mx-auto bg-bg flex-col justify-start min-h-0"
      >
        <div className="flex flex-row lg:items-end justify-between gap-10 mb-12">
          <h1 className="font-extrabold leading-[0.85] tracking-tight uppercase select-none lg:text-left">
            <span ref={headlineLine1Ref} className="block lg:text-[110px] xl:text-[130px] lg:text-fg">
              Outdoor
            </span>
            <span ref={headlineLine2Ref} className="block lg:text-[110px] xl:text-[130px] text-accent mt-4">
              Adventures
            </span>
          </h1>

          <div ref={ctaColRef} className="lg:w-1/3 flex flex-col items-end lg:text-right gap-6 pb-2">
            <p className="lg:text-fg-muted text-lg max-w-sm leading-relaxed font-medium lg:text-right">
              Your next adventure starts here.<br/>
              Experience the authentic beauty of Morocco's hidden gem in the heart of the Anti-Atlas.
            </p>
            <div className="flex flex-wrap lg:justify-end gap-4">
              <Link
                href="/activities"
                className="px-10 py-4 bg-accent hover:bg-accent-h text-white font-bold rounded-full text-lg transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
              >
                Start Now
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 border-2 lg:border-border hover:border-accent lg:text-fg hover:text-accent font-bold rounded-full text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div ref={sliderRef} className="relative w-full aspect-video max-h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl bg-border">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover hover:scale-105 transition-transform duration-[10s] ease-out"
                sizes="100vw"
              />
            </div>
          ))}

          {/* Slider Controls */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                    i === current ? "w-10 h-2.5 bg-white/20" : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                  }`}
                >
                  {i === current && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-white"
                      style={{ animation: `progressBar ${INTERVAL_MS}ms linear` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Stats */}
        <div ref={statsRef} className="grid grid-cols-4 gap-8 mt-24 border-t border-border pt-12">
          {[
            { l: "10+", s: "Years Exp." },
            { l: "500+", s: "Happy clients" },
            { l: "20+", s: "Destinations" },
            { l: "4.0K", s: "Max Altitude" },
          ].map((st, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-5xl font-black text-fg">{st.l}</span>
              <span className="text-fg-muted font-bold text-sm uppercase tracking-wider">{st.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile Hero (App Style) ── */}
      <section className="lg:hidden relative min-h-screen bg-bg flex flex-col">
        {/* Top Visual area */}
        <div className="relative h-[55vh] w-full overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image 
                src={slide.src} 
                alt={slide.alt} 
                fill 
                className="object-cover" 
                priority={i === 0}
              />
            </div>
          ))}
          {/* Top-to-Bottom Gradient Fades */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-bg" />
          
          {/* Centered Icon area */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
              <MountainIcon />
            </div>
          </div>

          {/* "Popular Destinations" Label + Row */}
          <div className="absolute bottom-12 left-0 right-0 z-20">
            <p className="px-6 text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center">
              Popular Adventures
            </p>
            <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar snap-x">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  onClick={() => setCurrent(i)}
                  className={`relative flex-none w-28 aspect-4/5 rounded-2xl overflow-hidden snap-start transition-all duration-500 ${
                    i === current ? "ring-2 ring-accent scale-105 shadow-xl" : "opacity-60 grayscale-[0.5]"
                  }`}
                >
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2 left-0 right-0 text-[10px] font-bold text-white uppercase text-center">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Content area */}
        <div className="flex-1 px-6 pt-8 pb-12 flex flex-col items-center justify-between text-center bg-bg relative -mt-4 rounded-t-4xl z-30">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-serif text-4xl sm:text-5xl text-fg leading-tight">
              Discover the Wild <br />
              <span className="text-accent italic">Beauty of Morocco</span>
            </h1>
            <p className="text-fg-muted text-sm max-w-xs leading-relaxed">
              Explore curated adventures, plan your perfect trip, and uncover the wonders of the Anti-Atlas in just one click.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3 mt-8">
            <Link
              href="/activities"
              className="w-full py-4 bg-fg text-bg font-bold rounded-2xl shadow-xl hover:scale-[0.98] transition-transform"
            >
              Explore Adventures
            </Link>
            <Link
              href="/contact"
              className="w-full py-4 border border-border text-fg font-bold rounded-2xl hover:bg-bg-alt transition-colors"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  );
}
