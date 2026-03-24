"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const programs = [
  {
    title: "Day Camps",
    desc: "Perfect for beginners and families. Explore the Anti-Atlas in a single unforgettable day.",
    href: "/activities",
    image: "/images/pexels-photo-2387418.jpeg",
    alt: "Day camp group",
  },
  {
    title: "Overnight Trips",
    desc: "Multi-day treks through ancient desert routes under a canopy of stars.",
    href: "/activities",
    image: "/images/pexels-photo-2573568.jpeg",
    alt: "Overnight hikers",
  },
  {
    title: "Custom Groups",
    desc: "Tailored expeditions for corporate teams, schools, and private groups.",
    href: "/activities",
    image: "/images/pexels-photo-2582937.jpeg",
    alt: "Custom group aerial",
  },
];

export default function Programs() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse", // play when visible, reverse when scrolling back up past it softly
          },
        }
      );

      // 2. Cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-bg-alt py-24 px-6 md:px-16 overflow-hidden">
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Our Programs
            </p>
            <h2 className="font-black text-fg text-4xl md:text-5xl uppercase leading-tight">
              Your best adventure<br />
              <span className="text-accent">YET</span>, starts here.
            </h2>
          </div>
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 text-fg hover:text-accent font-bold text-sm uppercase tracking-wider transition-colors"
          >
            View All Activities
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
        {programs.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group bg-bg border border-border rounded-2xl overflow-hidden hover:border-accent transition-all duration-300 shadow-sm"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-border">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Text */}
            <div className="p-6">
              <h3 className="font-black text-fg text-xl uppercase mb-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-fg-muted text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-wider">
                Learn more <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
