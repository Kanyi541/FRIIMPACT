// Lucide icons loaded via CDN script in each HTML page

export function initLayout() {
  renderNavbar();
  renderFooter();
  renderExtraComponents();
  setupMobileMenu();
  setupModals();
  // createIcons from window.lucide (CDN)
  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 50);
}

function renderNavbar() {
  const header = document.querySelector('header');
  if (!header) return;
  header.className = 'fixed top-0 left-0 w-full z-50 transition-all duration-500';
  header.innerHTML = `
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <a href="index.html" class="text-2xl font-bold text-white flex items-center gap-2">
        <span class="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
          <i data-lucide="heart" class="text-white w-6 h-6"></i>
        </span>
        <span class="tracking-tight">AFRI<span class="text-yellow-400">IMPACT</span></span>
      </a>
      <div class="hidden lg:flex items-center gap-8">
        <a href="index.html" class="text-white/80 hover:text-white font-medium transition-colors">Home</a>
        <a href="about.html" class="text-white/80 hover:text-white font-medium transition-colors">About Us</a>
        <a href="projects.html" class="text-white/80 hover:text-white font-medium transition-colors">Projects</a>
        <a href="events.html" class="text-white/80 hover:text-white font-medium transition-colors">News & Events</a>
        <a href="donate.html" class="text-yellow-400 font-bold">Donate</a>
        <a href="contact.html" class="text-white/80 hover:text-white font-medium transition-colors">Contact</a>
      </div>
      <div class="flex items-center gap-4">
        <a href="donate.html" class="hidden md:block bg-amber-600 hover:bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full transition-all text-sm">Join Movement</a>
        <button id="mobile-menu-btn" class="lg:hidden text-white p-2">
          <i data-lucide="menu" class="w-8 h-8"></i>
        </button>
      </div>
    </nav>
    <div id="mobile-menu" class="fixed inset-0 bg-green-950 z-50 translate-x-full transition-transform duration-500 lg:hidden">
      <div class="flex justify-end p-6">
        <button id="close-menu-btn" class="text-white"><i data-lucide="x" class="w-8 h-8"></i></button>
      </div>
      <div class="flex flex-col items-center gap-8 pt-12 text-2xl">
        <a href="index.html" class="text-white hover:text-yellow-400 transition-colors">Home</a>
        <a href="about.html" class="text-white hover:text-yellow-400 transition-colors">About Us</a>
        <a href="projects.html" class="text-white hover:text-yellow-400 transition-colors">Projects</a>
        <a href="events.html" class="text-white hover:text-yellow-400 transition-colors">News & Events</a>
        <a href="donate.html" class="text-yellow-400 font-bold">Donate</a>
        <a href="contact.html" class="text-white hover:text-yellow-400 transition-colors">Contact</a>
        <a href="donate.html" class="mt-8 bg-amber-600 text-white font-bold px-8 py-3 rounded-full">Donate Now</a>
      </div>
    </div>
  `;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-green-950/90', 'backdrop-blur-md', 'shadow-xl');
    } else {
      header.classList.remove('bg-green-950/90', 'backdrop-blur-md', 'shadow-xl');
    }
  });
}

function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.className = 'bg-green-950 text-white pt-20 pb-10';
  footer.innerHTML = `
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <a href="index.html" class="text-2xl font-bold flex items-center gap-2 mb-6">
            <span class="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <i data-lucide="heart" class="text-white w-6 h-6"></i>
            </span>
            <span>AFRI<span class="text-yellow-400">IMPACT</span></span>
          </a>
          <p class="text-white/60 mb-8 leading-relaxed">Empowering African communities through sustainable innovation, education, and climate action.</p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
              <i data-lucide="facebook" class="w-5 h-5 text-white/60"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
              <i data-lucide="twitter" class="w-5 h-5 text-white/60"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
              <i data-lucide="instagram" class="w-5 h-5 text-white/60"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
              <i data-lucide="linkedin" class="w-5 h-5 text-white/60"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-6">Quick Links</h4>
          <ul class="space-y-4 text-white/60">
            <li><a href="about.html" class="hover:text-yellow-400 transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4"></i> About Our Mission</a></li>
            <li><a href="projects.html" class="hover:text-yellow-400 transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4"></i> Ongoing Projects</a></li>
            <li><a href="events.html" class="hover:text-yellow-400 transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4"></i> Latest News</a></li>
            <li><a href="donate.html" class="hover:text-yellow-400 transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4"></i> Ways to Give</a></li>
            <li><a href="contact.html" class="hover:text-yellow-400 transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4"></i> Partner With Us</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-6">Impact Areas</h4>
          <ul class="space-y-4 text-white/60">
            <li class="flex items-center gap-3"><i data-lucide="graduation-cap" class="w-5 h-5 text-yellow-400"></i> Quality Education</li>
            <li class="flex items-center gap-3"><i data-lucide="tree-deciduous" class="w-5 h-5 text-yellow-400"></i> Climate Action</li>
            <li class="flex items-center gap-3"><i data-lucide="users" class="w-5 h-5 text-yellow-400"></i> Youth Innovation</li>
            <li class="flex items-center gap-3"><i data-lucide="globe" class="w-5 h-5 text-yellow-400"></i> Social Empowerment</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-6">Newsletter</h4>
          <p class="text-white/60 mb-6 text-sm">Stay updated with our stories from the field.</p>
          <form class="space-y-4">
            <div class="relative">
              <input type="email" placeholder="Email Address" class="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-600 transition-colors">
              <button type="submit" class="absolute right-2 top-2 bg-amber-600 hover:bg-yellow-400 p-2 rounded-md transition-colors">
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
        <p>&copy; 2026 AfriImpact NGO. All Rights Reserved. Reg: NGO/INT/2026/001</p>
        <div class="flex gap-8">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-white transition-colors">Transparency Report</a>
        </div>
      </div>
    </div>
  `;
}

function renderExtraComponents() {
  // Scroll progress bar
  const progress = document.createElement('div');
  progress.id = 'scroll-progress';
  progress.className = 'fixed top-0 left-0 h-1 bg-amber-600 z-[100]';
  progress.style.width = '0%';
  progress.style.transition = 'width 0.1s';
  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
  });

  // Chatbot widget
  const chatbot = document.createElement('div');
  chatbot.id = 'chatbot-widget';
  chatbot.className = 'fixed bottom-8 right-8 z-50';
  chatbot.innerHTML = `
    <button id="chatbot-toggle" class="w-16 h-16 bg-green-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-amber-600">
      <i data-lucide="message-square" class="w-8 h-8"></i>
    </button>
    <div id="chatbot-panel" class="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hidden opacity-0 translate-y-4">
      <div class="bg-green-900 p-5 text-white flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-amber-600 rounded-full flex items-center justify-center">
            <i data-lucide="heart" class="w-4 h-4"></i>
          </div>
          <div>
            <h4 class="font-bold text-sm">Impact Assistant</h4>
            <p class="text-xs text-white/60">Always online</p>
          </div>
        </div>
        <button id="close-chatbot"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div class="h-64 p-5 overflow-y-auto bg-amber-50/30 space-y-3">
        <div class="flex gap-2 max-w-[85%]">
          <div class="w-7 h-7 bg-green-900 rounded-full flex items-center justify-center shrink-0 mt-1">
            <i data-lucide="heart" class="w-3 h-3 text-white"></i>
          </div>
          <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700">
            Hello! How can I help you support our mission today?
          </div>
        </div>
      </div>
      <div class="p-3 border-t border-gray-100 flex gap-2">
        <input type="text" placeholder="Type a message..." class="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
        <button class="bg-green-900 text-white p-2 rounded-xl hover:bg-amber-600 transition-colors">
          <i data-lucide="send" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(chatbot);

  // Donation modal
  const modal = document.createElement('div');
  modal.id = 'donation-modal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-green-950/80 backdrop-blur-md hidden opacity-0 transition-opacity duration-300';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full p-10 relative shadow-2xl mx-4">
      <button id="close-modal" class="absolute top-6 right-6 text-gray-300 hover:text-gray-700 transition-colors">
        <i data-lucide="x" class="w-7 h-7"></i>
      </button>
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i data-lucide="heart" class="w-8 h-8 text-amber-600"></i>
        </div>
        <h3 class="text-2xl font-black text-green-900 mb-2">Join the Movement</h3>
        <p class="text-gray-500 text-sm">Your support changes lives today.</p>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button class="py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-amber-600 hover:bg-amber-50 transition-all text-gray-700">$25</button>
        <button class="py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-amber-600 hover:bg-amber-50 transition-all text-gray-700">$50</button>
        <button class="py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-amber-600 hover:bg-amber-50 transition-all text-gray-700">$100</button>
        <button class="py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-amber-600 hover:bg-amber-50 transition-all text-gray-700">Custom</button>
      </div>
      <a href="donate.html" class="block w-full text-center bg-amber-600 hover:bg-yellow-400 text-white font-bold py-4 rounded-xl transition-all">Donate Now</a>
      <p class="text-center text-xs text-gray-400 mt-4 uppercase tracking-widest">100% Encrypted & Secure</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => menu?.classList.remove('translate-x-full'));
  closeBtn?.addEventListener('click', () => menu?.classList.add('translate-x-full'));
}

function setupModals() {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const closeChat = document.getElementById('close-chatbot');
  const modal = document.getElementById('donation-modal');
  const closeModal = document.getElementById('close-modal');

  toggle?.addEventListener('click', () => {
    const hidden = panel.classList.contains('hidden');
    if (hidden) {
      panel.classList.remove('hidden');
      setTimeout(() => panel.classList.remove('opacity-0', 'translate-y-4'), 10);
    } else {
      panel.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => panel.classList.add('hidden'), 300);
    }
  });

  closeChat?.addEventListener('click', () => {
    panel?.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => panel?.classList.add('hidden'), 300);
  });

  closeModal?.addEventListener('click', () => {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
  });

  // Auto-show modal after 12 seconds
  if (!sessionStorage.getItem('modalSeen')) {
    setTimeout(() => {
      modal?.classList.remove('hidden');
      setTimeout(() => modal?.classList.remove('opacity-0'), 10);
      sessionStorage.setItem('modalSeen', '1');
    }, 12000);
  }
}
