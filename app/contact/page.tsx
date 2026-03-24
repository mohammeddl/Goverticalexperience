"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      // 1. Left Column Animation (Slide in from left + fade)
      tl.fromTo(
        leftColRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1 }
      )
      // 2. Right Column Animation (Slide in from right + fade)
      .fromTo(
        rightColRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1 },
        "-=1"
      )
      // 3. Stagger children of left and right
      .fromTo(
        [
          ...(leftColRef.current?.querySelectorAll(".shadow-sm") || []),
          ...(rightColRef.current?.querySelectorAll("h1, p, .flex-col, .flex-row") || [])
        ],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main ref={containerRef} className="pt-32 pb-24 bg-bg min-h-screen text-fg flex items-center justify-center">
        
        <section className="px-6 w-full max-w-6xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            
            {/* ── Left Column (Image & Info Card) ── */}
            <div ref={leftColRef} className="w-full lg:w-[45%] flex flex-col gap-6">
              
              {/* Image Container */}
              <div className="relative w-full h-80 sm:h-96 md:h-[400px] lg:flex-1 rounded-4xl overflow-hidden bg-border/50 shadow-sm">
                <Image
                  src="/images/pexels-photo-2573568.jpeg"
                  alt="Hiker using phone in Anti-Atlas"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2s]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Contact Info Card */}
              <div className="bg-bg-alt border border-border rounded-4xl p-6 sm:p-8 flex flex-col gap-8 shadow-sm">
                
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 shrink-0 text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-fg text-sm lg:text-base">Email</span>
                    <a href="mailto:info@goverticalexperience.com" className="text-fg-muted text-sm mt-0.5 hover:text-accent transition-colors">
                      info@goverticalexperience.com
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 shrink-0 text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-fg text-sm lg:text-base">Phone</span>
                    <a href="tel:+212624429283" className="text-fg-muted text-sm mt-0.5 hover:text-accent transition-colors">
                      +212 624-429283
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 shrink-0 text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-fg text-sm lg:text-base">Location</span>
                    <span className="text-fg-muted text-sm mt-0.5">
                      Anti-Atlas Mountains, Morocco
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Right Column (Form Card) ── */}
            <div ref={rightColRef} className="w-full lg:w-[55%]">
              <div className="bg-bg-alt border border-border rounded-4xl p-8 md:p-12 shadow-sm h-full flex flex-col">
                
                <h1 className="text-3xl md:text-5xl font-black text-fg mb-4">
                  Get in touch
                </h1>
                <p className="text-fg-muted text-base mb-10 leading-relaxed font-medium">
                  Have questions about our activities? Want to book an adventure or need more information? We're here to help!
                </p>

                <form className="flex-1 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Name */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="name" className="text-sm font-bold text-fg">First name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3.5 text-fg placeholder-fg-muted/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="email" className="text-sm font-bold text-fg">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3.5 text-fg placeholder-fg-muted/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-sm"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Activity (Replacing Phone formatting from the reference to fit the business) */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="activity" className="text-sm font-bold text-fg">Interested In</label>
                    <select 
                      id="activity" 
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3.5 text-fg focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>Select an activity...</option>
                      <option value="hiking">Hiking & Trails</option>
                      <option value="canyoning">Canyoning</option>
                      <option value="climbing">Rock Climbing</option>
                      <option value="bivouac">Night Bivouac</option>
                      <option value="biking">Mountain Biking</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    <label htmlFor="message" className="text-sm font-bold text-fg">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full h-full min-h-[120px] bg-bg border border-border rounded-xl px-4 py-3.5 text-fg placeholder-fg-muted/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-sm resize-none"
                      placeholder="Leave us a message..."
                    ></textarea>
                  </div>

                  {/* Policy Checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="policy" 
                      className="w-4 h-4 rounded-md border-border text-accent focus:ring-accent accent-accent shrink-0 cursor-pointer"
                    />
                    <label htmlFor="policy" className="text-sm text-fg-muted cursor-pointer select-none">
                      I agree to the <a href="#" className="underline hover:text-accent transition-colors">privacy policy</a>.
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col gap-3 mt-4">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-accent text-white hover:bg-accent-h font-bold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
                    >
                      Send message
                    </button>
                    
                    <a 
                      href="https://wa.me/212624429283?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20adventure%20tours%20in%20the%20Anti-Atlas%20mountains."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center gap-2 py-3.5 bg-transparent border-2 border-[#128C7E]/40 hover:border-[#128C7E] text-[#128C7E] hover:bg-[#128C7E]/10 font-bold rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Message via WhatsApp
                  </a>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>

    </main>
    <Footer />
  </>
);
}
