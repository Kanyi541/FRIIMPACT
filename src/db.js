import { DEFAULT_CONTENT } from "./firebase-config.js";

// Helper to save to LocalStorage (Demo Mode)
const saveToLocal = (key, data) => {
  localStorage.setItem(`afriimpact_${key}`, JSON.stringify(data));
};

// Helper to get from LocalStorage
const getFromLocal = (key) => {
  const data = localStorage.getItem(`afriimpact_${key}`);
  return data ? JSON.parse(data) : null;
};

// Helper to upload image and get URL (Fallback to Local Object URL)
export const uploadImage = async (file) => {
  return URL.createObjectURL(file);
};

// --- DATA ACCESS METHODS ---

export const getStats = async () => {
  return getFromLocal("stats") || DEFAULT_CONTENT.stats;
};

export const updateStats = async (stats) => {
  saveToLocal("stats", stats);
  return true;
};

export const getProjects = async () => {
  return getFromLocal("projects") || DEFAULT_CONTENT.projects;
};

export const saveProject = async (project) => {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index > -1) {
    projects[index] = project;
  } else {
    if (!project.id || project.id.startsWith('new-')) project.id = 'proj-' + Date.now();
    projects.push(project);
  }
  saveToLocal("projects", projects);
  return true;
};

export const deleteProject = async (id) => {
  const projects = await getProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveToLocal("projects", filtered);
};

export const getNews = async () => {
  return getFromLocal("news") || DEFAULT_CONTENT.news;
};

export const saveNews = async (article) => {
  const news = await getNews();
  const index = news.findIndex(n => n.id === article.id);
  if (index > -1) {
    news[index] = article;
  } else {
    if (!article.id || article.id.startsWith('new-')) article.id = 'news-' + Date.now();
    news.push(article);
  }
  saveToLocal("news", news);
};

export const deleteNews = async (id) => {
  const news = await getNews();
  const filtered = news.filter(n => n.id !== id);
  saveToLocal("news", filtered);
};

export const getSiteContent = async () => {
  return getFromLocal("site_content") || {
    heroTitle: "Empowering Africa's Future",
    heroSubtitle: "Join us in our mission to create sustainable change through education, climate action, and tech innovation.",
    heroImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    missionTitle: "Our Mission",
    missionText: "We believe in a future where every African community has the tools, knowledge, and resources to thrive independently in a rapidly changing world.",
    p1Title: "Education for All",
    p1Text: "Bridging the gap between potential and opportunity through modern digital literacy.",
    p2Title: "Climate Resilience",
    p2Text: "Protecting our ecosystems and empowering farmers with sustainable agricultural practices.",
    p3Title: "Tech for Good",
    p3Text: "Accelerating social impact through innovative technological solutions and infrastructure.",
    ctaTitle: "Join Our Global Community",
    ctaText: "Subscribe to our newsletter and receive monthly updates on our projects and stories of hope from across Africa."
  };
};

export const updateSiteContent = async (content) => {
  saveToLocal("site_content", content);
};
