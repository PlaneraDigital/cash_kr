import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone, Tablet, Laptop, Monitor,
  Shield, Tag, Zap, Truck, ArrowRight,
  ChevronDown, Star, BadgeCheck
} from "lucide-react";
import phoneMockupImage from "../assets/image.png";

// ─── Icons (Play/App Store) ───────────────────────────────────────────────────

const PlayStoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L13.98,13.41L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L14.89,11.5L17.89,8.5L20.16,10.81M6.05,2.66L16.81,8.88L13.98,11.59L6.05,2.66Z" />
  </svg>
);

const AppStoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEVICE_CATEGORIES = [
  {
    icon: <Smartphone size={26} strokeWidth={1.8} />,
    label: "Mobile",
    sub: "iPhone, Android",
    desc: "Sell old mobile phone for instant cash",
    to: "/sell-old-mobile-phones/brand",
    color: "from-blue-50 to-indigo-50",
    iconBg: "bg-blue-50",
  },
  {
    icon: <Tablet size={26} strokeWidth={1.8} />,
    label: "Tablet",
    sub: "iPad, Android Tablet",
    desc: "Sell old tablet for instant cash",
    to: "/sell-tablet/brand",
    color: "from-purple-50 to-pink-50",
    iconBg: "bg-purple-50",
  },
  {
    icon: <Laptop size={26} strokeWidth={1.8} />,
    label: "Laptop",
    sub: "Instant Quote",
    desc: "Sell old laptop for instant cash",
    to: "/sell-old-laptops/brand",
    color: "from-sky-50 to-blue-50",
    iconBg: "bg-sky-50",
  },
  {
    icon: <Monitor size={26} strokeWidth={1.8} />,
    label: "Mac",
    sub: "iMac, Mac Mini",
    desc: "Sell old mac for instant cash",
    to: "/sell-imac/brand",
    color: "from-teal-50 to-emerald-50",
    iconBg: "bg-teal-50",
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Check Your Instant Device Price",
    desc: "Select your device and answer a few questions about its condition to receive an accurate price estimate in seconds.",
  },
  {
    num: "02",
    title: "Schedule Free Doorstep Pickup",
    desc: "Choose a convenient date and time for our team to collect your device safely from your doorstep.",
  },
  {
    num: "03",
    title: "Get Instant Payment After Verification",
    desc: "Receive immediate payment via UPI, bank transfer, or cash once your device is verified.",
  },
];

const TRUST_FEATURES = [
  { icon: <Shield size={22} strokeWidth={1.8} />, title: "Verified Pickup Professionals", desc: "Every pickup is handled by background-checked, trained professionals you can trust." },
  { icon: <Tag size={22} strokeWidth={1.8} />, title: "Transparent Device Pricing", desc: "Our smart algorithm gives you a fair, data-driven price with no hidden deductions." },
  { icon: <Zap size={22} strokeWidth={1.8} />, title: "Instant Payment After Verification", desc: "Get paid immediately via UPI, bank transfer, or cash right after device inspection." },
  { icon: <Truck size={22} strokeWidth={1.8} />, title: "Free Doorstep Pickup Across Cities", desc: "We come to you — no need to visit a store. Free pickup from 2,000+ cities in India." },
];

const REVIEWS = [
  { name: "Nitin Gowda", text: "Flawless experience. Instant credit. No haggling whatsoever — exactly what I expected.", stars: 5 },
  { name: "Vidyankit Official", text: "Sold my Realme GT Neo 2. Very smooth process, no negotiation unlike other platforms. Highly recommend!", stars: 5 },
  { name: "Jatin Mishra", text: "Sold my phone, nice company, smooth process. Pickup was on time and payment was instant.", stars: 5 },
  { name: "Disha Doshi", text: "Value for money and service is good. Got the exact price that was shown online.", stars: 5 },
  { name: "pawan mishra", text: "Excellent services! The pickup was too good and the security and checking purposes were professional.", stars: 5 },
  { name: "Mayank Doshi", text: "Very prompt service and got a very good price. Absolutely hassle-free. Highly recommended!", stars: 5 },
  { name: "Ritu Sharma", text: "Super easy process. Got a great price for my old Samsung. Will definitely use again!", stars: 5 },
  { name: "Aakash Mehta", text: "Loved the transparent pricing. No last minute deductions. Payment received in under 10 minutes.", stars: 5 },
  { name: "Priya Nair", text: "The pickup agent was very professional and courteous. Got ₹2,000 more than other platforms quoted.", stars: 5 },
];

const FAQS = [
  { q: "Is DeviceKart legit?", a: "Yes, DeviceKart is a legitimate and trusted platform for selling old electronics online in India with secure pickup and instant payment." },
  { q: "Where can I sell my old device online?", a: "You can sell your old device online through DeviceKart, which offers free doorstep pickup and instant cash payment across 2,000+ cities in India." },
  { q: "What is the best place to sell old devices easily?", a: "DeviceKart is one of the easiest and safest places to sell old devices online without visiting any shop." },
  { q: "How do I get the highest price for my old gadget?", a: "Select the correct device condition, check the instant online quote, and book a free doorstep pickup on DeviceKart for the best value." },
];

const GUARANTEES = [
  "Instant Cash at Free Pickup",
  "Transparent Pricing with No Hidden Cuts",
  "Verified & Professional Pickup Partners",
  "Free Doorstep Pickup Anywhere",
  "Factory-Grade Secure Data Wipe",
  "Genuine Official Invoice Provided",
];

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Noida", "Thane", "Navi Mumbai", "Goa", "Coimbatore", "Ghaziabad", "Howrah"];

// ─── Review Column ────────────────────────────────────────────────────────────

function ReviewColumn({ reviews, reverse = false }) {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(reverse ? -50 : 0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.02;
    let lastTime = null;
    let paused = false;
    const step = (timestamp) => {
      if (paused) { animationRef.current = requestAnimationFrame(step); return; }
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      if (reverse) {
        positionRef.current += speed * delta;
        if (positionRef.current >= 0) positionRef.current = -50;
      } else {
        positionRef.current -= speed * delta;
        if (positionRef.current <= -50) positionRef.current = 0;
      }
      track.style.transform = `translateY(${positionRef.current}%)`;
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
    const enter = () => { paused = true; };
    const leave = () => { paused = false; lastTime = null; };
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(animationRef.current);
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    };
  }, [reverse]);

  const doubled = [...reviews, ...reviews];
  return (
    <div className="relative overflow-hidden h-[480px]">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="will-change-transform">
        {doubled.map((r, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 mb-3 shadow-sm hover:border-[#0565E6]/30 hover:shadow-md transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#0565E6] text-white flex items-center justify-center text-sm font-bold shrink-0">
                {r.name[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{r.name}</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= r.stars ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={1.5} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-12 px-4">
      {tag && (
        <span className="inline-block bg-[#EEF4FF] text-[#0565E6] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0565E6]/20">
          {tag}
        </span>
      )}
      <h2 className="text-2xl sm:text-[2.25rem] font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 bg-gray-50 rounded-2xl mb-3 overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left bg-transparent border-none cursor-pointer gap-4 group"
      >
        <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#0565E6] transition-colors">{q}</span>
        <span className="text-[#0565E6] shrink-0">
          <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Phone Mockup Visual ─────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">

      {/* Glow blob */}
      <div className="absolute w-72 h-72 rounded-full bg-[#0565E6]/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* ── Phone 1 (front, green screen) ── */}
      <div
        className="relative z-10 w-[180px] rounded-[36px] overflow-hidden shadow-2xl shadow-[#0565E6]/20 border-[5px] border-gray-900 bg-gray-900"
        style={{ transform: "rotate(-6deg) translateX(-18px)" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="bg-[#0565E6] pt-7 pb-6 px-4 min-h-[270px]">
          {/* Status bar */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-bold text-white/80">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-white/60" />
              <div className="w-1 h-1.5 rounded-sm bg-white/60" />
            </div>
          </div>

          {/* Device label */}
          <div className="text-[10px] font-bold text-white/70 mb-1 uppercase tracking-widest">iPhone 13 Pro</div>

          {/* Price */}
          <div className="text-[32px] font-black text-white leading-none mb-1">₹38,400</div>
          <div className="flex items-center gap-1.5 mb-5">
            <BadgeCheck size={12} className="text-white" />
            <span className="text-[10px] font-semibold text-white/90">Best price guaranteed</span>
          </div>

          {/* Condition slots */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {["Excellent", "Good", "Fair", "Poor"].map(c => (
              <div key={c} className={`rounded-lg px-2 py-1.5 text-center text-[9px] font-bold ${c === "Good" ? "bg-white text-[#0565E6]" : "bg-white/20 text-white/80"}`}>
                {c}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-xl py-2.5 text-center">
            <span className="text-[11px] font-black text-[#0565E6]">Schedule Pickup →</span>
          </div>
        </div>

        {/* Home bar */}
        <div className="bg-gray-900 py-2 flex justify-center">
          <div className="w-16 h-1 rounded-full bg-white/30" />
        </div>
      </div>

      {/* ── Phone 2 (back, dark screen) ── */}
      <div
        className="relative z-20 w-[175px] rounded-[34px] overflow-hidden shadow-2xl shadow-gray-900/40 border-[5px] border-gray-800 bg-gray-900"
        style={{ transform: "rotate(5deg) translateX(22px) translateY(12px)" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 bg-gray-900 rounded-b-2xl z-20" />

        {/* Dark Screen */}
        <div className="bg-gray-900 pt-7 pb-6 px-4 min-h-[270px]">
          {/* Status bar */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-bold text-gray-400">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-gray-600" />
              <div className="w-1 h-1.5 rounded-sm bg-gray-600" />
            </div>
          </div>

          {/* Device label */}
          <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">MacBook Air M2</div>

          {/* Price */}
          <div className="text-[28px] font-black text-white leading-none mb-1">₹64,200</div>
          <div className="flex items-center gap-1.5 mb-5">
            <Zap size={11} className="text-[#0565E6]" fill="#0565E6" />
            <span className="text-[10px] font-semibold text-gray-400">Pickup in 30 mins</span>
          </div>

          {/* Slots */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {["512GB", "8GB RAM", "M2 Chip", "2022"].map(c => (
              <div key={c} className="rounded-lg px-2 py-1.5 text-center text-[9px] font-bold bg-gray-800 text-gray-300">
                {c}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#0565E6] rounded-xl py-2.5 text-center">
            <span className="text-[11px] font-black text-white">Confirm Sell →</span>
          </div>
        </div>

        {/* Home bar */}
        <div className="bg-gray-900 py-2 flex justify-center">
          <div className="w-14 h-1 rounded-full bg-gray-700" />
        </div>
      </div>

      {/* ── Floating badge: Payment confirmed ── */}
      <div
        className="absolute top-6 right-0 bg-white rounded-2xl shadow-xl px-3 py-2.5 flex items-center gap-2.5 border border-gray-100 z-30"
        style={{ transform: "rotate(2deg)" }}
      >
        <div className="w-7 h-7 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
          <BadgeCheck size={14} className="text-[#0565E6]" />
        </div>
        <div>
          <div className="text-[11px] font-black text-gray-900 leading-none">₹42,500 Paid</div>
          <div className="text-[9px] text-gray-400 mt-0.5">2 mins ago</div>
        </div>
      </div>

      {/* ── Floating badge: RBI Verified ── */}
      <div
        className="absolute bottom-10 left-2 bg-white rounded-2xl shadow-xl px-3 py-2.5 flex items-center gap-2 border border-gray-100 z-30"
        style={{ transform: "rotate(-3deg)" }}
      >
        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Shield size={12} className="text-[#0565E6]" />
        </div>
        <div>
          <div className="text-[11px] font-black text-gray-900 leading-none">RBI Verified</div>
          <div className="text-[9px] text-gray-400 mt-0.5">Safe payments</div>
        </div>
      </div>

    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="w-full">



      {/* ══════════════════════════════════════════════════════
          ── HERO SECTION ──
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-white to-white pt-10 sm:pt-16 pb-16 sm:pb-24 px-4">

        {/* Background decoration blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0565E6]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#0565E6]/5 blur-3xl" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">

          {/* ── Left Column ── */}
          <div className="relative z-10">

            {/* Top badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#0565E6]/20 rounded-full pl-2 pr-4 py-1.5 text-[11px] sm:text-xs font-bold text-[#0565E6] mb-6 shadow-sm shadow-[#0565E6]/10">
              <div className="w-5 h-5 rounded-full bg-[#0565E6] flex items-center justify-center">
                <BadgeCheck size={11} className="text-white" />
              </div>
              India's #1 Device Buyback Platform
            </div>

            {/* Main heading */}
            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.2rem] font-black text-gray-900 leading-[1.08] tracking-tight mb-5">
              India's Trusted Buyback<br />
              Platform to{" "}
              <span className="text-[#0565E6]">Sell Old Devices</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-[1.05rem] text-gray-500 leading-relaxed mb-8 max-w-[500px]">
              DeviceKart is India's premier online device buyback platform helping you sell old electronics with fair pricing, free doorstep pickup and instant payment.
            </p>

            {/* ── Category Cards Grid ── */}
            <div className="grid grid-cols-2 gap-2 mb-9 max-w-sm">
              {DEVICE_CATEGORIES.map((cat) => (
                <Link
                  to={cat.to}
                  key={cat.label}
                  className="group relative flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-3 hover:border-[#0565E6]/50 hover:shadow-lg hover:shadow-[#0565E6]/10 hover:-translate-y-0.5 transition-all duration-200 no-underline overflow-hidden"
                >
                  {/* Hover shine layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0565E6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                  {/* Icon */}
                  <div className={`relative w-11 h-11 sm:w-12 sm:h-12 ${cat.iconBg} rounded-xl flex items-center justify-center text-[#0565E6] group-hover:bg-[#0565E6] group-hover:text-white transition-all duration-200 shrink-0 shadow-sm`}>
                    {cat.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-black text-gray-900 leading-none mb-0.5 group-hover:text-[#0565E6] transition-colors duration-200">
                      {cat.label}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-gray-400 truncate">
                      {cat.sub}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="ml-auto text-gray-300 group-hover:text-[#0565E6] group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                  />
                </Link>
              ))}
            </div>

            {/* ── Avatar row + Stats ── */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">

              {/* Avatar cluster */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["A","P","N","V"].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                      style={{ background: ["#0565E6","#7c3aed","#0565E6","#d97706"][i] }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={11} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5} />
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">4.9/5 · 12,400+ verified reviews</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8">
                {[
                  { val: "4.8 ★", label: "Verified Rating" },
                  { val: "100Cr+", label: "Cash Paid" },
                  { val: "50K+", label: "Customers" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-lg sm:text-xl font-black text-[#0565E6]">{s.val}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mini stat pills row ── */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { icon: <Smartphone size={12} />, label: "50,000+ Devices Sold" },
                { icon: <Zap size={12} />, label: "Instant UPI Payment" },
                { icon: <Truck size={12} />, label: "Free Doorstep Pickup" },
                { icon: <Shield size={12} />, label: "100% Safe Data Wipe" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 text-[11px] font-semibold text-gray-600 shadow-sm"
                >
                  <span className="text-[#0565E6]">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Column: Phone Image (Desktop Only) ── */}
          <div className="hidden lg:flex relative h-[850px] w-full items-center justify-center">
            <img
              src={phoneMockupImage}
              alt="DeviceKart App"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>

        </div>
      </section>
      {/* ══════════════════════════════ END HERO ══════════════════════════════ */}


      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <SectionTitle
            tag="Simple Process"
            title="How DeviceKart Buyback Process Works"
            subtitle="No hassle, no bargaining — selling your old device online is simple. Instant pricing, secure pickups, and fast payments."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="bg-white rounded-[28px] p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 z-10">
                    <ArrowRight size={20} strokeWidth={2} className="text-[#0565E6]/30" />
                  </div>
                )}
                <div className="w-14 h-14 bg-[#0565E6] text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg shadow-[#0565E6]/30">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Trust Us ── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFF]">
        <div className="max-w-[1200px] mx-auto px-4">
          <SectionTitle
            tag="Why Choose Us"
            title="Why People Trust DeviceKart"
            subtitle="Built to make selling electronics simple, transparent, and secure — every single time."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRUST_FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex gap-5 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0565E6]/20 transition-all duration-200"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#EEF4FF] rounded-xl flex items-center justify-center text-[#0565E6] shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{f.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4">
          <SectionTitle
            tag="Customer Reviews"
            title="Real Feedback From Our Customers"
            subtitle="Thousands of users across India trust DeviceKart to convert their old phones into instant cash with free pickup."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ReviewColumn reviews={REVIEWS.slice(0, 3)} />
            <div className="hidden md:block">
              <ReviewColumn reviews={REVIEWS.slice(3, 6)} reverse />
            </div>
            <div className="hidden md:block">
              <ReviewColumn reviews={REVIEWS.slice(6, 9)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Cities & Guarantees ── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFF]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                Serving 2,000+ Cities Across India 🇮🇳
              </h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">Free doorstep pickup services across major cities in India. We're growing fast!</p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <Link
                    key={city}
                    to="/sell-old-mobile-phones/brand"
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs font-bold text-gray-600 hover:border-[#0565E6] hover:text-[#0565E6] hover:shadow-sm transition-all no-underline"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-gray-100 shadow-xl">
              <h3 className="text-xl font-black text-gray-900 mb-7">DeviceKart Guarantees</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GUARANTEES.map((g) => (
                  <div key={g} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 bg-[#F8FAFF] rounded-xl p-4 border border-[#0565E6]/10">
                    <div className="w-5 h-5 bg-[#0565E6] text-white rounded-full flex items-center justify-center text-[10px] shrink-0 font-black">✓</div>
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── FAQ Section ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[760px] mx-auto px-4">
          <SectionTitle
            tag="FAQs"
            title="Frequently Asked Questions"
            subtitle="Find clear answers to all your questions about device pricing, pickups, and secure payments."
          />
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}