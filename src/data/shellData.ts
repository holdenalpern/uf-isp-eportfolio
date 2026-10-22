export type RubricSectionId =
  | 'home'
  | 'about'
  | 'resume'
  | 'skills'
  | 'experiences'
  | 'reflection';

export interface RubricSectionMeta {
  id: RubricSectionId;
  label: string;
  shortLabel: string;
  rubricRequirement: string;
}

export const RUBRIC_SECTIONS: RubricSectionMeta[] = [
  { id: 'home', label: '01. Home', shortLabel: 'Home', rubricRequirement: 'Introduction, Hook & Portfolio Wayfinding' },
  { id: 'about', label: '02. About Me', shortLabel: 'About Me', rubricRequirement: 'Bio, Academic & Career Philosophy' },
  { id: 'resume', label: '03. Resume & Research', shortLabel: 'Resume & Poster', rubricRequirement: 'Interactive CV + PDF + Reykjavik Poster' },
  { id: 'skills', label: '04. NACE Skills (STAR)', shortLabel: 'NACE Skills', rubricRequirement: 'Four NACE Competencies via STAR Method' },
  { id: 'experiences', label: '05. Global Experiences', shortLabel: 'Global Experiences', rubricRequirement: 'International & Campus Exhibit Catalog' },
  { id: 'reflection', label: '06. Final Reflection', shortLabel: 'Final Reflection', rubricRequirement: '"So What? Now What?" Capstone Essay' },
];

export const PROFILE_SHELL = {
  name: 'Holden',
  program: 'UF International Scholars Program • Capstone ePortfolio',
  graduation: 'Spring / Fall 2026 Graduating Scholar',
  majors: ['B.S. Geology', 'B.S. Microbiology & Cell Science'],
  minor: 'Minor in History',
  tagline: 'Bridging Earth Systems, Microbial Ecology, and Human History Across Borders.',
  homeIntroPlaceholder:
    '[HOME SHELL < 400 WORDS] Earth and life sciences do not exist in a vacuum—they unfold inside human histories and cultures. From climbing the sandstone cliffs of Suesca, Colombia, to presenting scientific research in Reykjavik, Iceland, my time at the University of Florida shaped my mission to pair rigorous scientific inquiry with tangible cross-cultural service.',
  quote:
    '"I want to be a scientist, but I want to use science to inspire people, across cultures, to do great things." — Reflection at a waterfall outside Reykjavik, Iceland',
  aboutPlaceholder:
    '[ABOUT ME SHELL < 400 WORDS] Double-majoring in Geology and Microbiology with a minor in History at UF. Passionate about hydrology, microbial systems, rock climbing, and global history. Post-graduation goal: pursuing research with a direct human element and serving in the Peace Corps.',
  hobbies: ['Rock Climbing (Suesca & Indoor)', 'Hydrology & Geobiology', 'Latin American & Global History', 'Spanish Language & Cultural Immersion'],
};

export interface ExperienceShellItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'International Travel & Immersion' | 'Global Campus Activity' | 'International Research & Coursework';
  location: string;
  coordinates: string;
  mapX: number; // percentage 0-100 on world SVG
  mapY: number; // percentage 0-100 on world SVG
  date: string;
  hasPersonalPhotos: boolean;
  photoSlotLabels?: string[];
  curatedVisualTheme:
    | 'hydrology-pine'
    | 'afro-brazil-archive'
    | 'harn-aperture'
    | 'populism-kaleidoscope'
    | 'andes-climbing'
    | 'iceland-glacier'
    | 'cross-cultural-symposia';
  summaryPlaceholder: string;
  tags: string[];
}

export const GLOBAL_EXPERIENCES_SHELL: ExperienceShellItem[] = [
  {
    id: 'colombia-bogota',
    title: 'Bogotá & Suesca: Cultural Immersion, History & Sandstone Climbing',
    subtitle: 'Weeklong Immersion with Lucia’s Family & Estéreo Picnic Cross-Cultural Connection',
    category: 'International Travel & Immersion',
    location: 'Bogotá & Suesca, Colombia',
    coordinates: '4.7110° N, 74.0721° W',
    mapX: 29,
    mapY: 57,
    date: 'March & June 2025',
    hasPersonalPhotos: true,
    photoSlotLabels: ['Suesca Sandstone Crags', 'Family Finca Dominoes & Coffee', 'Virgilio Barco Library & Bogotá Tour'],
    curatedVisualTheme: 'andes-climbing',
    summaryPlaceholder:
      '[300+ WORD REFLECTION READY] Explores the radical hospitality of Lucia’s family, playing dominoes at their finca, rock climbing in Suesca, discussing Colombia’s civil conflict, improving Spanish, and rethinking American individualism.',
    tags: ['Cultural Immersion', 'Spanish Practice', 'Colombian History', 'Personal Photos Slot'],
  },
  {
    id: 'iceland-reykjavik',
    title: 'Reykjavik Research Conference & Waterfall Epistemology',
    subtitle: 'International Scientific Poster Presentation & Career Turning Point',
    category: 'International Research & Coursework',
    location: 'Reykjavik, Iceland',
    coordinates: '64.1466° N, 21.9426° W',
    mapX: 43,
    mapY: 19,
    date: 'Summer 2025',
    hasPersonalPhotos: true,
    photoSlotLabels: ['Reykjavik Conference Hall & Poster', 'Icelandic Waterfall & Basalt Columns', 'Geothermal Field Site'],
    curatedVisualTheme: 'iceland-glacier',
    summaryPlaceholder:
      '[RESEARCH + TRAVEL SLOT] Presenting scientific research on an international stage in Reykjavik, followed by a transformative realization in front of an Icelandic waterfall: science must stay tethered to human impact and Peace Corps service.',
    tags: ['International Research', 'Poster Presentation', 'Geology & Microbiology', 'Personal Photos Slot'],
  },
  {
    id: 'uf-south-africa-hydrology',
    title: 'Day Zero Lessons: Invasive Alien Plants as Water–Fire Risk Multipliers',
    subtitle: 'Center for African Studies Speaker — Dr. Tatenda Dalu (Stellenbosch University)',
    category: 'Global Campus Activity',
    location: 'Gainesville, FL → Cape Town, South Africa',
    coordinates: '33.9321° S, 18.8602° E',
    mapX: 55,
    mapY: 81,
    date: 'Sept 17, 2026',
    hasPersonalPhotos: false,
    curatedVisualTheme: 'hydrology-pine',
    summaryPlaceholder:
      '[UF EVENT REFLECTION READY — CURATED GRAPHIC CARD] Connects Geology (hydrology/water reservoirs) and Biology: how invasive pine and Red Gum trees deplete South African reservoirs ($400B+ global cost) and native fynbos restoration.',
    tags: ['Hydrology & Geosciences', 'Invasion Biology', 'South Africa', 'Typographic / Map Graphic'],
  },
  {
    id: 'uf-harn-one-world',
    title: 'One World: Photographs from a Shared Planet Exhibit',
    subtitle: 'Harn Museum of Art Global Photojournalism Reflection',
    category: 'Global Campus Activity',
    location: 'Harn Museum, UF (Global Scope)',
    coordinates: '29.6370° N, 82.3703° W',
    mapX: 25,
    mapY: 38,
    date: 'Sept 18, 2026',
    hasPersonalPhotos: false,
    curatedVisualTheme: 'harn-aperture',
    summaryPlaceholder:
      '[UF EVENT REFLECTION READY — CURATED ARCHIVAL CARD] Examining the "indomitable human spirit" across time and borders—from Afghanistan and Palestine (2006) to a UN refugee camp and Standing Rock.',
    tags: ['Visual Anthropology', 'Shared Humanity', 'Global Conflict', 'Museum Plaque Card'],
  },
  {
    id: 'uf-brazil-quilombos',
    title: 'COLOQUIO: Rethinking Human Rights through the African Diaspora',
    subtitle: 'A Brazilian Perspective — Dr. Sant’Ana',
    category: 'Global Campus Activity',
    location: 'Gainesville, FL → Brazil',
    coordinates: '12.9777° S, 38.5016° W',
    mapX: 36,
    mapY: 68,
    date: 'Sept 11, 2026',
    hasPersonalPhotos: false,
    curatedVisualTheme: 'afro-brazil-archive',
    summaryPlaceholder:
      '[UF EVENT REFLECTION READY — CURATED HISTORICAL CARD] Connects History minor to Brazil’s 1871 Law of the Free Womb, 1888 abolition, quilombo settlements, and four Afro-Brazilian thinkers who challenged post-abolition caste systems.',
    tags: ['History Minor', 'Afro-Brazilian History', 'Human Rights', 'Archival Typography'],
  },
  {
    id: 'uf-brazil-populism',
    title: 'COLOQUIO: The People in the Kaleidoscope — Bolsonarist Discourse',
    subtitle: 'Contemporary Populist Theories in Brazil — Dr. Luz',
    category: 'Global Campus Activity',
    location: 'Gainesville, FL → Brasília, Brazil',
    coordinates: '15.7975° S, 47.8919° W',
    mapX: 34,
    mapY: 71,
    date: 'Sept 25, 2026',
    hasPersonalPhotos: false,
    curatedVisualTheme: 'populism-kaleidoscope',
    summaryPlaceholder:
      '[UF EVENT REFLECTION READY — CURATED EDITORIAL CARD] Analyzing populism as a neutral political tool—outsider framing, digital mobilization in 2018 Brazil, cross-cultural parallels with US politics, and epistemic nuance.',
    tags: ['Political History', 'Comparative Politics', 'Brazil & US Parallels', 'Editorial Diagram'],
  },
];

export interface NaceSkillShell {
  id: string;
  competency: string;
  badgeCode: string;
  contextTitle: string;
  star: {
    situation: string;
    task: string;
    action: string;
    resolution: string;
  };
}

export const NACE_SKILLS_SHELL: NaceSkillShell[] = [
  {
    id: 'global-engagement',
    competency: 'Global & Cultural Engagement',
    badgeCode: 'NACE-01',
    contextTitle: 'Cross-Cultural Immersion in Bogotá & Suesca, Colombia',
    star: {
      situation: '[SITUATION SLOT] Staying for a week in Bogotá with a Colombian family I had met only briefly at Estéreo Picnic.',
      task: '[TASK SLOT] Navigate language barriers, unfamiliar social norms, and discussions on Colombian history and politics with humility.',
      action: '[ACTION SLOT] Engaged daily in Spanish over family meals, toured historic sites like the Virgilio Barco library, and climbed in Suesca.',
      resolution: '[RESOLUTION SLOT] Built lasting cross-cultural bonds, improved conversational Spanish, and pivoted career goals toward the Peace Corps.',
    },
  },
  {
    id: 'critical-thinking',
    competency: 'Critical Thinking',
    badgeCode: 'NACE-02',
    contextTitle: 'Synthesizing Hydrogeology & Invasion Biology Across Ecosystems',
    star: {
      situation: '[SITUATION SLOT] Investigating complex environmental feedbacks between geology (water tables) and biology (microbial/plant systems).',
      task: '[TASK SLOT] Evaluate how biological stressors impact hydrological reservoirs across global case studies (e.g., South Africa Day Zero).',
      action: '[ACTION SLOT] Integrated dual-major training in Geology and Microbiology to analyze multi-variable environmental data.',
      resolution: '[RESOLUTION SLOT] Formulated interdisciplinary research questions connecting subsurface earth processes to living ecosystems.',
    },
  },
  {
    id: 'communication',
    competency: 'Communication Skills (Written & Verbal)',
    badgeCode: 'NACE-03',
    contextTitle: 'Presenting Scientific Research Internationally in Reykjavik, Iceland',
    star: {
      situation: '[SITUATION SLOT] Selected to present specialized undergraduate scientific research at an international conference in Reykjavik.',
      task: '[TASK SLOT] Translate dense technical findings in geology/microbiology for an international, multidisciplinary audience.',
      action: '[ACTION SLOT] Designed a clear visual research poster and tailored verbal walkthroughs for researchers from diverse linguistic backgrounds.',
      resolution: '[RESOLUTION SLOT] Facilitated high-engagement poster Q&A sessions and gained international scientific communication confidence.',
    },
  },
  {
    id: 'career-self-dev',
    competency: 'Career & Self-Development',
    badgeCode: 'NACE-04',
    contextTitle: 'Integrating Pure Research with Human-Centered Global Service',
    star: {
      situation: '[SITUATION SLOT] Balancing a rigorous dual-STEM track (Geology + Microbiology) with a deep personal interest in human history.',
      task: '[TASK SLOT] Define a post-graduation trajectory that honors both scientific discovery and direct human connection.',
      action: '[ACTION SLOT] Pursued a History minor, ISP global lectures, Colombian immersion, and international conference presentation.',
      resolution: '[RESOLUTION SLOT] Clarified a cohesive path toward Peace Corps service and applied geobiological research.',
    },
  },
];

export const RESUME_TIMELINE_SHELL = [
  {
    id: 'edu-uf',
    category: 'Education',
    role: 'B.S. Geology & B.S. Microbiology | Minor in History',
    org: 'University of Florida • International Scholars Program',
    period: '2022 – 2026',
    location: 'Gainesville, FL',
    highlights: [
      'Dual STEM degree pairing Earth systems/hydrology with microbial ecology, complemented by historical analysis.',
      'International Scholars Program (ISP) Medallion Candidate.',
    ],
  },
  {
    id: 'res-iceland',
    category: 'Research & Fieldwork',
    role: 'Undergraduate Scientific Researcher & Conference Presenter',
    org: 'Reykjavik International Research Conference',
    period: '2025',
    location: 'Reykjavik, Iceland',
    highlights: [
      'Presented original scientific research poster to an international cohort of scientists in Reykjavik.',
      '[Interactive Resume Shell: Full lab duties & methodologies will be populated from your Resume PDF]',
    ],
  },
  {
    id: 'exp-field',
    category: 'Global & Leadership',
    role: 'Cross-Cultural Field & Historical Engagement',
    org: 'Bogotá, Colombia & UF Center for Latin American / African Studies',
    period: '2025 – 2026',
    location: 'Colombia / Gainesville, FL',
    highlights: [
      'Immersion in Bogotá and Suesca; advanced conversational Spanish and comparative historical inquiry.',
      'Post-graduation trajectory: Peace Corps & Applied Environmental/Microbial Research.',
    ],
  },
];

export const REYKJAVIK_POSTER_SHELL = {
  title: '[REYKJAVIK CONFERENCE POSTER SLOT] Integrating Geological Substrates & Microbial Dynamics',
  conference: 'Presented in Reykjavik, Iceland • 2025',
  authors: 'Holden et al. — University of Florida (Dept. of Geological Sciences / Microbiology & Cell Science)',
  abstractPlaceholder:
    'Interactive Poster Viewer Shell: When you share your Reykjavik poster PDF/image, this module lets visitors zoom into your Abstract, Methodology, Data Figures, and Conclusions—or open the full-resolution poster in a lightbox.',
  sections: [
    { label: '01. Abstract & Hypothesis', detail: 'Placeholder for research question bridging earth materials and microbial activity.' },
    { label: '02. Field / Lab Methodology', detail: 'Placeholder for sampling, geochemical analysis, and microbiological assays.' },
    { label: '03. Key Figures & Results', detail: 'Placeholder for primary charts, microscopy, or stratigraphic/hydrological plots.' },
    { label: '04. Global Significance', detail: 'Placeholder for environmental and real-world applications.' },
  ],
};

export const FINAL_REFLECTION_SHELL = {
  title: 'So What? Now What? — Science With a Human Pulse',
  wordCountTarget: '700+ Words Written Reflection (ISP Capstone Requirement)',
  leadPullQuote:
    'In front of a waterfall in Iceland, reflecting back on a week of kindness and coffee in Bogotá, I realized I did not want a scientific career detached from the people living on the landscapes I study.',
  pillars: [
    {
      heading: 'I. Beyond the Florida Bubble: History as Context for Science',
      summary:
        '[SECTION 1 SHELL] How studying Afro-Brazilian quilombos, Bolsonarist populism, and global photojournalism at the Harn Museum reshaped how I view social systems and historical inertia.',
    },
    {
      heading: 'II. The Bogotá & Reykjavik Inflection Point',
      summary:
        '[SECTION 2 SHELL] Contrasting the warmth of Lucia’s family in Colombia with the academic prestige of presenting research in Iceland—discovering that cross-cultural trust is as vital as empirical data.',
    },
    {
      heading: 'III. Now What? Peace Corps & Applied Geobiology',
      summary:
        '[SECTION 3 SHELL] Carrying Geology, Microbiology, and cultural humility into post-graduation service in the Peace Corps and future international scientific collaboration.',
    },
  ],
};
