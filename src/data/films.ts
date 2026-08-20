export type FilmProject = {
  slug: string;
  title: string;
  artist: string;
  youtubeId: string;
  uploadDate: string;
  year: number;
  genres: string[];
  role: string;
  location?: string;
  description: string;
};

export type FilmLandingPage = {
  slug: string;
  kind: "location" | "specialty";
  city?: string;
  region?: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  localCopy: string[];
  focusTitle: string;
  focusCopy: string;
  featuredProjects: string[];
};

export const showreel = {
  youtubeId: "ZE8c0QD2IVM",
  title: "Showreel FERD FILMS — réalisation de clips musicaux",
  description: "Sélection d’images de clips musicaux réalisés par FERD FILMS.",
  uploadDate: "2026-06-12",
} as const;

export const filmProjects: FilmProject[] = [
  {
    slug: "hipskor-belzebeat",
    artist: "HIPSKÖR",
    title: "Belzebeat",
    youtubeId: "jf5zgE9MIIk",
    uploadDate: "2025-09-26",
    year: 2025,
    genres: ["Metalcore"],
    role: "Réalisation",
    description: "Clip metalcore de HIPSKÖR réalisé par FERD FILMS.",
  },
  {
    slug: "mirizon-npc",
    artist: "Mirizon",
    title: "NPC",
    youtubeId: "HIjAeokm2Vk",
    uploadDate: "2024-11-14",
    year: 2024,
    genres: ["Metalcore"],
    role: "Réalisation",
    description: "Clip metalcore de Mirizon réalisé par FERD FILMS.",
  },
  {
    slug: "dtayl-wake-up-feat-dimi",
    artist: "DTAYL",
    title: "Wake Up (feat. Dimi)",
    youtubeId: "EGQuI82wow0",
    uploadDate: "2026-08-06",
    year: 2026,
    genres: ["Pop Punk"],
    role: "Réalisation",
    description: "Clip pop punk de DTAYL réalisé par FERD FILMS.",
  },
  {
    slug: "the-dislockers-iconify",
    artist: "The Dislockers",
    title: "Iconify",
    youtubeId: "v_Hb8w4xKlM",
    uploadDate: "2026-01-22",
    year: 2026,
    genres: ["Hardcore"],
    role: "Réalisation",
    description: "Clip hardcore de The Dislockers réalisé par FERD FILMS.",
  },
  {
    slug: "chrome-fear-melody-to-my-soul",
    artist: "Chrome Fear",
    title: "Melody To My Soul",
    youtubeId: "jQ72aX22f2M",
    uploadDate: "2025-12-15",
    year: 2025,
    genres: ["Metalcore"],
    role: "Réalisation",
    description: "Clip metalcore de Chrome Fear réalisé par FERD FILMS.",
  },
  {
    slug: "dissolve-shattered-minds-of-evolution",
    artist: "Dissolve",
    title: "Shattered Minds of Evolution",
    youtubeId: "9vD_xHAPFl4",
    uploadDate: "2024-08-22",
    year: 2024,
    genres: ["Death Metal"],
    role: "Réalisation",
    description: "Clip death metal de Dissolve réalisé par FERD FILMS.",
  },
];

export const filmLandingPages: FilmLandingPage[] = [
  {
    slug: "clip-video-nantes", kind: "location", city: "Nantes", region: "Loire-Atlantique",
    title: "Réalisation Clip Musical Nantes | FERD FILMS",
    metaDescription: "Réalisation de clips musicaux à Nantes. Direction artistique, tournage, montage et étalonnage pour artistes rock, métal, alternatif et indépendants.",
    h1: "Réalisation de clips musicaux à Nantes",
    eyebrow: "Nantes · Loire-Atlantique · France",
    intro: "Des clips conçus autour du morceau, de l’identité du groupe et du budget disponible.",
    localCopy: [
      "Basé à Saint-Herblain, aux portes de Nantes, FERD FILMS accompagne les artistes de Loire-Atlantique et du Grand Ouest, de la direction artistique à l’étalonnage.",
      "Le tournage peut se construire en studio, en salle, en extérieur ou dans un décor atypique. Je me déplace aussi partout en France lorsque le projet l’exige.",
    ],
    focusTitle: "Une image pensée pour la musique",
    focusCopy: "Rock, métal, alternatif, électro ou musique indépendante : la spécialisation nourrit une approche visuelle forte sans enfermer le projet dans un genre.",
    featuredProjects: ["hipskor-belzebeat", "dtayl-wake-up-feat-dimi", "mirizon-npc", "the-dislockers-iconify"],
  },
  {
    slug: "clip-video-rennes", kind: "location", city: "Rennes", region: "Ille-et-Vilaine",
    title: "Réalisation Clip Musical Rennes | FERD FILMS",
    metaDescription: "Réalisation de clips musicaux à Rennes et en Bretagne pour artistes rock, métal, alternatif et indépendants. Concept, tournage et post-production.",
    h1: "Réalisation de clips musicaux à Rennes",
    eyebrow: "Rennes · Bretagne · Déplacement depuis Nantes",
    intro: "Direction artistique, tournage et post-production pour donner au morceau un univers visuel cohérent.",
    localCopy: [
      "FERD FILMS intervient à Rennes et en Ille-et-Vilaine depuis Nantes. Cette proximité permet d’organiser repérages et tournages dans l’agglomération rennaise ou ailleurs en Bretagne.",
      "Studios, salles de concert, friches, extérieurs ou décors construits : le lieu est choisi pour servir le concept et rester cohérent avec les moyens du projet.",
    ],
    focusTitle: "Pour les scènes indépendantes",
    focusCopy: "Une affinité forte avec le rock, le métal et les musiques alternatives, tout en restant ouvert à l’électro et aux autres esthétiques indépendantes.",
    featuredProjects: ["the-dislockers-iconify", "chrome-fear-melody-to-my-soul", "hipskor-belzebeat", "dtayl-wake-up-feat-dimi"],
  },
  {
    slug: "clip-video-angers", kind: "location", city: "Angers", region: "Maine-et-Loire",
    title: "Réalisation Clip Musical Angers | FERD FILMS",
    metaDescription: "Réalisation de clips musicaux à Angers et en Maine-et-Loire. Direction artistique, tournage, montage et étalonnage pour artistes indépendants.",
    h1: "Réalisation de clips musicaux à Angers",
    eyebrow: "Angers · Maine-et-Loire · Déplacement depuis Nantes",
    intro: "Un dispositif de production agile pour transformer un morceau en images fortes.",
    localCopy: [
      "Depuis Nantes, FERD FILMS se déplace facilement à Angers et dans le Maine-et-Loire pour les repérages et le tournage d’un clip musical.",
      "Performance en salle, narration en extérieur, studio ou lieu singulier : le dispositif est construit selon l’identité de l’artiste, le concept et le budget.",
    ],
    focusTitle: "Du concept à l’image finale",
    focusCopy: "Direction artistique, préparation, tournage, montage et étalonnage forment un seul univers, avec une attention particulière aux projets rock, métal et alternatifs.",
    featuredProjects: ["mirizon-npc", "hipskor-belzebeat", "dissolve-shattered-minds-of-evolution", "the-dislockers-iconify"],
  },
  {
    slug: "realisation-clip-musical", kind: "specialty",
    title: "Réalisation de Clip Musical | FERD FILMS",
    metaDescription: "Réalisation de clips musicaux : direction artistique, préparation, tournage, montage et étalonnage pour artistes et groupes indépendants.",
    h1: "Réalisation de clips musicaux",
    eyebrow: "Direction artistique · Tournage · Post-production",
    intro: "Un accompagnement complet et léger, pensé pour donner une identité visuelle singulière au morceau.",
    localCopy: ["Chaque clip commence par la musique, les références de l’artiste et une discussion franche sur les moyens disponibles.", "Le concept, les décors, la lumière, le tournage, le montage et l’étalonnage sont ensuite pensés comme un même geste visuel."],
    focusTitle: "Une production à l’échelle du projet",
    focusCopy: "L’équipe et le matériel s’adaptent au concept : assez pour servir l’image, sans alourdir inutilement le tournage.",
    featuredProjects: ["dtayl-wake-up-feat-dimi", "hipskor-belzebeat", "mirizon-npc", "the-dislockers-iconify"],
  },
  {
    slug: "realisation-clip-metal", kind: "specialty",
    title: "Réalisation Clip Metal & Rock | FERD FILMS",
    metaDescription: "Réalisation de clips metal, metalcore, hardcore et rock pour groupes indépendants. Concept, tournage, montage, étalonnage et VFX selon le projet.",
    h1: "Réalisation de clips metal et rock",
    eyebrow: "Metal · Metalcore · Hardcore · Rock alternatif",
    intro: "Des images denses, physiques et cinématographiques, construites avec le groupe plutôt que plaquées sur le morceau.",
    localCopy: ["FERD FILMS connaît les codes du metal, du hardcore et du rock, mais cherche surtout ce qui rend chaque groupe identifiable : énergie de performance, narration, texture ou expérimentation.", "Le réalisateur accompagne le groupe du concept au montage, avec des VFX lorsque l’idée en a réellement besoin."],
    focusTitle: "L’intensité sans le cliché",
    focusCopy: "Une lumière, un rythme et un décor cohérents avec le morceau — sans reproduire automatiquement les mêmes images sombres ou les mêmes plans de performance.",
    featuredProjects: ["hipskor-belzebeat", "chrome-fear-melody-to-my-soul", "dissolve-shattered-minds-of-evolution", "the-dislockers-iconify", "mirizon-npc"],
  },
];

export const getFilmLandingPage = (slug: string) => filmLandingPages.find((page) => page.slug === slug);
export const getFilmProject = (slug: string) => filmProjects.find((project) => project.slug === slug);
export const youtubeThumbnail = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
