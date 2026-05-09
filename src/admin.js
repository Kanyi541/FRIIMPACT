import { getStats, updateStats, getProjects, saveProject, deleteProject, getNews, saveNews, deleteNews, getSiteContent, updateSiteContent } from "./db.js";

// --- NAVIGATION ---
window.showTab = (tabName) => {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.getElementById(`content-${tabName}`).classList.remove('hidden');
  
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active-tab'));
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-tab');
  
  const title = tabName.charAt(0).toUpperCase() + tabName.slice(1);
  document.getElementById('current-tab-title').innerText = title + " Management";
  
  if (tabName === 'projects') loadProjects();
  if (tabName === 'stats') loadStats();
  if (tabName === 'news') loadNews();
  if (tabName === 'content') loadSiteContent();
};

// --- STATE & UI HELPERS ---
let allProjects = [];

const showStatus = (msg, isError = false) => {
  const status = document.getElementById('status-message');
  if (!status) return;
  status.innerText = msg;
  status.className = `px-4 py-2 rounded-lg font-medium block ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
  setTimeout(() => { if(status) status.className = 'hidden' }, 3000);
};

// --- SITE CONTENT MANAGEMENT ---
const loadSiteContent = async () => {
    const content = await getSiteContent();
    document.getElementById('site-hero-title').value = content.heroTitle;
    document.getElementById('site-hero-subtitle').value = content.heroSubtitle;
    
    const heroWidget = uploadcare.Widget('#site-hero-img');
    heroWidget.value(content.heroImage);

    document.getElementById('site-mission-title').value = content.missionTitle;
    document.getElementById('site-mission-text').value = content.missionText;

    // New Fields
    document.getElementById('site-p1-title').value = content.p1Title;
    document.getElementById('site-p1-text').value = content.p1Text;
    document.getElementById('site-p2-title').value = content.p2Title;
    document.getElementById('site-p2-text').value = content.p2Text;
    document.getElementById('site-p3-title').value = content.p3Title;
    document.getElementById('site-p3-text').value = content.p3Text;

    document.getElementById('site-cta-title').value = content.ctaTitle;
    document.getElementById('site-cta-text').value = content.ctaText;
};

document.getElementById('site-content-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = {
        heroTitle: document.getElementById('site-hero-title').value,
        heroSubtitle: document.getElementById('site-hero-subtitle').value,
        heroImage: document.getElementById('site-hero-img').value,
        missionTitle: document.getElementById('site-mission-title').value,
        missionText: document.getElementById('site-mission-text').value,
        p1Title: document.getElementById('site-p1-title').value,
        p1Text: document.getElementById('site-p1-text').value,
        p2Title: document.getElementById('site-p2-title').value,
        p2Text: document.getElementById('site-p2-text').value,
        p3Title: document.getElementById('site-p3-title').value,
        p3Text: document.getElementById('site-p3-text').value,
        ctaTitle: document.getElementById('site-cta-title').value,
        ctaText: document.getElementById('site-cta-text').value
    };
    await updateSiteContent(content);
    showStatus("Site content updated successfully!");
});

// --- STATS MANAGEMENT ---
const loadStats = async () => {
  const stats = await getStats();
  document.getElementById('inp-lives').value = stats.lives;
  document.getElementById('inp-youth').value = stats.youth;
  document.getElementById('inp-trees').value = stats.trees;
  document.getElementById('inp-scholarships').value = stats.scholarships;
  document.getElementById('stat-lives-count').innerText = stats.lives.toLocaleString();
};

document.getElementById('stats-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const stats = {
    lives: parseInt(document.getElementById('inp-lives').value),
    youth: parseInt(document.getElementById('inp-youth').value),
    trees: parseInt(document.getElementById('inp-trees').value),
    scholarships: parseInt(document.getElementById('inp-scholarships').value)
  };
  await updateStats(stats);
  showStatus("Statistics updated successfully!");
});

// --- PROJECT MANAGEMENT (UPLOADCARE) ---
const loadProjects = async () => {
  allProjects = await getProjects();
  const list = document.getElementById('admin-projects-list');
  if (!list) return;
  document.getElementById('stat-projects-count').innerText = allProjects.length;
  
  list.innerHTML = allProjects.map(p => `
    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-center">
      <img src="${p.image}" class="w-20 h-20 rounded-2xl object-cover bg-gray-50">
      <div class="flex-grow">
        <h4 class="font-bold text-lg leading-tight">${p.title}</h4>
        <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">${p.category}</p>
        <div class="flex gap-4 mt-3">
          <button onclick="editProject('${p.id}')" class="text-blue-600 font-bold text-sm flex items-center gap-1">
            <i data-lucide="edit-3" class="w-3 h-3"></i> Edit
          </button>
          <button onclick="removeProject('${p.id}')" class="text-red-500 font-bold text-sm flex items-center gap-1">
            <i data-lucide="trash-2" class="w-3 h-3"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
  if (window.lucide) window.lucide.createIcons();
};

window.addNewProjectForm = (data = null) => {
  const container = document.getElementById('multi-project-container');
  const formId = 'form-' + Date.now() + Math.random().toString(36).substr(2, 9);
  
  const formHtml = `
    <div id="${formId}" class="project-form-block bg-gray-50 p-8 rounded-[2rem] border border-gray-200 relative group">
      <button onclick="this.parentElement.remove()" class="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      <input type="hidden" class="proj-id" value="${data?.id || ''}">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-gray-400">Project Title</label>
            <input type="text" class="proj-title w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-900" placeholder="e.g. Clean Water Initiative" value="${data?.title || ''}" required>
        </div>
        <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-gray-400">Category</label>
            <input type="text" class="proj-cat w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-900" placeholder="e.g. Health" value="${data?.category || ''}" required>
        </div>
        <div class="md:col-span-2 space-y-2">
            <label class="text-[10px] font-black uppercase text-gray-400">Description</label>
            <textarea class="proj-desc w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-900" rows="2" placeholder="Tell us about the impact..." required>${data?.description || ''}</textarea>
        </div>
        <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-gray-400">Funding %</label>
            <input type="number" class="proj-progress w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-900" placeholder="75" value="${data?.progress || ''}" required>
        </div>
        <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-gray-400">Project Image (Uploadcare)</label>
            <div class="relative uploadcare-field">
                <input type="hidden" class="proj-img" role="uploadcare-uploader" data-public-key="47f3f235703636e00a62" value="${data?.image || ''}">
            </div>
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', formHtml);
  if (window.lucide) window.lucide.createIcons();
  
  // Initialize Uploadcare for the new block
  uploadcare.Widget(document.getElementById(formId).querySelector('.proj-img'));
};

window.openProjectModal = () => {
  document.getElementById('multi-project-container').innerHTML = '';
  addNewProjectForm();
  document.getElementById('project-modal').classList.remove('hidden');
};

window.editProject = (id) => {
  const p = allProjects.find(p => p.id === id);
  if (!p) return;
  document.getElementById('multi-project-container').innerHTML = '';
  addNewProjectForm(p);
  document.getElementById('project-modal').classList.remove('hidden');
};

window.closeProjectModal = () => {
  document.getElementById('project-modal').classList.add('hidden');
};

window.saveAllProjects = async () => {
  const btn = document.getElementById('save-projects-btn');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Saving...`;
  if (window.lucide) window.lucide.createIcons();

  const blocks = document.querySelectorAll('.project-form-block');
  const projectsToSave = [];

  for (const block of blocks) {
    const imageUrl = block.querySelector('.proj-img').value;

    if (!imageUrl) {
        showStatus("Please upload an image for all projects", true);
        btn.disabled = false;
        btn.innerHTML = originalHtml;
        return;
    }

    projectsToSave.push({
      id: block.querySelector('.proj-id').value || 'new-' + Date.now() + Math.random(),
      title: block.querySelector('.proj-title').value,
      category: block.querySelector('.proj-cat').value,
      description: block.querySelector('.proj-desc').value,
      progress: parseInt(block.querySelector('.proj-progress').value),
      image: imageUrl
    });
  }

  try {
    for (const p of projectsToSave) {
      await saveProject(p);
    }
    showStatus(`Successfully saved ${projectsToSave.length} projects!`);
    closeProjectModal();
    loadProjects();
  } catch (error) {
    showStatus("Error saving projects", true);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
    if (window.lucide) window.lucide.createIcons();
  }
};

window.removeProject = async (id) => {
  if (confirm("Are you sure you want to delete this project?")) {
    await deleteProject(id);
    loadProjects();
    showStatus("Project deleted", true);
  }
};

// --- NEWS MANAGEMENT ---
const loadNews = async () => {
    const news = await getNews();
    const list = document.getElementById('admin-news-list');
    if (!list) return;
    document.getElementById('stat-news-count').innerText = news.length;
    
    list.innerHTML = news.map(n => `
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h4 class="font-bold text-lg">${n.title}</h4>
          <p class="text-xs text-gray-400 uppercase tracking-widest">${n.date} | ${n.category}</p>
        </div>
        <button onclick="removeNews('${n.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <i data-lucide="trash-2" class="w-5 h-5"></i>
        </button>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
};

window.removeNews = async (id) => {
    if (confirm("Delete this news article?")) {
      await deleteNews(id);
      loadNews();
    }
};

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
  loadStats();
  loadProjects();
  loadNews();
  loadSiteContent();
});
