import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "About Us",    href: "/about" },
      { label: "Activities",  href: "/activities" },
      { label: "Gallery",     href: "/gallery" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Day Camps",      href: "/activities" },
      { label: "Overnight Trips",href: "/activities" },
      { label: "Custom Groups",  href: "/activities" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us",  href: "/contact" },
      { label: "Instagram",   href: "https://www.instagram.com/ali__elazizi?igsh=MXRyZWdsY3ZzdzFqag==" },
      { label: "Facebook",    href: "https://www.instagram.com/ali__elazizi?igsh=MXRyZWdsY3ZzdzFqag==" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      {/* Adventure Finder */}
      <div className="border-b border-border py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-2">Ready to explore?</p>
            <h2 className="font-black text-fg text-3xl md:text-4xl uppercase leading-tight">
              Find Your<br />
              <span className="text-accent">Vertical</span> Adventure
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select className="px-5 py-3 rounded-full bg-bg-alt border border-border text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer min-w-[180px]">
              <option value="">Select Activity ▾</option>
              <option>Rock Climbing</option>
              <option>Hiking</option>
              <option>Kayaking</option>
              <option>Camping</option>
            </select>
            <select className="px-5 py-3 rounded-full bg-bg-alt border border-border text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer min-w-[180px]">
              <option value="">Select Duration ▾</option>
              <option>Half Day</option>
              <option>Full Day</option>
              <option>Multi-Day</option>
            </select>
            <button className="px-8 py-3 rounded-full bg-accent hover:bg-accent-h text-white font-bold text-sm uppercase tracking-wider transition-colors duration-200">
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Links & copyright */}
      <div className="py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-black text-fg uppercase text-sm leading-none mb-1">Go Vertical</div>
            <div className="font-bold text-accent uppercase text-xs tracking-widest mb-4">Experience</div>
            <p className="text-fg-muted text-xs leading-relaxed max-w-[180px]">
              Authentic outdoor adventures in Morocco's Anti-Atlas mountains.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-black text-fg text-xs uppercase tracking-widest mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((lnk) => (
                  <li key={lnk.label}>
                    <Link href={lnk.href} className="text-fg-muted hover:text-accent text-sm transition-colors duration-200">
                      {lnk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-fg-muted text-xs">
            © {new Date().getFullYear()} Go Vertical Experience. All rights reserved.
          </p>
          <p className="text-fg-muted text-xs">Morocco · Anti-Atlas</p>
        </div>
      </div>
    </footer>
  );
}
