// FIREBASE CONFIGURATION
// These are your actual Firebase project settings
export const firebaseConfig = {
  apiKey: "AIzaSyCmt-ue01dziiK-S1BlSMnUH96ilyRxSMA",
  authDomain: "ngo-ke.firebaseapp.com",
  projectId: "ngo-ke",
  storageBucket: "ngo-ke.firebasestorage.app",
  messagingSenderId: "225584983873",
  appId: "1:225584983873:web:e8066613447ae146783bc0",
  measurementId: "G-5ED7ZVFG09"
};

// DATA SCHEMA & DEFAULTS
// These are used as a fallback if the database is empty
export const DEFAULT_CONTENT = {
  stats: {
    lives: 250000,
    youth: 15000,
    trees: 500000,
    scholarships: 1200
  },
  projects: [
    {
      id: "proj-1",
      title: "Digital Roots Program",
      category: "Education",
      description: "Providing high-speed internet and coding workshops to rural communities in East Africa.",
      progress: 75,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
    },
    {
      id: "proj-2",
      title: "Green Sahel Initiative",
      category: "Climate",
      description: "Fighting desertification through community-led reforestation and sustainable agriculture.",
      progress: 42,
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "proj-3",
      title: "Youth Tech Hubs",
      category: "Innovation",
      description: "Nurturing the next generation of African tech entrepreneurs with mentorship and seed funding.",
      progress: 90,
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  news: [
    {
      id: "news-1",
      date: "May 12, 2026",
      category: "Climate Action",
      title: "How Reforestation is Reviving the Sahel Communities",
      excerpt: "Discover the impact of our community-led initiatives in Mali and how they're fighting climate change...",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop"
    }
  ]
};
