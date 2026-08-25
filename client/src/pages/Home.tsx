/*
 * Atelier Beauty / Quiet Luxury Editorial
 * This page uses warm paper surfaces, cacao ink, antique brass micro-labels,
 * offset editorial layouts, and calm concierge-like interactions.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

type Service = {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  preparation: string;
};

const img = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

const uploaded = {
  partyMakeup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/DRjzQLEGaBOygXxZ.png",
  bridalGallery: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/xoxMiwTGsMoVcTmJ.png",
  pedicure: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/DRzUunxVyOzffgjl.png",
  balayage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/JcBfcLfEGBImihPH.png",
  bridalPackage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/qyLeNJswirZWSIlb.png",
  threading: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/sGasjhhkcoaHvozI.png",
  waxing: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/HGuKbtEbXRkCxMbM.png",
  signatureFacial: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/SLbvCfRvlvKDKqbX.png",
  bridalMakeup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/nvQQoSujhlBuImkq.png",
  bridalPortrait: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/JqAlJCmflyNLppWt.png",
  colorStudy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/IShukhFOvXlwcVAD.png",
  blondePortrait: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/ZdIUhDaNPfXwAcrX.png",
  eyeDesign: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/mGAMbSeKXPpDRpWm.png",
  keratin: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/kTBJJRhywGiHMAIs.png",
  headMassage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/UmWDTcJzIFclbnpz.png",
  skinCleanup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/zHbXKZTcoRHDCmQE.png",
  browLamination: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/oVrvBNZZnAPkaxUl.png",
  lashes: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/mshTLAEdfVnfeSRU.webp",
  treatmentRoom: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/GIJsNBhOhbYZVWpP.png",
  eyeCloseup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/CTsCyUKinLwAwZfh.png",
  haircut: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/bjanjxiDFDfIGMXQ.png",
  manicure: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/eWPYAoJrPiiowMTr.png",
  nailArt: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/FExyjiusWGacNlBf.png",
  colorHair: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/yJQRBfUtgWFOHQDw.png",
  hairPortrait: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/iIMVCpNeamQHayqi.png",
  bridalHair: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/ttcAkcumBHKlxzzI.png",
  hairFinish: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/rtrznINURLiXiuRj.png",
  hairSpa: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/KLjKkFqwflacDFWC.png",
  hydra: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/SSbnGkmbTttwWybK.png",
  expertMakeup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/QWAZOWBKygACLwAu.png",
  expertInAction: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/KCHAFSmmcOpcHyIW.png",
  expertStylist: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/DABSBwnUHEKuFLBH.png",
  withoutMakeup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/UoeXgqSlyRvoxXif.png",
  withMakeup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/MFFhaqXmjxxdNvgh.png",
  heroPortrait: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663909008811/JbVoxvfogvCumNCM.png",
};

const services: Service[] = [
  { id: "haircut", category: "Hair", title: "Haircut & Styling", description: "Precision cuts and personalized styling designed around your features and lifestyle.", duration: "45–60 min", price: "From $68", image: uploaded.haircut, benefits: ["Face-framing consultation", "Signature finish", "At-home styling notes"], preparation: "Arrive with clean, detangled hair if possible." },
  { id: "color", category: "Hair", title: "Hair Coloring", description: "Professional color treatments with customized tones and a polished finish.", duration: "2–3 hrs", price: "From $165", image: uploaded.colorHair, benefits: ["Tone mapping", "Bond-protect treatment", "Gloss finish"], preparation: "Bring reference images and avoid washing for 24 hours." },
  { id: "balayage", category: "Hair", title: "Balayage & Highlights", description: "Soft, natural-looking dimension with seamless color transitions.", duration: "3–4 hrs", price: "From $220", image: uploaded.balayage, benefits: ["Custom placement", "Soft grow-out", "Toning gloss"], preparation: "A short consultation helps us map your ideal lightness." },
  { id: "hair-spa", category: "Hair", title: "Hair Spa & Treatment", description: "Deep-conditioning and restorative care for softer, healthier-looking hair.", duration: "60 min", price: "From $95", image: uploaded.hairSpa, benefits: ["Scalp massage", "Repair mask", "Silk finish"], preparation: "No special preparation required." },
  { id: "keratin", category: "Hair", title: "Keratin / Smoothening", description: "A smoothing ritual that softens frizz and leaves hair touchable and refined.", duration: "3–4 hrs", price: "From $240", image: uploaded.keratin, benefits: ["Texture consultation", "Bond care", "Finishing blowout"], preparation: "Avoid tying hair back for 48 hours after the service." },
  { id: "signature-facial", category: "Skin", title: "Signature Facial", description: "A considered reset for skin that looks rested, luminous and cared for.", duration: "75 min", price: "From $125", image: uploaded.signatureFacial, benefits: ["Double cleanse", "Custom mask", "Neck and shoulder massage"], preparation: "Pause active exfoliants 48 hours before your visit." },
  { id: "hydra-facial", category: "Skin", title: "Hydra Facial", description: "A cushion-soft infusion of moisture for skin that feels supple and refreshed.", duration: "75 min", price: "From $145", image: uploaded.hydra, benefits: ["Hydration mapping", "Gentle infusion", "Cooling finish"], preparation: "Avoid a new skincare product in the 24 hours before." },
  { id: "cleanup-detox", category: "Skin", title: "Skin Cleanup & De-Tan", description: "Purifying care that clears the surface while keeping the skin feeling calm.", duration: "60 min", price: "From $98", image: uploaded.skinCleanup, benefits: ["Gentle cleanse", "Balancing mask", "Brightening care"], preparation: "Please arrive without makeup if convenient." },
  { id: "party-makeup", category: "Makeup", title: "Party Makeup", description: "A confident evening look with softly sculpted definition and lasting comfort.", duration: "90 min", price: "From $145", image: uploaded.partyMakeup, benefits: ["Long-wear base", "Eye design", "Lip pairing"], preparation: "Bring your outfit colors or a reference look if you have one." },
  { id: "bridal-makeup", category: "Bridal", title: "Bridal Makeup", description: "Bridal beauty created around you, your dress, your rituals and your day.", duration: "2 hrs", price: "From $260", image: uploaded.bridalMakeup, benefits: ["Design consultation", "Trial available", "Touch-up guidance"], preparation: "A consultation is recommended before reserving your date." },
  { id: "manicure", category: "Nails", title: "Manicure", description: "Thoughtful shaping, cuticle care and a polished finish in your chosen tone.", duration: "45 min", price: "From $48", image: uploaded.manicure, benefits: ["Shape consultation", "Cuticle care", "Polish finish"], preparation: "Please remove existing gel if you need a new shape." },
  { id: "pedicure", category: "Nails", title: "Pedicure", description: "A restorative foot ritual with softening care, massage and a clean finish.", duration: "60 min", price: "From $78", image: uploaded.pedicure, benefits: ["Soak and exfoliation", "Foot massage", "Polish finish"], preparation: "Open-toe shoes make the finish easier to protect." },
  { id: "nail-extensions", category: "Nails", title: "Nail Extensions & Nail Art", description: "Personalized length, shape and expressive detail designed to feel like you.", duration: "90 min", price: "From $120", image: uploaded.nailArt, benefits: ["Shape mapping", "Hand-painted detail", "Protective top coat"], preparation: "Send references ahead so we can prepare the right palette." },
  { id: "waxing", category: "Spa", title: "Full Body Waxing", description: "Professional waxing with a careful pace and a smooth, comfortable finish.", duration: "90 min", price: "From $135", image: uploaded.waxing, benefits: ["Skin consultation", "Soothing aftercare", "Private treatment room"], preparation: "Allow hair to grow for 2–3 weeks before your appointment." },
  { id: "threading", category: "Spa", title: "Eyebrow & Face Threading", description: "Precise, beautifully natural shaping for brows and facial details.", duration: "30 min", price: "From $32", image: uploaded.threading, benefits: ["Shape mapping", "Cooling finish", "Natural definition"], preparation: "Avoid strong exfoliants around the brow area before your visit." },
  { id: "lashes", category: "Spa", title: "Eyelash Extensions", description: "Lightweight, tailored lash design that opens the eyes without feeling overdone.", duration: "2 hrs", price: "From $180", image: uploaded.lashes, benefits: ["Style consultation", "Comfort-first placement", "Aftercare guide"], preparation: "Arrive without eye makeup and avoid oils around the eyes." },
  { id: "brow-lamination", category: "Spa", title: "Brow Lamination", description: "Softly lifted, brushed-up brows with a clean and lasting shape.", duration: "45 min", price: "From $75", image: uploaded.browLamination, benefits: ["Shape mapping", "Nourishing treatment", "Tint option"], preparation: "Pause retinol and exfoliants around the brows for 48 hours." },
  { id: "body-scrub", category: "Spa", title: "Body Scrub & Polish", description: "A smoothing body ritual that leaves skin renewed, soft and quietly luminous.", duration: "75 min", price: "From $128", image: uploaded.treatmentRoom, benefits: ["Full-body exfoliation", "Hydrating polish", "Warm towel ritual"], preparation: "Wear comfortable clothing and avoid shaving the day before." },
  { id: "relaxation-massage", category: "Spa", title: "Relaxation / Head Massage", description: "Slow, grounding bodywork to help the day soften around you.", duration: "60 min", price: "From $115", image: uploaded.headMassage, benefits: ["Aromatherapy option", "Custom pressure", "Quiet room"], preparation: "Arrive 10 minutes early to settle in." },
  { id: "bridal-package", category: "Bridal", title: "Complete Bridal Package", description: "A calm, unhurried beauty plan for the most photographed morning of your life.", duration: "4–5 hrs", price: "From $520", image: uploaded.bridalPackage, benefits: ["Hair and makeup", "Trial consultation", "Touch-up kit"], preparation: "Reserve early so we can shape the morning around your schedule." },
];

const gallery = [
  { src: uploaded.treatmentRoom, label: "The studio", tall: true },
  { src: uploaded.bridalGallery, label: "Bridal detail" },
  { src: uploaded.colorStudy, label: "Color study", tall: true },
  { src: uploaded.blondePortrait, label: "Soft dimension" },
  { src: uploaded.eyeDesign, label: "Eyes, refined", tall: true },
  { src: uploaded.eyeCloseup, label: "Light catching" },
  { src: uploaded.hairPortrait, label: "The cut", tall: true },
  { src: uploaded.bridalHair, label: "Bridal hair" },
  { src: uploaded.hairFinish, label: "The finish", tall: true },
  { src: uploaded.bridalPortrait, label: "The bridal portrait" },
  { src: uploaded.partyMakeup, label: "Party makeup" },
  { src: uploaded.nailArt, label: "Nail detail", tall: true },
  { src: uploaded.pedicure, label: "Pedicure ritual" },
  { src: uploaded.waxing, label: "Treatment room" },
  { src: uploaded.threading, label: "Precision threading", tall: true },
  { src: uploaded.lashes, label: "Lash artistry" },
  { src: uploaded.browLamination, label: "Brow detail" },
  { src: uploaded.treatmentRoom, label: "The quiet room" },
  { src: uploaded.headMassage, label: "Head massage" },
  { src: uploaded.keratin, label: "Smoothing ritual" },
  { src: uploaded.hydra, label: "Hydra glow", tall: true },
  { src: uploaded.bridalPackage, label: "Bridal morning" },
  { src: uploaded.headMassage, label: "The ritual" },
];

const categories = ["All", "Hair", "Skin", "Makeup", "Bridal", "Nails", "Spa"];
const navItems = ["About", "Services", "Gallery", "Bridal", "Our Team", "Contact"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [beforePosition, setBeforePosition] = useState(54);
  const [submitted, setSubmitted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredServices = useMemo(() => selectedCategory === "All" ? services : services.filter((service) => service.category === selectedCategory), [selectedCategory]);
  const lightboxItem = lightboxIndex === null ? null : gallery[lightboxIndex];
  const featuredServices = services.filter((service) => service.category === "Hair").slice(0, 3);
  const skinServices = services.filter((service) => service.category === "Skin").slice(0, 3);
  const makeupServices = services.filter((service) => service.category === "Makeup").slice(0, 3);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBooking = (service?: Service) => {
    if (service) setSelectedService(service);
    scrollTo("booking");
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${mobileOpen ? "is-menu-open" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollTo("home")} aria-label="Atelier Beauty home"><span className="brand-symbol" aria-hidden="true">A</span><span>ATELIER<br /><em>BEAUTY</em></span></button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => scrollTo("home")}>Home</button>
          {navItems.map((item) => <button key={item} onClick={() => scrollTo(item === "Our Team" ? "team" : item.toLowerCase())}>{item}</button>)}
        </nav>
        <button className="header-cta" onClick={() => openBooking()}>Book appointment <ArrowUpRight size={15} /></button>
        <button className="menu-trigger" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav-inner"><span className="eyebrow">Atelier Beauty · New York</span><div className="mobile-links"><button onClick={() => scrollTo("home")}>Home</button>{navItems.map((item, index) => <button key={item} style={{ "--i": index } as React.CSSProperties} onClick={() => scrollTo(item === "Our Team" ? "team" : item.toLowerCase())}>{item}</button>)}</div><button className="button button-dark" onClick={() => openBooking()}>Book an appointment <ArrowUpRight size={16} /></button></div>
      </div>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy"><Reveal><span className="eyebrow">A considered beauty studio · Est. 2014</span></Reveal><Reveal delay={80}><h1>Beauty,<br /><i>refined.</i></h1></Reveal><Reveal delay={160}><p>Where expert care, modern beauty and timeless elegance come together.</p></Reveal><Reveal delay={230}><div className="hero-actions"><button className="button button-light" onClick={() => openBooking()}>Book an appointment <ArrowUpRight size={16} /></button><button className="text-link light-link" onClick={() => scrollTo("services")}>Explore services <ArrowRight size={16} /></button></div></Reveal></div>
          <div className="hero-visual"><img src={uploaded.heroPortrait} alt="Uploaded beauty portrait with a refined bob haircut and luminous makeup" /></div>
        </section>

        <section id="about" className="intro-section section-pad">
          <div className="container intro-grid"><Reveal className="intro-image-wrap"><img src={uploaded.hairPortrait} alt="Uploaded Atelier Beauty expert portrait with softly styled hair" /><span className="image-caption">The Atelier · No. 01</span></Reveal><Reveal className="intro-copy" delay={100}><span className="eyebrow">The art of beauty</span><h2>Where every<br /><i>detail matters.</i></h2><p>Atelier Beauty is a warm, quietly confident space for expert hair, skin, makeup and bridal artistry. We take the time to understand what makes you feel like yourself — then refine every detail around it.</p><p>Come for the result. Stay for the ritual.</p><button className="text-link" onClick={() => scrollTo("team")}>Discover our story <ArrowRight size={16} /></button><div className="stat-row"><div><strong>10<span>+</span></strong><small>Years<br />experience</small></div><div><strong>5k<span>+</span></strong><small>Clients<br />cared for</small></div><div><strong>20<span>+</span></strong><small>Beauty<br />rituals</small></div></div></Reveal></div>
        </section>

        <section id="services" className="services-overview section-pad section-cream">
          <div className="container"><div className="section-heading split-heading"><Reveal><span className="eyebrow">02 / The menu</span><h2>Our <i>services</i></h2></Reveal><Reveal delay={100}><p>Everything you need to look, feel and glow your absolute best — thoughtfully edited, beautifully delivered.</p></Reveal></div><Reveal className="category-rail" delay={160}>{categories.slice(1).map((category, index) => <button key={category} onClick={() => { setSelectedCategory(category); scrollTo(`${category.toLowerCase()}-studio`); }}><span>0{index + 1}</span>{category}<ArrowUpRight size={14} /></button>)}</Reveal></div>
        </section>

        <ServiceSection id="hair-studio" number="03" eyebrow="Hair studio" title={<>The shape of<br /><i>confidence.</i></>} intro="Cuts, color and finish work designed around the way you move through the world." anchorImage={img("photo-1522337360788-8b13dee7a37e")} services={featuredServices} onDetails={setSelectedService} onBook={openBooking} />
        <ServiceSection id="skin-studio" number="04" eyebrow="Skin & facial studio" title={<>A softer kind<br /><i>of glow.</i></>} intro="Modern skin care with a calm, considered approach to your natural radiance." anchorImage={uploaded.signatureFacial} services={skinServices} reverse onDetails={setSelectedService} onBook={openBooking} />
        <ServiceSection id="makeup-studio" number="05" eyebrow="Makeup studio" title={<>Make an<br /><i>entrance.</i></>} intro="Artistry that meets you where you are — from soft definition to full celebration." anchorImage={uploaded.partyMakeup} services={makeupServices} onDetails={setSelectedService} onBook={openBooking} />

        <section id="bridal" className="bridal-section">
          <div className="bridal-image"><img src={uploaded.bridalPackage} alt="Uploaded bridal beauty portrait for Atelier Beauty" /></div><div className="bridal-overlay" /><div className="container bridal-content"><Reveal><span className="eyebrow light-eyebrow">06 / The bridal atelier</span><h2>Your most<br /><i>beautiful day.</i></h2><p>Bridal beauty created around you — with a calm plan, a skilled hand, and room for the little moments.</p><button className="button button-light" onClick={() => openBooking(services.find((s) => s.id === "bridal-package"))}>Schedule bridal consultation <ArrowUpRight size={16} /></button></Reveal></div><div className="bridal-stamp">Atelier<br />Bridal</div>
        </section>
        <section className="bridal-services section-pad"><div className="container bridal-service-grid">{services.filter((service) => service.category === "Bridal").map((service, index) => <Reveal key={service.id} delay={index * 70}><button className="bridal-service" onClick={() => setSelectedService(service)}><span className="service-index">0{index + 1}</span><span><strong>{service.title}</strong><small>{service.duration} · {service.price}</small></span><ArrowUpRight size={18} /></button></Reveal>)}</div></section>

        <section id="nails-studio" className="nails-section section-pad section-blush"><div className="container nails-grid"><Reveal className="nails-copy"><span className="eyebrow">07 / Nails & hands</span><h2>Small details.<br /><i>Lasting impression.</i></h2><p>Clean shaping, beautiful color and expressive details — finished with the same care as every Atelier ritual.</p><button className="text-link" onClick={() => { setSelectedCategory("Nails"); scrollTo("menu"); }}>See nail services <ArrowRight size={16} /></button></Reveal><div className="nail-feature"><Reveal><img src={img("photo-1512496015851-a90fb38ba796")} alt="Minimal neutral manicure close-up" /><span className="image-caption">The finishing touch</span></Reveal><Reveal className="nail-mini" delay={120}><img src={img("photo-1525507119028-ed4c629a60a3")} alt="Glossy gel nail detail" /></Reveal></div></div></section>

        <section id="spa-studio" className="spa-section"><img src={uploaded.headMassage} alt="Uploaded relaxation and head massage ritual" /><div className="spa-overlay" /><div className="container spa-content"><Reveal><span className="eyebrow light-eyebrow">08 / Spa & relaxation</span><h2>Let the day<br /><i>soften around you.</i></h2><p>Slow, grounding rituals for the moments when beauty means taking a breath.</p><button className="button button-light" onClick={() => { setSelectedCategory("Spa"); scrollTo("menu"); }}>Explore spa rituals <ArrowUpRight size={16} /></button></Reveal></div></section>

        <section id="menu" className="menu-section section-pad"><div className="container"><div className="section-heading menu-heading"><Reveal><span className="eyebrow">The complete menu</span><h2>Choose your<br /><i>ritual.</i></h2></Reveal><Reveal delay={100}><p>Starting prices are a guide. Every appointment begins with a thoughtful consultation.</p></Reveal></div><Reveal className="menu-tabs" delay={160}>{categories.map((category) => <button className={selectedCategory === category ? "active" : ""} key={category} onClick={() => setSelectedCategory(category)}>{category}</button>)}</Reveal><div className="menu-list">{filteredServices.map((service, index) => <Reveal key={service.id} delay={Math.min(index, 5) * 35}><div className="menu-row"><span className="menu-number">{String(index + 1).padStart(2, "0")}</span><div className="menu-service-name"><strong>{service.title}</strong><small>{service.category}</small></div><span className="menu-duration"><Clock3 size={14} /> {service.duration}</span><span className="menu-price">{service.price}</span><button className="menu-book" onClick={() => openBooking(service)}>Book <ArrowUpRight size={14} /></button></div></Reveal>)}</div></div></section>

        <section className="why-section section-pad"><div className="why-image"><img src={uploaded.hairSpa} alt="Uploaded hair spa treatment in the Atelier" /></div><div className="why-overlay" /><div className="container why-content"><Reveal><span className="eyebrow light-eyebrow">The Atelier difference</span><h2>Care you can<br /><i>feel.</i></h2></Reveal><div className="why-list">{["Experienced professionals", "Premium products", "Personalized care", "Relaxing environment"].map((item, index) => <Reveal key={item} delay={index * 70}><div className="why-item"><span>0{index + 1}</span><div><strong>{item}</strong><p>{["Artists who listen first, then make their mark.", "Thoughtful formulas selected for beautiful results.", "No two appointments are designed exactly alike.", "A studio pace that leaves room to exhale."][index]}</p></div><Sparkles size={16} /></div></Reveal>)}</div></div></section>

        <section className="transformation-section section-pad section-cream"><div className="container"><div className="section-heading split-heading"><Reveal><span className="eyebrow">A little perspective</span><h2>Before &<br /><i>after.</i></h2></Reveal><Reveal delay={100}><p>See the difference a considered approach can make. Drag the line to explore the transformation.</p></Reveal></div><Reveal className="comparison" delay={160}><div className="comparison-after"><img src={uploaded.withMakeup} alt="After: bridal makeup beauty look" /></div><div className="comparison-before" style={{ clipPath: `inset(0 ${100 - beforePosition}% 0 0)` }}><img src={uploaded.withoutMakeup} alt="Before: natural beauty look without makeup" /></div><div className="comparison-line" style={{ left: `${beforePosition}%` }}><span><ChevronLeft size={13} /><ChevronRight size={13} /></span></div><input className="comparison-range" type="range" min="10" max="90" value={beforePosition} onChange={(event) => setBeforePosition(Number(event.target.value))} aria-label="Before and after comparison slider" /><div className="comparison-labels"><span>Before</span><span>After</span></div></Reveal></div></section>

        <section id="gallery" className="gallery-section section-pad"><div className="container"><div className="section-heading split-heading"><Reveal><span className="eyebrow">The beauty journal</span><h2>Seen at<br /><i>the atelier.</i></h2></Reveal><Reveal delay={100}><p>A glimpse into the hands, faces, rituals and details that make the studio feel like ours.</p></Reveal></div><div className="gallery-masonry">{gallery.map((item, index) => <Reveal key={`${item.label}-${index}`} className={`gallery-item ${item.tall ? "tall" : ""}`} delay={(index % 5) * 45}><button onClick={() => setLightboxIndex(index)} aria-label={`View ${item.label} image`}><img src={item.src} alt={item.label} loading="lazy" /><span className="gallery-hover"><span>{item.label}</span><ArrowUpRight size={15} /></span></button></Reveal>)}</div></div></section>

        <section id="team" className="team-section section-pad section-cream"><div className="container"><div className="section-heading split-heading"><Reveal><span className="eyebrow">The people behind the ritual</span><h2>Meet our<br /><i>beauty experts.</i></h2></Reveal><Reveal delay={100}><p>Small team, deep expertise, and a shared belief that the best beauty work begins with attention.</p></Reveal></div><div className="team-grid">{[{ name: "Sarah Khan", role: "Senior Makeup Artist", specialty: "Bridal & editorial", image: uploaded.expertMakeup }, { name: "Mia Laurent", role: "Beauty Artist", specialty: "Makeup & occasion looks", image: uploaded.expertInAction }, { name: "Noor Patel", role: "Hair & Color Specialist", specialty: "Styling & finish", image: uploaded.expertStylist }].map((member, index) => <Reveal key={member.name} delay={index * 90}><article className="team-card"><div className="team-photo"><img src={member.image} alt={member.name} loading="lazy" /><span className="team-social"><Instagram size={16} /></span></div><div className="team-meta"><strong>{member.name}</strong><span>{member.role}</span><small>{member.specialty} · {index === 0 ? "12" : index === 1 ? "10" : "8"} years</small></div></article></Reveal>)}</div></div></section>

        <section className="stories-section section-pad"><div className="container stories-layout"><Reveal><span className="eyebrow">Client stories</span><h2>Beautifully<br /><i>considered.</i></h2><p className="stories-note">We share client words only with permission. Your story could be featured here after your visit.</p></Reveal><div className="story-panel"><div className="story-quote-mark">“</div><div className="story-placeholder"><span>Private by design</span><p>Real experiences, shared thoughtfully — coming soon.</p></div><div className="story-controls"><button onClick={() => setTestimonialIndex(Math.max(0, testimonialIndex - 1))} disabled={testimonialIndex === 0} aria-label="Previous story"><ChevronLeft size={16} /></button><span>0{testimonialIndex + 1} / 03</span><button onClick={() => setTestimonialIndex(Math.min(2, testimonialIndex + 1))} disabled={testimonialIndex === 2} aria-label="Next story"><ChevronRight size={16} /></button></div></div></div></section>

        <section className="offers-section section-pad section-blush"><div className="container"><div className="section-heading split-heading"><Reveal><span className="eyebrow">Atelier notes</span><h2>Little reasons<br /><i>to visit.</i></h2></Reveal><Reveal delay={100}><p>Seasonal ways to make a little more room for yourself — presented with the same care as our rituals.</p></Reveal></div><div className="offers-grid"><Reveal><article className="offer-card offer-dark"><span className="eyebrow light-eyebrow">A private welcome</span><strong>Begin with<br /><i>the ritual.</i></strong><p>New clients receive 15% off their first visit — a warm welcome into the Atelier.</p><button onClick={() => openBooking()}>Reserve your welcome <ArrowUpRight size={15} /></button></article></Reveal><Reveal delay={90}><article className="offer-card offer-image"><img src={uploaded.hydra} alt="Uploaded hydra facial ritual detail" /><div><span className="eyebrow light-eyebrow">For the almost-weds</span><strong>Bridal beauty<br /><i>package.</i></strong><button onClick={() => openBooking(services.find((s) => s.id === "bridal-package"))}>Start a consultation <ArrowUpRight size={15} /></button></div></article></Reveal></div></div></section>

        <section id="booking" className="booking-section section-pad"><div className="container booking-grid"><Reveal className="booking-copy"><span className="eyebrow">Make it yours</span><h2>Ready for your<br /><i>beauty appointment?</i></h2><p>Tell us what you have in mind. Our studio team will be in touch to shape the right appointment for you.</p><div className="booking-contact"><a href="tel:+12125550148"><Phone size={16} /> Call us <span>(212) 555-0148</span></a><a href="https://wa.me/12125550148" target="_blank" rel="noreferrer"><Sparkles size={16} /> WhatsApp us <span>Message the studio</span></a></div></Reveal><Reveal className="booking-form-wrap" delay={120}><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-intro"><span>Appointment request</span>{selectedService && <small>Requesting: <strong>{selectedService.title}</strong></small>}</div><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Phone<input required name="phone" type="tel" placeholder="(212) 555-0148" /></label></div><div className="form-row"><label>Email<input required name="email" type="email" placeholder="you@email.com" /></label><label>Service<select name="service" defaultValue={selectedService?.id || ""}><option value="" disabled>Select a service</option>{services.map((service) => <option value={service.id} key={service.id}>{service.title} · {service.price}</option>)}</select></label></div><div className="form-row"><label>Preferred date<input required name="date" type="date" /></label><label>Preferred time<select name="time" defaultValue=""><option value="" disabled>Select a time</option><option>10:00 AM</option><option>12:30 PM</option><option>3:00 PM</option><option>5:30 PM</option></select></label></div><label>Message<textarea name="message" rows={3} placeholder="Tell us a little about what you are looking for..." /></label><button className="button button-dark form-submit" type="submit">{submitted ? <>Request received <Check size={16} /></> : <>Request appointment <ArrowUpRight size={16} /></>}</button>{submitted && <p className="form-success">Thank you — your request is ready for the studio team. We’ll be in touch shortly.</p>}</form></Reveal></div></section>

        <section id="contact" className="contact-section"><div className="contact-image"><img src={uploaded.treatmentRoom} alt="Uploaded Atelier Beauty treatment room" /></div><div className="container contact-grid"><Reveal><span className="eyebrow">Visit our studio</span><h2>Come in,<br /><i>stay awhile.</i></h2><div className="contact-details"><div><MapPin size={16} /><p>18 Mercer Street<br />New York, NY 10013</p></div><div><Clock3 size={16} /><p>Monday – Saturday<br />10:00 AM – 8:00 PM<br /><span>Sunday · By appointment</span></p></div><div><Mail size={16} /><p>hello@atelierbeauty.studio<br />@atelierbeauty</p></div></div><a className="text-link" href="https://maps.google.com/?q=18+Mercer+Street+New+York+NY" target="_blank" rel="noreferrer">Open in maps <ArrowUpRight size={16} /></a></Reveal></div></section>

        <section className="journal-strip section-pad section-cream"><div className="container journal-heading"><Reveal><span className="eyebrow">Follow our beauty journal</span><h2>@atelierbeauty</h2></Reveal><Reveal delay={100}><a className="text-link" href="https://instagram.com" target="_blank" rel="noreferrer">Follow us <Instagram size={16} /></a></Reveal></div><div className="journal-grid">{gallery.slice(2, 8).map((item, index) => <a href="https://instagram.com" target="_blank" rel="noreferrer" key={index} aria-label={`View ${item.label} on Instagram`}><img src={item.src} alt={item.label} loading="lazy" /></a>)}</div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><button className="brand-lockup footer-lockup" onClick={() => scrollTo("home")}><span className="brand-symbol" aria-hidden="true">A</span><span>ATELIER<br /><em>BEAUTY</em></span></button><p>Expert care, modern beauty,<br />timeless elegance.</p><a href="mailto:hello@atelierbeauty.studio">hello@atelierbeauty.studio</a></div><div className="footer-links"><div><span className="footer-label">Explore</span><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("services")}>Services</button><button onClick={() => scrollTo("gallery")}>Gallery</button><button onClick={() => scrollTo("bridal")}>Bridal</button></div><div><span className="footer-label">Services</span><button onClick={() => { setSelectedCategory("Hair"); scrollTo("menu"); }}>Hair</button><button onClick={() => { setSelectedCategory("Makeup"); scrollTo("menu"); }}>Makeup</button><button onClick={() => { setSelectedCategory("Skin"); scrollTo("menu"); }}>Skin</button><button onClick={() => { setSelectedCategory("Spa"); scrollTo("menu"); }}>Spa</button></div><div><span className="footer-label">Find us</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="tel:+12125550148">(212) 555-0148</a><a href="https://maps.google.com/?q=18+Mercer+Street+New+York+NY" target="_blank" rel="noreferrer">18 Mercer Street <ArrowUpRight size={13} /></a></div></div><div className="footer-newsletter"><span className="footer-label">The Atelier letter</span><p>Occasional notes on beauty, rituals and studio news.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" aria-label="Email for Atelier letter" placeholder="Your email address" /><button aria-label="Subscribe"><ArrowRight size={16} /></button></form></div></div><div className="container footer-bottom"><span>© 2026 Atelier Beauty Studio</span><span>Made with care in New York</span><button onClick={() => scrollTo("home")}>Back to top <ArrowUp size={14} /></button></div>      </footer>
      <button className={`top-button ${showTop ? "is-visible" : ""}`} onClick={scrollToTop} aria-label="Scroll to top"><ArrowUp size={15} /><span>Top</span></button>

      {selectedService && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedService(null)}><aside className="service-modal" role="dialog" aria-modal="true" aria-label={`${selectedService.title} details`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedService(null)} aria-label="Close service details"><X size={18} /></button><div className="modal-image"><img src={selectedService.image} alt={selectedService.title} /></div><div className="modal-content"><span className="eyebrow">{selectedService.category} · {selectedService.duration}</span><h2>{selectedService.title}</h2><p>{selectedService.description}</p><div className="modal-facts"><div><span>Duration</span><strong>{selectedService.duration}</strong></div><div><span>Starting price</span><strong>{selectedService.price}</strong></div></div><div className="modal-benefits"><span className="footer-label">The ritual includes</span>{selectedService.benefits.map((benefit) => <span key={benefit}><Check size={14} /> {benefit}</span>)}</div><p className="modal-prep"><strong>Before you arrive</strong>{selectedService.preparation}</p><button className="button button-dark" onClick={() => { setSelectedService(null); openBooking(selectedService); }}>Book this service <ArrowUpRight size={16} /></button></div></aside></div>}
      {lightboxItem && lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setLightboxIndex(null)}><button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery"><X size={20} /></button><button className="lightbox-arrow left" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} aria-label="Previous image"><ChevronLeft size={24} /></button><figure onClick={(event) => event.stopPropagation()}><img src={lightboxItem.src} alt={lightboxItem.label} /><figcaption><span>{lightboxItem.label}</span><small>{lightboxIndex + 1} / {gallery.length}</small></figcaption></figure><button className="lightbox-arrow right" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} aria-label="Next image"><ChevronRight size={24} /></button></div>}
    </div>
  );
}

function ServiceSection({ id, number, eyebrow, title, intro, anchorImage, services, reverse = false, onDetails, onBook }: { id: string; number: string; eyebrow: string; title: React.ReactNode; intro: string; anchorImage: string; services: Service[]; reverse?: boolean; onDetails: (service: Service) => void; onBook: (service: Service) => void }) {
  return <section id={id} className={`service-section section-pad ${reverse ? "reverse" : ""}`}><div className="container"><span className="section-number-mark" aria-hidden="true">{number}</span><div className="service-intro"><Reveal><span className="eyebrow">{number} / {eyebrow}</span><h2>{title}</h2><p>{intro}</p><button className="text-link" onClick={() => onDetails(services[0])}>View the edit <ArrowRight size={16} /></button></Reveal><Reveal className="service-anchor-image" delay={100}><img src={anchorImage} alt={`${eyebrow} at Atelier Beauty`} loading="lazy" /><span className="image-caption">Atelier Beauty · {number}</span></Reveal></div><div className="service-list">{services.map((service, index) => <Reveal key={service.id} delay={index * 60}><article className="service-item"><div className="service-thumb"><img src={service.image} alt={service.title} loading="lazy" /></div><div className="service-info"><span className="service-index">0{index + 1}</span><div><h3>{service.title}</h3><p>{service.description}</p><div className="service-meta"><span><Clock3 size={13} /> {service.duration}</span><span>{service.price}</span></div></div></div><div className="service-actions"><button onClick={() => onBook(service)}>Book now <ArrowUpRight size={15} /></button><button onClick={() => onDetails(service)}>View details <ArrowRight size={15} /></button></div></article></Reveal>)}</div></div></section>;
}
