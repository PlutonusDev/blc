export type Club = {
  slug: string;
  name: string;
  shortName: string;
  city: string;
  region: string;
  tagline: string;
  blurb: string;
  story: string;
  street: string;
  suburb: string;
  postcode: string;
  phone: string;
  phoneHref: string;
  email?: string;
  website: string;
  websiteLabel: string;
  hours: { days: string; time: string }[];
  hoursNote?: string;
  venues: { name: string; description: string }[];
  highlights: string[];
  membership: { price: string; term: string; note: string };
  accent: string;
  coords: { lat: number; lng: number };
  established?: string;
  image: Photo;
  gallery: Photo[];
};

export type Photo = { src: string; alt: string };

export const clubs: Club[] = [
  {
    slug: "cairns",
    name: "Brothers Leagues Club Cairns",
    shortName: "Cairns",
    city: "Cairns",
    region: "Far North Queensland",
    tagline: "Your family friendly local club",
    blurb:
      "The original Brothers club. Open from nine in the morning until four the next, with three distinct bars, a full restaurant and a function room that has hosted half of Cairns.",
    story:
      "Cairns Past Brothers Rugby Leagues Club was formed in 1926 by old boys of the Christian and Marist Brothers colleges. The White House clubhouse followed in 1954, the licensed social club in the mid seventies, and Stan Williams Park in 1983. Almost a century on, the club still funds junior football, senior football and a long list of local causes.",
    street: "99-107 Anderson Street",
    suburb: "Manunda",
    postcode: "QLD 4870",
    phone: "(07) 4053 1053",
    phoneHref: "+61740531053",
    website: "https://www.brotherscairns.com.au/",
    websiteLabel: "brotherscairns.com.au",
    hours: [{ days: "Seven days", time: "9am to 4am" }],
    venues: [
      {
        name: "Fratelli's",
        description:
          "Cafe, restaurant and bar. Breakfast through to dinner, with Reef and Beef every Wednesday.",
      },
      {
        name: "Shamrock Bar",
        description: "The club's main bar, and the room everyone drifts back to.",
      },
      {
        name: "Q Sports Bar",
        description: "Big screens, TAB and Keno. Come for the sport, stay for the atmosphere.",
      },
    ],
    highlights: [
      "Live music, trivia and weekly raffles",
      "Gaming lounge, TAB and Keno",
      "Weddings, conferences and corporate events",
      "Home of Brothers RLFC and Stan Williams Park",
      "Brothers Inspires community program",
    ],
    membership: {
      price: "$5",
      term: "a year",
      note: "Earn, save and redeem on food, drinks and promotions.",
    },
    accent: "#C5A25C",
    coords: { lat: -16.9121, lng: 145.745 },
    established: "1926",
    image: {
      src: "/img/cairns/exterior.jpg",
      alt: "Brothers Leagues Club Cairns lit up at dusk, with the curved Fratelli's balcony on the right.",
    },
    gallery: [
      {
        src: "/img/cairns/welcome.jpg",
        alt: "Two members raising a beer and a wine beside the water feature at Fratelli's.",
      },
      {
        src: "/img/cairns/bar.jpg",
        alt: "A bartender pulling a beer for two members at the Shamrock Bar.",
      },
      {
        src: "/img/cairns/football.jpg",
        alt: "A junior player in a Brothers Cairns jersey meeting a first grade star at the club.",
      },
      {
        src: "/img/cairns/park.jpg",
        alt: "Stan Williams Park from the air, with the new grandstand going up beside the main field.",
      },
    ],
  },
  {
    slug: "innisfail",
    name: "Brothers Leagues Club Innisfail",
    shortName: "Innisfail",
    city: "Innisfail",
    region: "Cassowary Coast",
    tagline: "The place to be",
    blurb:
      "More than five thousand members and one of the best social rooms on the Cassowary Coast, on the corner of Ernest and Campbell Street in the middle of town.",
    story:
      "Brothers Innisfail sits right in the centre of town and does the job a country club is supposed to do. Feed people well, put on a show worth leaving the house for, and hand the proceeds back to junior football and the groups that keep the district ticking. The club is midway through a renovation that will open up the bistro and lounge.",
    street: "Corner of Ernest and Campbell Street",
    suburb: "Innisfail",
    postcode: "QLD 4860",
    phone: "(07) 4061 7199",
    phoneHref: "+61740617199",
    website: "https://www.brothersinnisfail.com.au/",
    websiteLabel: "brothersinnisfail.com.au",
    hours: [
      { days: "Sunday to Tuesday", time: "10am to midnight" },
      { days: "Wednesday to Saturday", time: "10am to 2am" },
    ],
    hoursNote: "Trading 10am until late, seven days a week.",
    venues: [
      {
        name: "The Bistro",
        description: "Generous plates, sensible prices and a menu that suits the whole table.",
      },
      {
        name: "The Cafe",
        description: "Coffee, cake and a quiet corner while the club warms up.",
      },
      {
        name: "Gaming and TAB",
        description: "Pokies, Keno and TAB with the racing on every screen.",
      },
    ],
    highlights: [
      "Live entertainment most weekends",
      "Weekly members promotions and draws",
      "Function space for parties and wakes",
      "Proud supporter of Innisfail Brothers football",
      "Renovations underway across the club",
    ],
    membership: {
      price: "Ask at the club",
      term: "",
      note: "Over 5,000 locals have already signed up on the Cassowary Coast.",
    },
    accent: "#3F7A57",
    coords: { lat: -17.5233, lng: 146.0301 },
    image: {
      src: "/img/innisfail/exterior.jpg",
      alt: "A render of the renovated Brothers Leagues Club Innisfail, with an open bar and terrace out the front.",
    },
    gallery: [
      {
        src: "/img/innisfail/steak.jpg",
        alt: "A char grilled steak with vegetables, plated in the bistro.",
      },
      {
        src: "/img/innisfail/lounge.jpg",
        alt: "The lounge at Innisfail, with Keno screens and armchairs under a green light feature.",
      },
      {
        src: "/img/innisfail/pokies.jpg",
        alt: "The gaming room at Innisfail with rows of machines.",
      },
      {
        src: "/img/innisfail/table.jpg",
        alt: "A long table set with glassware, ready for a function.",
      },
    ],
  },
  {
    slug: "townsville",
    name: "Brothers Leagues Club Townsville",
    shortName: "Townsville",
    city: "Townsville",
    region: "North Queensland",
    tagline: "Home of the Mendi Blackhawks",
    blurb:
      "Four dining rooms, a playzone for the kids, a courtesy car home and a trophy cabinet that includes Club of the Year and eight North Queensland club titles.",
    story:
      "Brothers Townsville is the home of the Townsville and Districts Mendi Blackhawks and Brothers Rugby League Townsville. It was named Club of the Year and Best Football Club in 2021, has taken Best Club North Queensland eight times, and produced the Queensland Club Chef of the Year in 2019. Every dollar of profit goes back to members and to the community.",
    street: "14 Golf Links Drive",
    suburb: "Kirwan",
    postcode: "QLD 4817",
    phone: "(07) 4773 8000",
    phoneHref: "+61747738000",
    website: "https://brotherstsv.com.au/",
    websiteLabel: "brotherstsv.com.au",
    hours: [{ days: "Seven days", time: "10am to 2am" }],
    venues: [
      {
        name: "Circa 20",
        description: "The club's restaurant, and the room you book when it matters.",
      },
      {
        name: "QUBE Cafe",
        description: "Coffee, breakfast and something quick between errands.",
      },
      {
        name: "Victory Bar and Grill",
        description: "Steaks, schnitzels and a cold one, done properly.",
      },
      {
        name: "Bootz Sports Bar",
        description: "Every game on, with TAB and Keno at your elbow.",
      },
    ],
    highlights: [
      "Kids Eat Free and the Leprechauns Playzone",
      "Gaming, TAB, Keno and Brothers Cash Bingo",
      "Clover Rewards for members",
      "Courtesy car to get you home",
      "$50,000 community grants fund",
    ],
    membership: {
      price: "$2",
      term: "to join",
      note: "Clover Rewards points on everything you spend.",
    },
    accent: "#B4573C",
    coords: { lat: -19.3057, lng: 146.7285 },
    image: {
      src: "/img/townsville/functions.jpg",
      alt: "A function room at Brothers Townsville set out for a presentation, with chandeliers overhead.",
    },
    gallery: [
      {
        src: "/img/townsville/bistro.jpg",
        alt: "A plate of chicken with corn salsa being carried to a table.",
      },
      {
        src: "/img/townsville/gaming.jpg",
        alt: "The gaming floor at Townsville, lit purple under a circular jackpot display.",
      },
      {
        src: "/img/townsville/kids.jpg",
        alt: "The Leprechauns Playzone, with a soft play area and a climbing frame behind it.",
      },
      {
        src: "/img/townsville/party.jpg",
        alt: "A function room set with round tables and balloons for a twenty first.",
      },
    ],
  },
  {
    slug: "ipswich",
    name: "Brothers Leagues Club Ipswich",
    shortName: "Ipswich",
    city: "Ipswich",
    region: "South East Queensland",
    tagline: "Savour, sip and spin",
    blurb:
      "Fifty years of looking after Ipswich, with a restaurant, a cafe, a sports bar, a bottle shop, a kids room and a $100,000 community grant program.",
    story:
      "Becoming a member at Brothers Ipswich means joining a community club that has proudly supported the city for more than fifty years. The club runs Brothers Helping Others, a $100,000 community grant program, alongside a full week of dining, gaming and entertainment. There are no public holiday surcharges, ever.",
    street: "20 Wildey Street",
    suburb: "Raceview",
    postcode: "QLD 4305",
    phone: "(07) 3817 2999",
    phoneHref: "+61738172999",
    email: "information@brothersipswich.com.au",
    website: "https://brothersipswich.com.au/",
    websiteLabel: "brothersipswich.com.au",
    hours: [{ days: "Seven days", time: "10am to 2am" }],
    hoursNote:
      "Closed Good Friday and Christmas Day. Open from 1pm on ANZAC Day. No public holiday surcharges.",
    venues: [
      {
        name: "The Restaurant",
        description: "The main dining room, open for lunch and dinner every day.",
      },
      {
        name: "The Cafe",
        description: "Coffee and a light bite, right by the front door.",
      },
      {
        name: "Bars and Lounge",
        description: "Somewhere comfortable to sit, whatever the occasion.",
      },
      {
        name: "Sports Bar and Bottle Shop",
        description: "The footy on, and a cold one to take home.",
      },
    ],
    highlights: [
      "248 gaming machines on the floor",
      "Kids room and outdoor playground",
      "Weddings, corporate events and parties",
      "Brothers Helping Others community grants",
      "No public holiday surcharges",
    ],
    membership: {
      price: "$5",
      term: "for five years",
      note: "Fifty years of looking after Ipswich.",
    },
    accent: "#2F6C7A",
    coords: { lat: -27.6428, lng: 152.7723 },
    image: {
      src: "/img/ipswich/exterior.webp",
      alt: "The lit entrance canopy at Brothers Leagues Club Ipswich at dusk, with palms alongside.",
    },
    gallery: [
      {
        src: "/img/ipswich/platter.webp",
        alt: "A share plate of ribs, chicken, chips and slaw from the restaurant.",
      },
      {
        src: "/img/ipswich/cocktail.webp",
        alt: "A cocktail on the bar, backlit by the spirits shelf.",
      },
      {
        src: "/img/ipswich/kids.webp",
        alt: "The kids room at Ipswich, with soft play in front and a climbing frame behind.",
      },
      {
        src: "/img/ipswich/functions.webp",
        alt: "The function room set with round tables, white linen and sage sashes for a wedding.",
      },
    ],
  },
];

export function clubBySlug(slug: string): Club | undefined {
  return clubs.find((club) => club.slug === slug);
}

export function fullAddress(club: Club): string {
  return `${club.street}, ${club.suburb} ${club.postcode}`;
}

export function mapsEmbed(club: Club): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(club))}&output=embed`;
}

export function mapsDirections(club: Club): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress(club)
  )}`;
}
