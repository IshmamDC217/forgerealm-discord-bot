export interface Stop {
  name: string;
  subtitle: string;
  time: string;
  cost: { label: string; type: "free" | "paid" };
  description: string;
  tips: string[];
  footer: string[];
}

export interface RouteSummary {
  label: string;
  value: string;
}

export interface RouteData {
  city: string;
  nativeName: string;
  label: string;
  stops: Stop[];
  meta: { stops: number; distance: string; start: string; end: string };
  mapEmbedUrl: string;
  summary: RouteSummary[];
  footerLeft: string;
  footerRight: string;
}

export const viennaRoute: RouteData = {
  city: "Vienna",
  nativeName: "Wien",
  label: "Self-Guided Walking Route \u00b7 Vienna, Austria",
  meta: {
    stops: 5,
    distance: "~4.8 km",
    start: "Hauptbahnhof",
    end: "Votivkirche",
  },
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=16.34%2C48.18%2C16.40%2C48.22&layer=mapnik&marker=48.2015445%2C16.3683076",
  stops: [
    {
      name: "Wien Hauptbahnhof",
      subtitle: "Transit Hub \u00b7 Starting Point",
      time: "15\u201320 min",
      cost: { label: "Free", type: "free" },
      description:
        "Vienna\u2019s main station is your jumping-off point. Opened in 2015, it replaced the historic S\u00fcdbahnhof with a sleek, light-filled concourse that\u2019s worth a quick look in itself \u2014 and it\u2019s packed with good breakfast options.",
      tips: [
        "Grab a proper Viennese breakfast (Semmel roll + coffee) at one of the ground-floor bakeries \u2014 far better value than tourist caf\u00e9s further along the route.",
        "Pick up a 24- or 48-hour Vienna City Card at the ticket office; it covers all public transport and gives museum discounts.",
        "Use the station lockers to drop any heavy bags before walking \u2014 they\u2019re near the U1 entrance.",
        "The station has a supermarket (Billa) for cheap water and snacks to carry with you.",
      ],
      footer: [
        "U1 line \u00b7 <strong>Hauptbahnhof</strong>",
        "Open <strong>24 hrs</strong>",
      ],
    },
    {
      name: "Otto Wagner Karlsplatz Pavilions",
      subtitle: "Art Nouveau \u00b7 Jugendstil Architecture",
      time: "20\u201330 min",
      cost: { label: "\u20ac5 entry", type: "paid" },
      description:
        "Two perfectly symmetrical green-and-white Jugendstil pavilions facing each other across Karlsplatz. Otto Wagner designed them in 1898 as entrances to the city\u2019s underground railway \u2014 now one houses a small museum, the other a caf\u00e9.",
      tips: [
        "Walk around both pavilions and photograph the gold sunflower motifs and marble cladding \u2014 the exteriors are as rewarding as going inside.",
        "The museum side (east pavilion) is worth the small entry fee for the original Wagner drawings and period photos; the west pavilion caf\u00e9 is a relaxed coffee stop.",
        "Combine with the nearby Karlskirche Baroque church \u2014 it\u2019s 2 minutes away and free to view from outside.",
        "Early morning light from the east hits the fa\u00e7ades beautifully \u2014 time it before 10am if you can.",
      ],
      footer: [
        "U1/U2/U4 \u00b7 <strong>Karlsplatz</strong>",
        "Museum: <strong>Tue\u2013Sun 9\u201318</strong>",
      ],
    },
    {
      name: "Secession Building",
      subtitle: "Klimt \u00b7 Beethoven Frieze \u00b7 Art Nouveau",
      time: "45\u201375 min",
      cost: { label: "\u20ac13 adult", type: "paid" },
      description:
        'The \u201cgolden cabbage\u201d \u2014 a defiant white cube topped with a gilded filigree dome \u2014 was built in 1898 as the rebel artists\u2019 answer to Vienna\u2019s conservative establishment. Inside, Gustav Klimt\u2019s monumental 34-metre Beethoven Frieze lives permanently in the basement.',
      tips: [
        "Visit on the <strong>first Wednesday of the month</strong> \u2014 entry is completely free (2026 dates: 1 Apr, 6 May, 3 Jun\u2026).",
        "Bring earbuds: the basement audio guide plays Beethoven\u2019s 9th Symphony in sync with Klimt\u2019s panels \u2014 it transforms the experience entirely.",
        "Bring a \u20ac1\u20132 coin for the coin locker; backpacks aren\u2019t permitted in the galleries.",
        "The Frieze gallery is climate-controlled and cold even in summer \u2014 bring a light layer.",
        "Saturday at 11am there\u2019s a free English overview tour included with admission.",
        "The gift shop is free to browse and stocks Secession honey harvested from bees on the golden dome \u2014 a unique souvenir.",
        "Naschmarkt \u2014 Vienna\u2019s huge open-air food market \u2014 starts diagonally opposite; ideal for lunch straight after.",
      ],
      footer: [
        "Exit: <strong>Ausgang Secession</strong> from Karlsplatz",
        "Open <strong>Tue\u2013Sun 10\u201318</strong>",
        "Closed <strong>Mondays</strong>",
      ],
    },
    {
      name: "Palmenhaus \u2014 Burggarten",
      subtitle: "Imperial Glasshouse \u00b7 Garden Caf\u00e9",
      time: "30\u201345 min",
      cost: { label: "Garden free", type: "free" },
      description:
        "A cast-iron and glass Art Nouveau hothouse in the former imperial gardens, now a caf\u00e9-restaurant. The Burggarten itself is a lovely green escape from the city \u2014 and home to Vienna\u2019s famous Mozart statue, as well as a lesser-known Franz Joseph I monument.",
      tips: [
        "The garden is free to enter and genuinely beautiful \u2014 budget 15 minutes just to wander it before or after the caf\u00e9 stop.",
        "The Palmenhaus caf\u00e9 is great for a mid-afternoon Melange (Viennese coffee) and Apfelstrudel; it\u2019s less touristy than the Ringstra\u00dfe caf\u00e9s nearby.",
        "Find the Mozart statue (facing the Ringstra\u00dfe side) for a photo, but also seek out the quieter Franz Joseph I equestrian statue in the far corner \u2014 far less crowded.",
        "The butterfly house (Schmetterlingshaus) is inside the gardens if you want a 20-minute add-on \u2014 separate ticket, ~\u20ac7.",
      ],
      footer: [
        "Garden open <strong>daily, dawn\u2013dusk</strong>",
        "Caf\u00e9: <strong>10\u201323 (daily)</strong>",
      ],
    },
    {
      name: "Votivkirche",
      subtitle: "Neo-Gothic \u00b7 Ringstra\u00dfe Cathedral",
      time: "30\u201345 min",
      cost: { label: "Free entry", type: "free" },
      description:
        'Vienna\u2019s \u201cCathedral of the Ringstra\u00dfe\u201d \u2014 99 metres of twin neo-Gothic spires, built as a votive offering after the 1853 assassination attempt on Emperor Franz Joseph. Restored in 2021, it now combines stunning original stained glass with an immersive Light of Creation show.',
      tips: [
        "Entry is free \u2014 donations welcome. Budget 30\u201345 minutes; it rewards slow looking.",
        "Come in the <strong>morning or early afternoon</strong> if possible: eastern light floods through the original 19th-century stained glass windows, creating kaleidoscopic colour on the stone floors.",
        "Check current opening hours before visiting \u2014 public access is limited to Thu\u2013Fri 14:00\u201318:00, Sat 09:00\u201318:00, Sun 09:00\u201313:00 (verify at the church website).",
        "Look for the Renaissance sarcophagus of Niklas Salm inside \u2014 the commander who defended Vienna from the 1529 Ottoman siege, and easy to miss.",
        "Votivpark directly opposite has Vienna University students lounging on the grass \u2014 in spring the magnolia trees along the park edges are spectacular.",
        "The nearest U-Bahn is Schottentor (U2) \u2014 350m walk, about 4 minutes.",
      ],
      footer: [
        "U2 \u00b7 <strong>Schottentor</strong> (4 min walk)",
        "Thu\u2013Fri <strong>14:00\u201318:00</strong>",
        "Sat <strong>09:00\u201318:00</strong>",
        "Sun <strong>09:00\u201313:00</strong>",
      ],
    },
  ],
  summary: [
    { label: "Stops", value: "5" },
    { label: "km on foot", value: "4.8" },
    { label: "Minimum time", value: "~4h" },
    { label: "Max entry spend", value: "\u20ac18" },
    { label: "Free Wed/month", value: "1" },
  ],
  footerLeft: "Vienna Route \u00b7 Self-Guided \u00b7 March 2026",
  footerRight: "Verify opening hours before each visit",
};
