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
            <span ref={headlineLine1Ref} className="block lg:text-[100px] xl:text-[120px] lg:text-fg">
              Outdoor
            </span>
            <span className="block lg:text-5xl xl:text-6xl text-fg mt-4 normal-case font-medium">
              Adventures in the
            </span>
            <span ref={headlineLine2Ref} className="block lg:text-[100px] xl:text-[120px] text-accent mt-2">
              Anti-Atlas
            </span>
          </h1>

          <div ref={ctaColRef} className="lg:w-1/3 flex flex-col items-end lg:text-right gap-6 pb-2">
            <p className="lg:text-fg-muted text-lg max-w-sm leading-relaxed font-medium lg:text-right">
              Experience the authentic beauty of Morocco's hidden gem
            </p>
            <div className="flex flex-wrap lg:justify-end gap-4">
              <Link
                href="/activities"
                className="px-10 py-4 bg-accent hover:bg-accent-h text-white font-bold rounded-full text-lg transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
              >
                Explore Activities
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

      {/* ── Mobile Hero (Modern Editorial - Version 5) ── */}
      <section className="lg:hidden relative min-h-screen bg-bg flex flex-col pt-24 pb-12 transition-all duration-500">
        
        {/* Headline Section */}
        <div className="px-6 flex flex-col gap-2">
          <h1 className="text-[2.75rem] font-black text-fg leading-[1.1] tracking-[-0.03em]">
            Outdoor <br />
            Adventures <br />
            <span className="text-accent underline decoration-4 underline-offset-8">Anti-Atlas</span>
          </h1>
        </div>

        {/* Featured Image Card */}
        <div className="px-6 mt-10">
          <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              >
                <Image 
                  src={slide.src} 
                  alt={slide.alt} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  priority={i === 0}
                />
              </div>
            ))}
            {/* Corner Label */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Featured Expedition</span>
            </div>
            {/* Bottom Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col gap-2">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">Destination</span>
              <h2 className="text-white text-3xl font-bold">{slides[current].title}</h2>
            </div>
          </div>
        </div>

        {/* Description & Main Button */}
        <div className="px-6 mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-[280px]">
            <p className="text-fg-muted text-sm leading-relaxed font-medium">
              amidst the quietness of authentic <br /> 
              and spontaneous nature. Discover the <br /> 
              hidden gems of the Anti-Atlas.
            </p>
          </div>
          <Link
            href="/activities"
            className="inline-flex items-center gap-4 px-8 py-4 bg-fg text-bg rounded-full text-sm font-black uppercase tracking-widest hover:bg-fg-muted transition-colors w-fit"
          >
            Explore More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Horizontal Selection ("Our Products" style) */}
        <div className="mt-16">
          <div className="px-6 flex justify-between items-end mb-6">
            <h3 className="text-2xl font-black text-fg">Our Selection</h3>
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-accent rounded-full" />
              <div className="w-2 h-1 bg-border rounded-full" />
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar snap-x pb-4">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => setCurrent(i)}
                className="flex-none w-48 snap-start group"
              >
                <div className={`relative aspect-square w-full rounded-3xl overflow-hidden mb-4 transition-all duration-300 ${
                  i === current ? "ring-2 ring-accent" : "bg-bg-alt"
                }`}>
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Adventure</span>
                  <span className="text-sm font-bold text-fg group-hover:text-accent transition-colors">{slide.title}</span>
                  <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider mt-0.5">Starting from $199</span>
                </div>
              </button>
            ))}
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
