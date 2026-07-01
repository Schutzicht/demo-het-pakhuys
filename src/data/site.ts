// Centrale content voor de demo van Het Packhuys.
// Feitelijke gegevens (adres, tijden, Zenchef) komen van de bestaande site;
// de uitgeschreven menukaart en reviews zijn illustratief voor deze demo,
// omdat het echte tasting menu wekelijks met het seizoen meebeweegt.

export const site = {
  name: "Het Packhuys",
  tagline: "Fine dining aan de haven",
  city: "Middelburg",
  address: { street: "Kinderdijk 84", zip: "4331 HH", city: "Middelburg" },
  phone: "0118 - 67 40 64",
  phoneHref: "tel:+31118674064",
  email: "mail@hetpackhuys.nl",
  maps: "https://maps.google.com/?q=Het+Packhuys+Kinderdijk+84+Middelburg",
  zenchef: {
    reserve: "https://bookings.zenchef.com/results?rid=369868&pid=1001",
    shop: "https://bookings.zenchef.com/shop?rid=369868",
  },
  social: {
    instagram: "https://www.instagram.com/restauranthetpackhuys/",
    facebook: "https://www.facebook.com/Packhuys-352366978122692/",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menukaart", label: "Menukaart" },
  { href: "/wijnen", label: "Wijnen" },
  { href: "/ons-verhaal", label: "Ons verhaal" },
  { href: "/gezelschappen", label: "Gezelschappen" },
  { href: "/contact", label: "Contact" },
];

// Openingstijden — index 0 = maandag
export const hours = [
  { day: "Maandag", open: "18:00", close: "21:00" },
  { day: "Dinsdag", open: "18:00", close: "21:00" },
  { day: "Woensdag", open: null, close: null },
  { day: "Donderdag", open: "18:00", close: "21:00" },
  { day: "Vrijdag", open: "18:00", close: "21:00" },
  { day: "Zaterdag", open: "18:00", close: "21:00" },
  { day: "Zondag", open: null, close: null },
];

// Tasting menu — keuze in aantal gangen
export const menus = [
  { courses: 4, price: 58, wine: 36, featured: false },
  { courses: 5, price: 67, wine: 45, featured: true },
  { courses: 6, price: 76, wine: 54, featured: false },
  { courses: 7, price: 83, wine: 63, featured: false },
];

// Illustratief seizoensmenu (vroege zomer). De echte kaart wisselt wekelijks.
export const dishes = [
  {
    course: "Vooraf",
    name: "Brood & boter",
    desc: "Onze eigen desem, gekarnde boter van Zeeuwse melk, fleur de sel.",
    tags: [],
  },
  {
    course: "Eerste gang",
    name: "Oester & vlierbloesem",
    desc: "Oosterschelde-oester uit ons homarium, gel van komkommer, dille en een mignonette van vlierbloesem.",
    tags: ["Uit het homarium", "Vis"],
    sign: true,
  },
  {
    course: "Tweede gang",
    name: "Langoustine & bisque",
    desc: "Langoustine recht uit het zeewateraquarium, geconcentreerde bisque, little gem en bottarga.",
    tags: ["Uit het homarium", "Vis"],
    sign: true,
  },
  {
    course: "Derde gang",
    name: "Tarbot & venkel",
    desc: "Gebakken tarbot, geconfijte venkel, beurre blanc op basis van Zeeuwse witte wijn.",
    tags: ["Vis"],
  },
  {
    course: "Vierde gang",
    name: "Kalfszwezerik & morieljes",
    desc: "Gelakte zwezerik, morieljes, groene asperge en een jus van bruine boter.",
    tags: [],
  },
  {
    course: "Hoofdgang",
    name: "Lam van de Zeeuwse polder",
    desc: "Rug en gegaarde schouder, doperwt, munt en een jus van ras el hanout.",
    tags: ["Signatuur"],
    sign: true,
  },
  {
    course: "Kaas",
    name: "Zeeuws & Frans",
    desc: "Selectie rijpe kazen van eigen affinage, vijgenbrood en walnoot.",
    tags: ["Vegetarisch"],
    vega: true,
  },
  {
    course: "Dessert",
    name: "Aardbei & yoghurt",
    desc: "Aardbeien van de volle grond, hangop van yoghurt, basilicum en een sorbet van rabarber.",
    tags: ["Vegetarisch"],
    vega: true,
  },
];

export const features = [
  {
    icon: "anchor",
    title: "Een echt pakhuys",
    body: "U dineert in een authentiek V.O.C.-pakhuys met originele houten balkenplafonds, direct aan het water.",
  },
  {
    icon: "lobster",
    title: "Eigen homarium",
    body: "Oesters, schaaldieren en kreeft leven in ons aquarium met gekoeld Oosterscheldewater. Verser kan haast niet.",
  },
  {
    icon: "leaf",
    title: "Van eigen hand",
    body: "Alles wordt in eigen keuken bereid, met streekproducten van leveranciers die we bij naam kennen.",
  },
];

export const stats = [
  { n: "V.O.C.", l: "Pakhuys uit de Zeeuwse handelstijd" },
  { n: "4 tot 7", l: "Gangen, samengesteld met het seizoen" },
  { n: "0 m", l: "Tot het water van de jachthaven" },
  { n: "100%", l: "Huisgemaakt, niets uit blik" },
];

// Illustratieve gastreacties voor de demo.
export const reviews = [
  {
    q: "Het mooiste plekje van Middelburg. De oesters uit hun eigen homarium waren ongekend vers en de bediening wist precies wanneer ze er moest zijn.",
    name: "Marleen V.",
    src: "9,4",
    place: "Diner met z'n tweeën",
  },
  {
    q: "Eten in dat oude pakhuys met uitzicht over de haven voelt bijzonder. Elke gang was doordacht, de wijnen erbij maakten het af.",
    name: "Joost D.",
    src: "9,6",
    place: "Tasting van 6 gangen",
  },
  {
    q: "We kwamen voor een verjaardag en zijn verwend. Verfijnde gerechten zonder poespas, een gastvrouw die meedenkt. We komen zeker terug.",
    name: "Annemiek B.",
    src: "9,2",
    place: "Gezelschap van acht",
  },
];

export const galleryImages = [
  { src: "/photos/interieur-tafels.jpg", alt: "Gedekte tafels in het pakhuys" },
  { src: "/photos/haven-boten.jpg", alt: "Zicht op de jachthaven van Middelburg" },
  { src: "/photos/chef-afwerken.jpg", alt: "Afwerken van een gerecht in de keuken" },
  { src: "/photos/wijn-inschenken.jpg", alt: "Inschenken van de wijn" },
  { src: "/photos/gerecht-oester.jpg", alt: "Gerecht met oester en schaaldier" },
  { src: "/photos/interieur-kast.jpg", alt: "Wijnkast onder de houten balken" },
  { src: "/photos/tafel-twee.jpg", alt: "Tafel voor twee aan het raam" },
  { src: "/photos/pand-buiten.jpg", alt: "Het Packhuys aan de Kinderdijk" },
];
