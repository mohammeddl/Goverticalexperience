"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Sidebar Links Animation
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current.querySelectorAll("a"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }

      // 2. Title and Description Animation
      if (titleRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(
          titleRef.current.querySelectorAll("h1 span"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
        )
        .fromTo(
          titleRef.current.querySelector("p"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          titleRef.current.querySelector("a"),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1 },
          "-=0.6"
        );
      }

      // 3. Grid Images Animation
      if (gridRef.current) {
        const images = gsap.utils.toArray(gridRef.current.querySelectorAll(".overflow-hidden"));
        images.forEach((img: any) => {
          gsap.fromTo(
            img,
            { scale: 0.9, opacity: 0, y: 50 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // 4. Special Bottom Left Image
      const bottomLeftImg = containerRef.current?.querySelector(".col-span-1 > .relative.mt-auto .overflow-hidden");
      const bottomSvg = containerRef.current?.querySelector(".col-span-1 > .relative.mt-auto svg");
      if (bottomLeftImg) {
        gsap.fromTo(
          [bottomLeftImg, bottomSvg],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomLeftImg,
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
    <>
      <Header />
      <main ref={containerRef} className="pt-32 pb-24 bg-bg min-h-screen text-fg overflow-hidden">
        
        {/* Main layout container with sidebar and content */}
        <div className="max-w-[1600px] mx-auto flex">
          
          {/* ── Left Sidebar (Vertical Text) ── */}
          <aside ref={sidebarRef} className="hidden lg:flex flex-col justify-end w-24 pb-32 border-r border-border/50 shrink-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap flex gap-12 text-xs font-bold uppercase tracking-[0.2em] text-fg-muted">
              <Link href="https://www.instagram.com/ali__elazizi?igsh=MXRyZWdsY3ZzdzFqag==" className="hover:text-accent transition-colors">Instagram</Link>
              <Link href="https://www.instagram.com/ali__elazizi?igsh=MXRyZWdsY3ZzdzFqag==" className="hover:text-accent transition-colors">Facebook</Link>
              <Link href="https://www.instagram.com/ali__elazizi?igsh=MXRyZWdsY3ZzdzFqag==" className="hover:text-accent transition-colors">Youtube</Link>
            </div>
          </aside>

          {/* ── Main Gallery Content Grid ── */}
          <div className="flex-1 px-6 md:px-12 lg:px-16 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
              
              {/* Left Column (Title + Image 1) */}
              <div className="col-span-1 lg:col-span-5 flex flex-col pt-4">
                {/* Title Block */}
                <div ref={titleRef} className="mb-20">
                  <h1 className="font-extrabold leading-[0.85] tracking-tighter mb-8">
                    <span className="block text-6xl sm:text-7xl md:text-[90px] text-fg font-serif tracking-normal">
                      Our
                    </span>
                    <span className="block text-6xl sm:text-7xl md:text-[90px] text-accent font-serif tracking-normal mt-2">
                      Gallery.
                    </span>
                  </h1>
                  
                  <p className="text-fg-muted text-base md:text-lg leading-relaxed max-w-md font-medium mb-12">
                    Since discovering the hidden trails of the Anti-Atlas, we've 
                    captured countless moments of pure adventure. Our gallery showcases 
                    the raw beauty of Morocco's landscapes and the unbreakable spirit 
                    of our explorers.
                  </p>
                  
                  <Link href="/activities" className="group inline-flex items-center gap-6 text-sm font-bold uppercase tracking-[0.2em] text-fg hover:text-accent transition-colors">
                    <span>Discover More</span>
                    <span className="block w-16 h-px bg-fg group-hover:bg-accent group-hover:w-20 transition-all duration-300 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:border-t after:border-r after:border-current after:rotate-45" />
                  </Link>
                </div>

                {/* Bottom Left Image with abstract SVG overlay */}
                <div className="relative mt-auto">
                  {/* Abstract orange ring behind/over image */}
                  <svg className="absolute -left-12 -bottom-16 w-64 h-64 text-accent/80 z-10 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="100" cy="100" rx="90" ry="60" stroke="currentColor" strokeWidth="2" transform="rotate(-30 100 100)" />
                  </svg>
                  
                  <div className="relative aspect-4/5 w-[90%] md:w-[80%] overflow-hidden bg-border z-0">
                    <Image
                      src="/images/pexels-photo-2573568.jpeg"
                      alt="Hikers on a trail"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-[2s]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (Asymmetric Image Grid) */}
              <div ref={gridRef} className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Inner Left Column */}
                <div className="flex flex-col gap-6 lg:gap-8 xl:-mt-12">
                  {/* Tall vertical image */}
                  <div className="relative aspect-3/4 w-full overflow-hidden bg-border group">
                    <Image
                      src="/images/pexels-photo-2582937.jpeg"
                      alt="Rock climbing"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="font-medium text-sm">Anti-Atlas Peaks</span>
                      <span className="font-bold text-sm">2023</span>
                    </div>
                  </div>
                  
                  {/* Short horizontal underneath */}
                  <div className="relative aspect-video w-full overflow-hidden bg-border group">
                    <Image
                      src="/images/pexels-photo-2387418.jpeg"
                      alt="Mountain Biking"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Inner Right Column */}
                <div className="flex flex-col gap-6 lg:gap-8">
                  {/* Medium horizontal top */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-border group">
                    <Image
                      src="/images/pexels-photo-869258.jpeg"
                      alt="Canyoning"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                  
                  {/* Very tall vertical bottom */}
                  <div className="relative aspect-2/3 w-full overflow-hidden bg-border group xl:mt-4">
                    <Image
                      src="/images/pexels-photo-2666598.jpeg"
                      alt="Night Bivouac"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
