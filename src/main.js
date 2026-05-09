import { initLayout } from './components/layout.js'
import { getStats, getProjects, getNews, getSiteContent } from './db.js'

document.addEventListener('DOMContentLoaded', async () => {
  initLayout();
  if (window.lucide) window.lucide.createIcons();
  await initDynamicContent();
  initScrollReveal();
  initCounterAnimations();
  initCursorGlow();
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const set = (selector, value, attr = 'innerText') => {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el[attr] = value;
};

const optimizeImage = (url, width = 800) => {
  if (url && url.includes('ucarecdn.com') && !url.includes('-/preview')) {
    const separator = url.endsWith('/') ? '' : '/';
    return `${url}${separator}-/format/auto/-/quality/smart/-/preview/${width}x${width}/`;
  }
  return url;
};

// ─── MAIN LOADER ──────────────────────────────────────────────────────────────
async function initDynamicContent() {
  const [stats, projects, news, content] = await Promise.all([
    getStats(), getProjects(), getNews(), getSiteContent()
  ]);

  renderSiteContent(content);
  renderStats(stats);
  renderProjects(projects);
  renderNews(news);

  // Re-run icons after dynamic content injected
  if (window.lucide) window.lucide.createIcons();
}

// ─── SITE CONTENT ─────────────────────────────────────────────────────────────
function renderSiteContent(c) {
  // ── Inject all text first (elements still invisible) ──
  set('.hero-title',    c.heroTitle);
  set('.hero-subtitle', c.heroSubtitle);
  set('.mission-title', c.missionTitle);
  set('.mission-text',  c.missionText);
  set('.pillar-1-title', c.p1Title);
  set('.pillar-1-text',  c.p1Text);
  set('.pillar-2-title', c.p2Title);
  set('.pillar-2-text',  c.p2Text);
  set('.pillar-3-title', c.p3Title);
  set('.pillar-3-text',  c.p3Text);
  set('.cta-title', c.ctaTitle);
  set('.cta-text',  c.ctaText);

  // ── Fade in all db-content elements now text is ready ──
  document.querySelectorAll('.db-content').forEach(el => {
    el.style.opacity = '1';
  });

  // ── Hero background: pre-load image then cross-fade ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && c.heroImage) {
    const optimizedHeroUrl = optimizeImage(c.heroImage, 1600);
    const img = new Image();
    img.src = optimizedHeroUrl;
    const applyBg = () => {
      heroBg.style.transition = 'opacity 0.6s ease';
      heroBg.style.opacity = '0';
      requestAnimationFrame(() => {
        heroBg.style.backgroundImage = `url('${optimizedHeroUrl}')`;
        heroBg.style.opacity = '1';
      });
    };
    // Apply immediately if already cached, else wait for load
    if (img.complete) {
      applyBg();
    } else {
      img.onload = applyBg;
      img.onerror = applyBg; // show whatever we have on error
    }
  }
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function renderStats(stats) {
  document.querySelectorAll('.counter-value[data-stat]').forEach(el => {
    const key = el.getAttribute('data-stat');
    if (stats[key] !== undefined) {
      el.setAttribute('data-target', stats[key]);
    }
  });
}

// ─── PROJECTS GRID ────────────────────────────────────────────────────────────
let allProjectsData = [];

function renderProjects(projects) {
  allProjectsData = projects;
  const grid = document.getElementById('projects-grid');
  const loading = document.getElementById('projects-loading');
  if (!grid) return;

  // Hide skeleton, show real grid
  if (loading) loading.classList.add('hidden');
  grid.classList.remove('hidden');

  const isHome = window.location.pathname === '/' ||
                 window.location.pathname.endsWith('index.html') ||
                 window.location.pathname === '';
  const items = isHome ? projects.slice(0, 3) : projects;

  renderProjectCards(grid, items);
  initFilterButtons(projects);
}

function renderProjectCards(grid, items) {
  if (items.length === 0) {
    grid.innerHTML = `<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No projects found. Add some in the Admin panel.</p>`;
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="group reveal-on-scroll bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div class="relative h-72 overflow-hidden bg-gray-100">
        <img src="${optimizeImage(p.image) || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600'}"
             alt="${p.title}"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 img-fade-in"
             onload="this.classList.add('loaded')"
             onerror="this.src='https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600';this.classList.add('loaded')">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span class="absolute bottom-5 left-5 bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          ${p.category}
        </span>
      </div>
      <div class="p-8">
        <h3 class="text-2xl font-bold mb-3 group-hover:text-green-900 transition-colors">${p.title}</h3>
        <p class="text-gray-500 mb-6 line-clamp-2">${p.description}</p>
        <div class="space-y-3">
          <div class="flex justify-between text-sm font-bold">
            <span class="text-gray-400">Fundraising Progress</span>
            <span class="text-green-900">${p.progress || 0}% funded</span>
          </div>
          <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div class="bg-amber-600 h-full rounded-full transition-all duration-1000" style="width: ${p.progress || 0}%;"></div>
          </div>
          <a href="donate.html" class="inline-flex items-center gap-2 text-green-900 font-bold hover:text-amber-600 transition-colors text-sm pt-2">
            Support this project <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Reinitiate scroll observer for new cards
  initScrollReveal();
  if (window.lucide) window.lucide.createIcons();
}

function initFilterButtons(projects) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-green-900', 'text-white', 'shadow-lg');
        b.classList.add('bg-amber-50', 'text-green-900');
      });
      btn.classList.add('bg-green-900', 'text-white', 'shadow-lg');
      btn.classList.remove('bg-amber-50', 'text-green-900');

      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all' ? projects : projects.filter(p =>
        p.category?.toLowerCase() === filter.toLowerCase()
      );
      const grid = document.getElementById('projects-grid');
      renderProjectCards(grid, filtered);
    });
  });
}

// ─── NEWS GRID ────────────────────────────────────────────────────────────────
function renderNews(news) {
  const grid = document.getElementById('news-grid');
  const loading = document.getElementById('news-loading');
  if (!grid) return;

  // Hide skeleton, show real grid
  if (loading) loading.classList.add('hidden');
  grid.classList.remove('hidden');

  const isHome = window.location.pathname === '/' ||
                 window.location.pathname.endsWith('index.html') ||
                 window.location.pathname === '';
  const items = isHome ? news.slice(0, 3) : news;

  if (items.length === 0) {
    grid.innerHTML = `<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No news articles yet. Add some in the Admin panel.</p>`;
    return;
  }

  grid.innerHTML = items.map(n => `
    <div class="reveal-on-scroll bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-500 group">
      <div class="relative h-56 overflow-hidden bg-gray-100">
        <img src="${optimizeImage(n.image) || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600'}"
             alt="${n.title}"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 img-fade-in"
             onload="this.classList.add('loaded')"
             onerror="this.src='https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600';this.classList.add('loaded')">
      </div>
      <div class="p-8">
        <div class="flex items-center gap-3 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>${n.date || ''}</span>
          <span class="w-1 h-1 bg-amber-600 rounded-full"></span>
          <span>${n.category || ''}</span>
        </div>
        <h3 class="text-xl font-bold mb-3 group-hover:text-green-900 transition-colors leading-snug">${n.title}</h3>
        <p class="text-gray-500 mb-6 line-clamp-2">${n.excerpt || ''}</p>
        <a href="#" class="inline-flex items-center gap-2 font-bold text-green-900 hover:text-amber-600 transition-colors text-sm">
          Read Full Story <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  `).join('');

  initScrollReveal();
  if (window.lucide) window.lucide.createIcons();
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// ─── COUNTER ANIMATIONS ───────────────────────────────────────────────────────
function initCounterAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      if (!target) return;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.innerText = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(current).toLocaleString();
        }
      }, 16);
      observer.unobserve(counter);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter-value').forEach(c => observer.observe(c));
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(5,150,105,0.06),transparent 70%);z-index:0;transition:opacity 0.3s;opacity:0;';
  document.body.appendChild(glow);
  window.addEventListener('mousemove', (e) => {
    glow.style.left = (e.clientX - 200) + 'px';
    glow.style.top  = (e.clientY - 200) + 'px';
    glow.style.opacity = '1';
  });
}
