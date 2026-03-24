"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const activities = [
  {
    id: "hiking",
    title: "Hiking & Trails",
    desc: "Discover the breathtaking landscapes of the Anti-Atlas through scenic trails that wind through ancient oasis routes, traditional Berber villages, and panoramic viewpoints. Experience the authentic beauty of Morocco's hidden gem with trails suitable for all levels of hikers.",
    duration: "Half-day to Multi-day",
    difficulty: "Beginner to Advanced",
    image: "/images/pexels-photo-2573568.jpeg",
  },
  {
    id: "canyoning",
    title: "Canyoning",
    desc: "Explore the dramatic gorges and natural pools of the Anti-Atlas mountains. Navigate through stunning waterfalls, swim in crystal-clear natural pools, and experience technical descents in some of Morocco's most spectacular canyons. An unforgettable adventure for thrill-seekers.",
    duration: "Half-day to Full-day",
    difficulty: "Intermediate to Advanced",
    image: "/images/pexels-photo-869258.jpeg",
  },
  {
    id: "climbing",
    title: "Rock Climbing",
    desc: "Challenge yourself on the natural granite walls and cliffs of the Anti-Atlas. With routes ranging from beginner-friendly climbs to advanced technical challenges, our climbing experiences offer stunning views and the thrill of conquering Morocco's finest rock faces.",
    duration: "Half-day to Multi-day",
    difficulty: "Beginner to Advanced",
    image: "/images/pexels-photo-2582937.jpeg",
  },
  {
    id: "bivouac",
    title: "Night Bivouac",
    desc: "Spend an unforgettable night under the stars in the heart of the Anti-Atlas. Choose between mountain bivouacs with panoramic views or traditional desert camps. Enjoy authentic Moroccan hospitality, traditional meals, and the magic of sleeping in nature.",
    duration: "Overnight",
    difficulty: "All Levels",
    image: "/images/pexels-photo-2666598.jpeg",
  },
  {
    id: "biking",
    title: "Mountain Biking",
    desc: "Ride through wild tracks and traditional paths on two wheels. Our mountain biking circuits take you through panoramic landscapes, Berber villages, and challenging terrain. Perfect for adventure cyclists looking to explore Morocco's rugged beauty.",
    duration: "Half-day to Multi-day",
    difficulty: "Intermediate to Advanced",
    image: "/images/pexels-photo-2387418.jpeg",
  },
];

export default function ActivitiesPage() {
  const headerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("h1 span"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
        );
        gsap.fromTo(
          headerRef.current.querySelector("p"),
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
        );
      }

      // Activity Items Animations
      itemsRef.current.forEach((item, idx) => {
        if (item) {
          const isEven = idx % 2 === 0;
          const imageSide = item.querySelector(".image-side");
          const textSide = item.querySelector(".text-side");

          gsap.fromTo(
            imageSide,
            { x: isEven ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            textSide,
            { x: isEven ? 50 : -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-bg min-h-screen">
        
        {/* ── Page Header ── */}
        <section ref={headerRef} className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto mb-20 md:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h1 className="font-extrabold leading-[0.85] tracking-tight uppercase select-none">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-fg">
                Our
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-accent mt-2 lg:mt-4">
                Activities
              </span>
            </h1>
            <div className="lg:w-1/3 flex flex-col items-start lg:items-end lg:text-right pb-2">
              <p className="text-fg-muted text-base md:text-xl max-w-sm leading-relaxed font-medium">
                Choose your adventure in the magnificent Anti-Atlas mountains.
              </p>
            </div>
          </div>
        </section>

        {/* ── Activities List ── */}
        <section className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto flex flex-col gap-24 md:gap-32">
          {activities.map((activity, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={activity.id} 
                ref={(el) => { itemsRef.current[idx] = el; }}
                className={`flex flex-col gap-10 md:gap-16 lg:gap-24 items-center ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-3/5 group image-side">
                  <div className="relative aspect-4/3 w-full rounded-4xl overflow-hidden shadow-2xl bg-border">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-2/5 flex flex-col items-start gap-6 text-side">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-black text-lg">
                      {idx + 1}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-fg uppercase leading-none">
                      {activity.title}
                    </h2>
                  </div>

                  <p className="text-fg-muted text-base md:text-lg leading-relaxed mb-4">
                    {activity.desc}
                  </p>

                  <div className="flex flex-col gap-4 w-full">
                    {/* Specs Card */}
                    <div className="bg-bg-alt border border-border rounded-2xl p-6 grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-fg-muted font-bold mb-1">Duration</span>
                        <span className="block text-fg font-bold text-sm">{activity.duration}</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-fg-muted font-bold mb-1">Difficulty</span>
                        <span className="block text-fg font-bold text-sm">{activity.difficulty}</span>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex justify-center items-center w-full px-8 py-4 bg-accent hover:bg-accent-h text-white font-bold rounded-2xl text-lg transition-all shadow-md hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 mt-2"
                    >
                      Contact to Book
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </main>
      <Footer />
    </>
  );
}
