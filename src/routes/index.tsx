import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Quote,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

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
      { title: "Dos Santos | Good Food. Good Vibes. Miami." },
      { name: "description", content: "Bold flavors, homemade favorites and a taste of Miami at Dos Santos — Fine Miami Fare." },
      { property: "og:title", content: "Dos Santos | Fine Miami Fare" },
      { property: "og:description", content: "Good food. Good vibes. Miami." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [["HOME", "#home"], ["MENU", "#menu"], ["OUR STORY", "#story"], ["GALLERY", "#gallery"], ["REVIEWS", "#reviews"]];

const menuGroups = {
  "SIGNATURE DISHES": [
    { name: "The Dos Santos", description: "Roasted pork, smoked ham, Swiss, pickles and our house mojo.", price: "$16", image: heroImage, position: "object-left" },
    { name: "Miami Rigatoni", description: "Parmesan cream, herbs, cracked pepper and a little Miami heat.", price: "$22", image: favoritesImage, position: "object-right" },
    { name: "Golden Croquetas", description: "Crisp, creamy bites with smoked aioli and fresh lime.", price: "$12", image: galleryImage, position: "object-[50%_18%]" },
  ],
  SANDWICHES: [
    { name: "Dos Santos Cubano", description: "Slow-roasted pork, ham, Swiss, pickles and mustard.", price: "$16", image: favoritesImage, position: "object-left" },
    { name: "Little Havana Melt", description: "Braised beef, sweet onions, provolone and mojo.", price: "$18", image: heroImage, position: "object-center" },
    { name: "Miami Chicken", description: "Crispy chicken, pink slaw, pickles and spicy honey.", price: "$17", image: galleryImage, position: "object-[80%_12%]" },
  ],
  EMPANADAS: [
    { name: "Abuela's Beef", description: "Seasoned beef, olives and sofrito in a golden crust.", price: "$6", image: galleryImage, position: "object-[18%_72%]" },
    { name: "Guava & Cheese", description: "Cream cheese, guava and a dusting of cane sugar.", price: "$6", image: heroImage, position: "object-right" },
    { name: "Spicy Chicken", description: "Braised chicken, peppers and smoky hot sauce.", price: "$6", image: favoritesImage, position: "object-center" },
  ],
  SIDES: [
    { name: "Yuca Brava", description: "Crispy yuca, hot sauce, crema and fresh cilantro.", price: "$9", image: galleryImage, position: "object-[82%_70%]" },
    { name: "Miami Slaw", description: "Crunchy cabbage, citrus, herbs and pink peppercorn.", price: "$7", image: heroImage, position: "object-left" },
    { name: "Mojo Fries", description: "Sea salt, garlic, citrus and house mojo aioli.", price: "$8", image: favoritesImage, position: "object-right" },
  ],
  DRINKS: [
    { name: "Pink Paloma", description: "Tequila, grapefruit, lime and a sea-salt rim.", price: "$15", image: galleryImage, position: "object-[52%_70%]" },
    { name: "Miami Mojito", description: "White rum, mint, lime and pure cane sugar.", price: "$14", image: experienceImage, position: "object-left" },
    { name: "Golden Hour", description: "Bourbon, passion fruit, bitters and citrus.", price: "$16", image: heroImage, position: "object-right" },
  ],
  DESSERTS: [
    { name: "Cafecito Tiramisu", description: "Cuban espresso, mascarpone and dark cocoa.", price: "$12", image: galleryImage, position: "object-[20%_20%]" },
    { name: "Guava Cheesecake", description: "Cream cheese, guava swirl and cookie crumb.", price: "$11", image: favoritesImage, position: "object-center" },
    { name: "Coconut Flan", description: "Silky caramel custard with toasted coconut.", price: "$10", image: heroImage, position: "object-center" },
  ],
} as const;

type MenuCategory = keyof typeof menuGroups;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setVisible(true);
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return <div ref={setNode} className={`${className} transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"}`}>{children}</div>;
}

function Header({ count }: { count: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-gold/25 bg-navy/95 shadow-xl backdrop-blur" : "border-transparent bg-navy/30"}`}>
      <nav className="section-shell grid h-20 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:h-24" aria-label="Main navigation">
        <a href="#home" aria-label="Dos Santos home" className="shrink-0"><img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="h-16 w-auto object-contain lg:h-20" /></a>
        <div className="hidden items-center justify-center gap-7 lg:flex">{navItems.map(([label, href]) => <a key={label} href={href} className="text-xs font-extrabold text-primary-foreground transition-colors hover:text-gold">{label}</a>)}</div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild className="h-11 rounded-md border-2 border-navy bg-gold px-6 font-extrabold text-navy shadow-[4px_4px_0_var(--fuchsia)] hover:bg-primary-foreground"><a href="#menu">ORDER NOW</a></Button>
          <span className="grid size-8 place-items-center rounded-full bg-fuchsia text-xs font-bold text-primary-foreground" aria-label={`${count} items in order`}>{count}</span>
        </div>
        <div className="col-start-3 flex items-center gap-2 lg:hidden">
          {count > 0 && <span className="grid size-7 place-items-center rounded-full bg-fuchsia text-xs font-bold text-primary-foreground">{count}</span>}
          <Sheet><SheetTrigger asChild><Button size="icon" variant="ghost" aria-label="Open menu" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold"><Menu /></Button></SheetTrigger><SheetContent className="w-full border-l-4 border-gold bg-navy text-primary-foreground sm:max-w-sm"><SheetTitle className="sr-only">Navigation</SheetTitle><img src={logoAsset.url} alt="Dos Santos" className="mt-7 w-44" /><div className="mt-10 flex flex-col gap-6">{navItems.map(([label, href]) => <SheetClose key={label} asChild><a href={href} className="display-type text-4xl hover:text-gold">{label}</a></SheetClose>)}</div><SheetClose asChild><Button asChild className="mt-10 h-14 w-full rounded-md border-2 border-gold bg-fuchsia text-base font-extrabold"><a href="#menu"><ShoppingBag /> ORDER NOW</a></Button></SheetClose></SheetContent></Sheet>
        </div>
      </nav>
    </header>
  );
}

function HomePage() {
  const [category, setCategory] = useState<MenuCategory>("SIGNATURE DISHES");
  const [orderCount, setOrderCount] = useState(0);
  return (
    <main className="bg-navy">
      <Header count={orderCount} />
      <section id="home" className="relative isolate min-h-[48rem] overflow-hidden bg-navy text-primary-foreground lg:min-h-[min(58rem,100vh)]">
        <img src={heroImage} width={1920} height={1200} alt="Dos Santos signature dishes on a vibrant Miami table" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--navy)_0%,color-mix(in_oklab,var(--navy)_88%,transparent)_44%,color-mix(in_oklab,var(--navy)_25%,transparent)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[linear-gradient(90deg,var(--fuchsia)_0_33%,var(--gold)_33%_66%,var(--miami)_66%)]" />
        <Sparkles className="float-mark absolute right-[8%] top-[20%] hidden size-14 text-gold lg:block" />
        <div className="absolute right-[5%] top-[34%] hidden size-36 rounded-full border-4 border-gold/70 lg:block" />
        <div className="section-shell relative flex min-h-[48rem] items-center py-28 lg:min-h-[min(58rem,100vh)]">
          <div className="max-w-3xl">
            <img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="float-mark mb-5 w-48 drop-shadow-2xl sm:w-60 lg:w-72" />
            <p className="mb-3 flex items-center gap-3 text-xs font-extrabold tracking-[0.22em] text-gold before:h-1 before:w-12 before:bg-fuchsia">FINE MIAMI FARE</p>
            <h1 className="display-type text-6xl leading-[.88] sm:text-8xl lg:text-[7.7rem]">GOOD FOOD.<br /><span className="text-gold">GOOD VIBES.</span><br /><span className="text-fuchsia">MIAMI.</span></h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed sm:text-xl">Bold flavors, homemade favorites and a taste of Miami.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-md border-2 border-gold bg-transparent px-8 font-extrabold text-primary-foreground shadow-[5px_5px_0_var(--gold)] hover:bg-gold hover:text-navy"><a href="#menu">VIEW MENU <ArrowDown /></a></Button>
              <Button asChild size="lg" className="h-14 rounded-md border-2 border-navy bg-fuchsia px-8 font-extrabold shadow-[5px_5px_0_var(--gold)] hover:bg-primary-foreground hover:text-fuchsia"><a href="#menu"><ShoppingBag /> ORDER NOW</a></Button>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-4 border-navy bg-gold py-3 text-navy"><div className="ticker-track flex w-max gap-8 whitespace-nowrap display-type text-2xl"><span>MIAMI MADE ★ FAMILY OWNED ★ BOLD FLAVOR ★ GOOD VIBES ONLY ★ </span><span>MIAMI MADE ★ FAMILY OWNED ★ BOLD FLAVOR ★ GOOD VIBES ONLY ★ </span></div></div>

      <section id="menu" className="scroll-mt-20 bg-cream py-20 lg:py-28">
        <div className="section-shell">
          <Reveal className="grid gap-5 border-b-4 border-navy pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"><div><p className="font-extrabold tracking-[0.2em] text-fuchsia">PICK YOUR FAVORITE</p><h2 className="display-type text-7xl leading-none text-navy sm:text-9xl">THE MENU</h2></div><p className="max-w-sm font-medium text-muted-foreground">Big Miami flavor, made fresh and ready when you are.</p></Reveal>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-3">{(Object.keys(menuGroups) as MenuCategory[]).map((item) => <Button key={item} onClick={() => setCategory(item)} className={`h-12 shrink-0 rounded-md border-2 border-navy px-5 font-extrabold shadow-none ${category === item ? "bg-fuchsia text-primary-foreground shadow-[3px_3px_0_var(--gold)]" : "bg-primary-foreground text-navy hover:bg-gold"}`}>{item}</Button>)}</div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{menuGroups[category].map((dish) => <article key={dish.name} className="food-card group overflow-hidden rounded-lg border-[3px] border-navy bg-primary-foreground shadow-[7px_7px_0_var(--gold)]"><div className="relative h-64 overflow-hidden"><img src={dish.image} alt={dish.name} className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${dish.position}`} /><span className="absolute right-3 top-3 rounded-md border-2 border-navy bg-gold px-3 py-1 text-lg font-black text-navy">{dish.price}</span></div><div className="p-5"><h3 className="display-type text-4xl text-navy">{dish.name}</h3><p className="mt-2 min-h-12 text-sm font-medium text-muted-foreground">{dish.description}</p><Button onClick={() => setOrderCount((count) => count + 1)} className="mt-5 h-12 w-full rounded-md border-2 border-navy bg-fuchsia font-extrabold text-primary-foreground hover:bg-miami"><ShoppingBag /> ADD TO ORDER</Button></div></article>)}</div>
        </div>
      </section>

      <section id="story" className="scroll-mt-20 overflow-hidden bg-miami py-20 text-primary-foreground lg:py-28">
        <Reveal className="section-shell grid items-center gap-14 lg:grid-cols-[1fr_.95fr]">
          <div className="relative"><div className="overflow-hidden rounded-lg border-4 border-navy shadow-[12px_12px_0_var(--gold)]"><img src={experienceImage} width={1600} height={1104} loading="lazy" alt="Friends sharing dinner at Dos Santos" className="aspect-[5/4] w-full object-cover" /></div><img src={logoAsset.url} alt="The two Dos Santos characters" className="absolute -bottom-12 -right-3 w-40 drop-shadow-xl sm:w-52" /></div>
          <div className="pt-8 lg:pl-8"><p className="font-extrabold tracking-[0.2em] text-gold">THE DOS SANTOS STORY</p><h2 className="display-type mt-3 text-7xl leading-[.9] sm:text-9xl">TWO BROTHERS.<br /><span className="text-fuchsia">ONE LOVE</span><br />FOR GREAT FOOD.</h2><div className="my-7 h-2 w-28 bg-gold" /><p className="max-w-xl text-xl font-semibold leading-relaxed">Dos Santos brings family recipes, big personality and Miami energy to every plate. It’s the kind of food made to share, remember and crave again.</p></div>
        </Reveal>
      </section>

      <section className="bg-primary-foreground py-20 lg:py-28">
        <div className="section-shell"><Reveal className="mb-10 text-center"><p className="font-extrabold tracking-[0.2em] text-fuchsia">THE ONES EVERYONE TALKS ABOUT</p><h2 className="display-type text-7xl text-navy sm:text-9xl">MIAMI’S FAVORITES</h2></Reveal><div className="grid gap-6 lg:grid-cols-3">{menuGroups["SIGNATURE DISHES"].map((dish, index) => <article key={dish.name} className={`group relative min-h-[30rem] overflow-hidden rounded-lg border-4 border-navy ${index === 1 ? "lg:-translate-y-5" : ""}`}><img src={dish.image} alt={dish.name} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${dish.position}`} /><div className="absolute inset-0 bg-[linear-gradient(0deg,var(--navy)_0%,color-mix(in_oklab,var(--navy)_65%,transparent)_38%,transparent_70%)]" /><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><span className="inline-block rounded-md bg-gold px-3 py-1 font-black text-navy">{dish.price}</span><h3 className="display-type mt-3 text-5xl">{dish.name}</h3><p className="mt-2 text-sm font-medium text-primary-foreground/80">{dish.description}</p></div></article>)}</div></div>
      </section>

      <section id="gallery" className="scroll-mt-20 bg-navy py-20 text-primary-foreground lg:py-28">
        <div className="section-shell"><Reveal className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-extrabold tracking-[0.2em] text-gold">FOOD, FAMILY & THE 305</p><h2 className="display-type text-7xl sm:text-9xl">THE MIAMI MOOD</h2></div><Instagram className="size-12 text-fuchsia" /></Reveal><div className="gallery-grid"><figure className="gallery-main"><img src={galleryImage} alt="A colorful spread of Dos Santos dishes" /></figure><figure><img src={favoritesImage} alt="Toasted sandwich and pasta" /></figure><figure><img src={experienceImage} alt="Guests enjoying the Dos Santos atmosphere" /></figure><figure><img src={heroImage} alt="Freshly prepared Miami fare" /></figure><figure><img src={galleryImage} alt="Cocktails and food details" /></figure></div></div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-gold py-20 lg:py-28">
        <div className="section-shell"><Reveal className="text-center"><p className="font-extrabold tracking-[0.2em] text-fuchsia">REAL LOVE FROM REAL PEOPLE</p><h2 className="display-type text-7xl text-navy sm:text-9xl">THE WORD ON THE STREET</h2></Reveal><div className="mt-10 grid gap-6 md:grid-cols-3">{[
          ["Great food, amazing atmosphere and incredible service.", "MIA LOCAL"],
          ["The Cubano is bold, crispy and absolutely worth coming back for.", "FIRST-TIME FAN"],
          ["Perfect Miami energy — fun, welcoming and seriously delicious.", "WEEKEND REGULAR"],
        ].map(([review, author], index) => <article key={author} className={`relative rounded-lg border-[3px] border-navy bg-primary-foreground p-7 text-navy shadow-[7px_7px_0_var(--fuchsia)] ${index === 1 ? "md:-rotate-1" : index === 2 ? "md:rotate-1" : ""}`}><Quote className="absolute right-5 top-5 size-10 text-gold" /><div className="flex gap-1 text-fuchsia" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="size-5 fill-current" />)}</div><p className="display-type mt-6 text-3xl leading-tight">“{review}”</p><p className="mt-6 text-xs font-black tracking-[0.18em]">— {author}</p></article>)}</div></div>
      </section>

      <section className="relative overflow-hidden bg-miami py-24 text-center text-primary-foreground lg:py-32"><div className="absolute left-[8%] top-12 size-28 rounded-full border-4 border-gold/60" /><Sparkles className="absolute bottom-12 right-[8%] size-16 text-fuchsia" /><Reveal className="section-shell relative"><img src={logoAsset.url} alt="Dos Santos" className="mx-auto mb-3 w-32" /><h2 className="display-type text-7xl leading-none sm:text-9xl lg:text-[8rem]">COME HUNGRY.<br /><span className="text-gold">LEAVE HAPPY.</span></h2><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-md border-2 border-navy bg-fuchsia px-8 font-extrabold shadow-[5px_5px_0_var(--gold)] hover:bg-primary-foreground hover:text-fuchsia"><a href="#menu"><ShoppingBag /> ORDER NOW</a></Button><Button asChild size="lg" className="h-14 rounded-md border-2 border-gold bg-transparent px-8 font-extrabold text-primary-foreground hover:bg-gold hover:text-navy"><a href="https://maps.google.com/?q=Miami+Florida" target="_blank" rel="noreferrer"><MapPin /> GET DIRECTIONS</a></Button></div></Reveal></section>

      <footer className="border-t-8 border-fuchsia bg-navy py-14 text-primary-foreground"><div className="section-shell grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]"><div><img src={logoAsset.url} alt="Dos Santos Fine Miami Fare" className="w-44" /><p className="mt-4 max-w-xs text-sm text-primary-foreground/65">Bold flavors, homemade favorites and a taste of Miami.</p><a href="https://www.instagram.com/" className="mt-5 inline-flex items-center gap-2 font-extrabold text-gold hover:text-fuchsia"><Instagram /> @DOSSANTOSMIAMI</a></div><div><h3 className="display-type text-3xl text-gold">COME SEE US</h3><div className="mt-5 space-y-4 text-sm"><p className="flex gap-3"><MapPin className="size-5 shrink-0 text-fuchsia" />Miami, Florida<br />Exact address coming soon</p><p className="flex gap-3"><Clock3 className="size-5 shrink-0 text-fuchsia" />Service hours coming soon</p><p className="flex gap-3"><Phone className="size-5 shrink-0 text-fuchsia" />Phone number coming soon</p></div></div><div><h3 className="display-type text-3xl text-gold">QUICK LINKS</h3><div className="mt-5 grid gap-3 text-sm font-extrabold"><a href="#menu" className="hover:text-fuchsia">VIEW THE MENU</a><a href="#menu" className="hover:text-fuchsia">ORDER ONLINE</a><a href="#reviews" className="hover:text-fuchsia">GOOGLE REVIEWS</a><a href="#story" className="hover:text-fuchsia">OUR STORY</a></div></div></div><div className="section-shell mt-12 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/45 sm:flex-row sm:justify-between"><p>© 2026 DOS SANTOS. ALL RIGHTS RESERVED.</p><p>FINE MIAMI FARE · MADE WITH LOVE IN THE 305</p></div></footer>

      {orderCount > 0 && <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg border-2 border-navy bg-gold p-3 shadow-[5px_5px_0_var(--fuchsia)]"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="min-w-0"><p className="text-xs font-black tracking-[0.12em] text-fuchsia">YOUR ORDER</p><p className="truncate font-extrabold text-navy">{orderCount} {orderCount === 1 ? "item" : "items"} ready to review</p></div><Button className="shrink-0 rounded-md border-2 border-navy bg-navy font-extrabold text-primary-foreground hover:bg-miami">VIEW ORDER <ArrowRight /></Button></div></div>}
    </main>
  );
}