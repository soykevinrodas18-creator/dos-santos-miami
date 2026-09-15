import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Clock3, Instagram, MapPin, Menu, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/dos-santos-logo.png.asset.json";
import heroImage from "@/assets/dos-santos-hero.jpg";
import favoritesImage from "@/assets/dos-santos-favorites.jpg";
import experienceImage from "@/assets/dos-santos-experience.jpg";
import galleryImage from "@/assets/dos-santos-gallery.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dos Santos | Fine Miami Fare" },
      { name: "description", content: "Discover bold sandwiches, pasta and Miami favorites made for sharing at Dos Santos." },
      { property: "og:title", content: "Dos Santos | Fine Miami Fare" },
      { property: "og:description", content: "Fine food. Great vibes. Made for Miami." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [
  ["HOME", "#home"], ["MENU", "#menu"], ["OUR STORY", "#story"], ["GALLERY", "#gallery"], ["CONTACT", "#contact"],
];

const dishes = [
  { name: "The Dos Santos", description: "Roasted pork, ham, Swiss, pickles & house mustard", price: "$16", position: "left" },
  { name: "Miami Rigatoni", description: "Creamy parmesan sauce, herbs & cracked pepper", price: "$22", position: "right" },
  { name: "Golden Croquetas", description: "Crisp bites, smoked aioli & lime", price: "$12", position: "center" },
];

const menuGroups = {
  SANDWICHES: [
    ["Dos Santos Cubano", "Slow-roasted pork, ham, Swiss, pickles", "$16"],
    ["Little Havana Melt", "Braised beef, onions, provolone, mojo", "$18"],
    ["Miami Chicken", "Crispy chicken, pink slaw, spicy honey", "$17"],
  ],
  PASTA: [
    ["Miami Rigatoni", "Parmesan cream, herbs, cracked pepper", "$22"],
    ["Sunday Ragu", "Slow-cooked beef, tomato, pecorino", "$25"],
    ["Pink Shrimp Mafaldine", "Wild shrimp, rosé sauce, lemon", "$27"],
  ],
  "MIAMI FAVORITES": [
    ["Crispy Lechón Bowl", "Mojo rice, black beans, avocado", "$21"],
    ["Golden Croquetas", "Smoked aioli, lime, herbs", "$12"],
    ["Catch of the Day", "Market fish, citrus, tropical salad", "MP"],
  ],
  APPETIZERS: [
    ["Yuca Brava", "Crispy yuca, hot sauce, crema", "$11"],
    ["Mango Ceviche", "Local fish, citrus, red onion", "$18"],
    ["Warm Cuban Bread", "Whipped mojo butter", "$8"],
  ],
  DESSERTS: [
    ["Cafecito Tiramisu", "Espresso, mascarpone, cocoa", "$12"],
    ["Guava Cheesecake", "Cream cheese, guava, cookie crumb", "$11"],
    ["Coconut Flan", "Caramel, toasted coconut", "$10"],
  ],
  DRINKS: [
    ["Pink Paloma", "Tequila, grapefruit, lime, sea salt", "$15"],
    ["Miami Mojito", "Rum, mint, lime, cane sugar", "$14"],
    ["Golden Hour", "Bourbon, passion fruit, bitters", "$16"],
  ],
};

type MenuCategory = keyof typeof menuGroups;

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && setVisible(true), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return <div ref={setNode} className={`${className} transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>{children}</div>;
}

function BrandButton({ children, href, outline = false }: { children: React.ReactNode; href: string; outline?: boolean }) {
  return (
    <Button asChild size="lg" className={outline ? "h-12 rounded-none border border-current bg-transparent px-7 font-bold text-inherit shadow-none hover:bg-foreground hover:text-background" : "h-12 rounded-none bg-fuchsia px-7 font-bold text-primary-foreground shadow-none hover:bg-fuchsia/85"}>
      <a href={href}>{children}<ArrowRight /></a>
    </Button>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update(); window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/95 shadow-lg backdrop-blur" : "bg-navy/35"}`}>
      <nav className="section-shell grid h-20 grid-cols-[auto_1fr_auto] items-center gap-5 lg:h-24" aria-label="Main navigation">
        <a href="#home" aria-label="Dos Santos home" className="shrink-0"><img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="h-16 w-auto object-contain lg:h-20" /></a>
        <div className="hidden items-center justify-end gap-7 lg:flex">
          {navItems.map(([label, href]) => <a key={label} href={href} className="text-sm font-bold text-primary-foreground transition-colors hover:text-gold">{label}</a>)}
        </div>
        <div className="hidden lg:block"><Button asChild className="h-11 rounded-none bg-gold px-6 font-bold text-navy hover:bg-gold/85"><a href="#menu">ORDER NOW</a></Button></div>
        <div className="col-start-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild><Button size="icon" variant="ghost" aria-label="Open menu" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold"><Menu /></Button></SheetTrigger>
            <SheetContent className="w-full border-gold bg-navy text-primary-foreground sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <img src={logoAsset.url} alt="Dos Santos" className="mt-8 w-44" />
              <div className="mt-12 flex flex-col gap-7">{navItems.map(([label, href]) => <SheetClose key={label} asChild><a href={href} className="display-type text-4xl text-primary-foreground hover:text-gold">{label}</a></SheetClose>)}</div>
              <Button asChild className="mt-10 h-14 w-full rounded-none bg-fuchsia text-base font-bold"><a href="#menu">ORDER NOW</a></Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function HomePage() {
  const [category, setCategory] = useState<MenuCategory>("SANDWICHES");
  return (
    <main>
      <Header />
      <section id="home" className="relative isolate min-h-[46rem] overflow-hidden bg-navy text-primary-foreground lg:min-h-screen">
        <img src={heroImage} width={1920} height={1200} alt="A table filled with Dos Santos sandwiches, pasta, appetizers and cocktails" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-fuchsia" />
        <div className="absolute right-[7%] top-[18%] hidden h-36 w-36 rounded-full border border-gold/70 lg:block" />
        <div className="section-shell relative flex min-h-[46rem] flex-col items-center justify-center pb-14 pt-28 text-center lg:min-h-screen">
          <img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="float-mark mb-6 w-48 drop-shadow-2xl sm:w-60 lg:w-72" />
          <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-gold before:h-px before:w-10 before:bg-gold after:h-px after:w-10 after:bg-gold">FINE MIAMI FARE</p>
          <h1 className="display-type text-6xl leading-none sm:text-8xl lg:text-[9rem]">MIAMI HAS <span className="text-fuchsia">A FLAVOR.</span></h1>
          <p className="mt-4 text-lg font-medium sm:text-xl">Fine food. Great vibes. Made for Miami.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><BrandButton href="#menu" outline>VIEW MENU</BrandButton><BrandButton href="#menu">ORDER NOW</BrandButton></div>
          <a href="#story" aria-label="Scroll to our story" className="absolute bottom-6 rounded-full border border-primary-foreground/40 p-3 transition-colors hover:border-gold hover:text-gold"><ArrowDown /></a>
        </div>
      </section>

      <div className="overflow-hidden bg-gold py-3 text-navy"><div className="ticker-track flex w-max gap-8 whitespace-nowrap display-type text-xl"><span>FAMILY MADE • MIAMI BORN • ALWAYS FRESH • GOOD VIBES ONLY • </span><span>FAMILY MADE • MIAMI BORN • ALWAYS FRESH • GOOD VIBES ONLY • </span></div></div>

      <section id="story" className="scroll-mt-20 overflow-hidden bg-cream py-20 lg:py-32">
        <ScrollReveal className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative order-2 lg:order-1">
            <img src={favoritesImage} width={1600} height={1008} loading="lazy" alt="Dos Santos toasted sandwich and creamy pasta" className="aspect-[4/3] w-full object-cover shadow-[18px_18px_0_var(--gold)]" />
            <div className="absolute -bottom-8 -right-2 h-28 w-28 rounded-full border-[10px] border-fuchsia bg-miami sm:h-36 sm:w-36"><img src={logoAsset.url} alt="Dos Santos emblem" className="h-full w-full rounded-full object-cover" /></div>
          </div>
          <div className="order-1 lg:order-2 lg:pl-10">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-fuchsia">EST. IN THE 305</p>
            <h2 className="display-type text-7xl leading-none text-navy sm:text-8xl">OUR<br/><span className="text-miami">STORY</span></h2>
            <div className="my-7 h-1 w-24 bg-gold" />
            <p className="max-w-lg text-2xl font-medium leading-snug text-navy">Born in Miami. Inspired by great food, family and the flavors that bring people together.</p>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">We serve bold, joyful food with a little nostalgia and a lot of personality—made to linger over, pass around, and come back for.</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-miami py-20 text-primary-foreground lg:py-28">
        <div className="section-shell">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-bold tracking-[0.2em] text-gold">THE HITS</p><h2 className="display-type text-6xl sm:text-8xl">OUR FAVORITES</h2></div><p className="max-w-sm text-primary-foreground/75">The plates Miami keeps coming back for. Bright, generous, and made from scratch.</p></ScrollReveal>
          <div className="grid gap-5 md:grid-cols-3">{dishes.map((dish, index) => <ScrollReveal key={dish.name} className={index === 1 ? "md:translate-y-8" : ""}><article className="group overflow-hidden bg-cream text-navy"><div className="overflow-hidden"><img src={index === 2 ? galleryImage : favoritesImage} width={1600} height={index === 2 ? 1200 : 1008} loading="lazy" alt={dish.name} className={`h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 ${dish.position === "left" ? "object-left" : dish.position === "right" ? "object-right" : "object-[50%_15%]"}`} /></div><div className="p-6"><div className="flex items-start justify-between gap-3"><h3 className="display-type text-3xl">{dish.name}</h3><span className="text-xl font-bold text-fuchsia">{dish.price}</span></div><p className="mt-2 min-h-12 text-sm text-muted-foreground">{dish.description}</p><a href="#menu" className="mt-5 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold">SEE MORE <ArrowRight className="size-4" /></a></div></article></ScrollReveal>)}</div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-20 bg-cream py-20 lg:py-32">
        <div className="section-shell">
          <ScrollReveal className="text-center"><p className="text-sm font-bold tracking-[0.2em] text-fuchsia">PICK YOUR MOOD</p><h2 className="display-type mt-2 text-7xl text-navy sm:text-9xl">THE MENU</h2><div className="mx-auto mt-4 h-1 w-24 bg-gold" /></ScrollReveal>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-4">{(Object.keys(menuGroups) as MenuCategory[]).map((item) => <Button key={item} onClick={() => setCategory(item)} className={`h-11 shrink-0 rounded-none border px-5 font-bold shadow-none ${category === item ? "border-fuchsia bg-fuchsia text-primary-foreground" : "border-navy bg-transparent text-navy hover:bg-navy hover:text-primary-foreground"}`}>{item}</Button>)}</div>
          <div className="mt-8 grid gap-x-16 md:grid-cols-2">{menuGroups[category].map(([name, description, price], index) => <div key={name} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-gold py-6 ${index === 2 ? "md:col-span-2 md:max-w-[calc(50%-2rem)]" : ""}`}><div className="min-w-0"><h3 className="display-type text-3xl text-navy">{name}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div><span className="text-xl font-bold text-fuchsia">{price}</span></div>)}</div>
          <div className="mt-10 text-center"><BrandButton href="#menu">VIEW FULL MENU</BrandButton></div>
        </div>
      </section>

      <section className="relative min-h-[48rem] overflow-hidden bg-navy text-primary-foreground">
        <img src={experienceImage} width={1600} height={1104} loading="lazy" alt="Family and friends enjoying dinner at Dos Santos in Miami" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-navy/60" />
        <ScrollReveal className="section-shell relative flex min-h-[48rem] flex-col justify-end pb-20 pt-32 sm:pb-28">
          <div className="max-w-4xl border-l-4 border-fuchsia pl-5 sm:pl-9"><p className="text-sm font-bold tracking-[0.25em] text-gold">GOOD PEOPLE. GREAT NIGHTS.</p><h2 className="display-type mt-3 text-7xl leading-[.88] sm:text-9xl">MORE THAN FOOD.<br/><span className="text-outline">IT'S A MIAMI EXPERIENCE.</span></h2></div>
        </ScrollReveal>
      </section>

      <section id="gallery" className="scroll-mt-20 bg-navy py-20 text-primary-foreground lg:py-28">
        <div className="section-shell">
          <ScrollReveal className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-bold tracking-[0.2em] text-fuchsia">FROM OUR TABLE</p><h2 className="display-type text-7xl sm:text-9xl">THE VIBE</h2></div><p className="max-w-xs text-primary-foreground/65">A little loud. A lot delicious. Always Miami.</p></ScrollReveal>
          <div className="grid auto-rows-[13rem] grid-cols-2 gap-3 md:auto-rows-[18rem] md:grid-cols-4">
            <div className="group col-span-2 row-span-2 overflow-hidden"><img src={galleryImage} width={1600} height={1200} loading="lazy" alt="Dos Santos food, drinks and Miami atmosphere" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="group overflow-hidden"><img src={favoritesImage} width={1600} height={1008} loading="lazy" alt="Dos Santos toasted sandwich" className="h-full w-full object-cover object-left transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="group overflow-hidden"><img src={experienceImage} width={1600} height={1104} loading="lazy" alt="Friends dining at Dos Santos" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="group overflow-hidden"><img src={heroImage} width={1920} height={1200} loading="lazy" alt="Freshly prepared Dos Santos dishes" className="h-full w-full object-cover object-right transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="group overflow-hidden"><img src={favoritesImage} width={1600} height={1008} loading="lazy" alt="Creamy Miami rigatoni" className="h-full w-full object-cover object-right transition-transform duration-700 group-hover:scale-105" /></div>
          </div>
        </div>
      </section>

      <section className="bg-primary-foreground py-20 lg:py-28">
        <div className="section-shell">
          <ScrollReveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-bold tracking-[0.2em] text-fuchsia">@DOSSANTOSMIAMI</p><h2 className="display-type text-7xl text-navy sm:text-9xl">FOLLOW THE VIBE</h2></div><BrandButton href="https://www.instagram.com/">FOLLOW US</BrandButton></ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">{[
            [galleryImage, "object-left", 1600, 1200],
            [favoritesImage, "object-right", 1600, 1008],
            [experienceImage, "object-center", 1600, 1104],
          ].map(([src, position, width, height], index) => <a key={String(src)} href="https://www.instagram.com/" aria-label={`View Instagram post ${index + 1}`} className="group relative aspect-square overflow-hidden bg-navy"><img src={String(src)} width={Number(width)} height={Number(height)} loading="lazy" alt="Dos Santos food and atmosphere" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${position}`} /><span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-fuchsia text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"><Instagram /></span></a>)}</div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-gold py-20 lg:py-28">
        <div className="section-shell grid overflow-hidden bg-cream lg:grid-cols-[.85fr_1.15fr]">
          <ScrollReveal className="p-8 sm:p-12 lg:p-16"><p className="font-bold tracking-[0.2em] text-fuchsia">WELCOME TO THE 305</p><h2 className="display-type mt-2 text-7xl leading-none text-navy sm:text-8xl">COME<br/>SEE US</h2><div className="mt-8 space-y-6 text-navy"><div className="flex gap-4"><MapPin className="shrink-0 text-fuchsia"/><div><strong>MIAMI, FLORIDA</strong><p className="text-sm text-muted-foreground">Exact address coming soon</p></div></div><div className="flex gap-4"><Clock3 className="shrink-0 text-fuchsia"/><div><strong>OPENING HOURS</strong><p className="text-sm text-muted-foreground">Service hours coming soon</p></div></div><div className="flex gap-4"><Phone className="shrink-0 text-fuchsia"/><div><strong>CALL DOS SANTOS</strong><p className="text-sm text-muted-foreground">Phone number coming soon</p></div></div></div><div className="mt-9 flex flex-col gap-3 sm:flex-row"><BrandButton href="https://maps.google.com/?q=Miami+Florida">GET DIRECTIONS</BrandButton><Button disabled className="h-12 rounded-none border border-navy bg-transparent px-7 font-bold text-navy opacity-60 shadow-none"><Phone /> CALL US</Button></div></ScrollReveal>
          <div className="min-h-[26rem] bg-miami"><iframe title="Map of Miami, Florida" src="https://www.google.com/maps?q=Miami%2C%20Florida&z=12&output=embed" className="h-full min-h-[26rem] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <footer className="bg-navy py-14 text-primary-foreground">
        <div className="section-shell flex flex-col items-center text-center"><img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="w-40"/><p className="mt-4 text-xs font-bold tracking-[0.3em] text-gold">FINE MIAMI FARE</p><div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3">{navItems.map(([label, href]) => <a key={label} href={href} className="text-sm font-bold hover:text-fuchsia">{label}</a>)}</div><div className="mt-8 flex items-center gap-4"><a href="https://www.instagram.com/" aria-label="Instagram" className="rounded-full border border-gold p-3 hover:bg-gold hover:text-navy"><Instagram /></a><Star className="text-fuchsia" /></div><div className="mt-10 h-px w-full bg-primary-foreground/15"/><p className="mt-6 text-xs text-primary-foreground/50">© 2026 DOS SANTOS. MADE WITH FLAVOR IN MIAMI.</p></div>
      </footer>
    </main>
  );
}