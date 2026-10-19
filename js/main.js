/**
 * 个人网页交互核心脚本 (Next-Gen UI Engine)
 * 集成 GSAP 动效、Magic UI 光斑追踪、粒子 Canvas 背景与交互式终端
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PERSONAL_DATA;
  if (!data) {
    console.error('未找到 PERSONAL_DATA 数据配置，请检查 js/data.js 是否正确引入！');
    return;
  }

  // 1. 初始化核心视觉与动效引擎
  initParticlesBackground();
  initSpotlightCards();
  initTheme();
  initNavigation();
  initTypewriter(data.typewriterRoles);

  // 2. 渲染页面各模块
  renderHero(data.profile, data.metrics, data.terminalTabs);
  renderMarquee(data.marqueeSkills);
  renderAboutMe(data.aboutMe);
  renderSkills(data.skillCategories);
  renderProjects(data.projects, data.projectCategories);
  renderTimeline(data.timeline);
  renderArticles(data.articles);
  renderSocials(data.socials);
  
  // 3. 初始化交互系统
  initUptimeCounter(data.profile.siteStartDate);
  initModals(data.projects);
  initContactForm();
  initBackToTop();
  initGSAPAnimations();

  // 4. 刷新图标
  refreshLucide();
});

function refreshLucide() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   1. Magic UI 风格: 高性能背景交互粒子 Canvas
   ========================================================================== */
function initParticlesBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // 创建粒子群
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const dotColor = isDark ? 'rgba(99, 102, 241, 0.45)' : 'rgba(79, 70, 229, 0.3)';
    const lineColor = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.06)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // 鼠标排斥微交互
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // 粒子连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Magic UI: 光斑实时追踪 (Mouse Spotlight Tracking)
   ========================================================================== */
function initSpotlightCards() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. 主题切换模块 (Theme Engine: Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('site_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  applyTheme(currentTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }

  function applyTheme(theme, showNotice = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site_theme', theme);
    
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      refreshLucide();
    }

    if (showNotice) {
      showToast(`已切换至${theme === 'dark' ? '深色极客' : '浅色极简'}模式 🌓`);
    }
  }
}

/* ==========================================================================
   4. 导航与平滑滚动 (Navigation & Scroll Spy)
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-indigo-500', 'font-bold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-indigo-500', 'font-bold');
      }
    });
  });
}

/* ==========================================================================
   5. 打字机轮播文案 (Typewriter Subtitle)
   ========================================================================== */
function initTypewriter(roles) {
  const target = document.getElementById('typewriter-text');
  if (!target || !roles || roles.length === 0) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const delayBetweenWords = 2000;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }

  type();
}

/* ==========================================================================
   6. 渲染首屏与互动终端 (Hero & Terminal Playground)
   ========================================================================== */
function renderHero(profile, metrics, terminalTabs) {
  // 文本内容注入
  const nameEl = document.getElementById('hero-name');
  const bioEl = document.getElementById('hero-bio');
  const avatarEl = document.getElementById('hero-avatar');
  const statusEl = document.getElementById('hero-status');
  const locationEl = document.getElementById('hero-location');

  if (nameEl) nameEl.textContent = profile.name;
  if (bioEl) bioEl.textContent = profile.bio;
  if (avatarEl) avatarEl.src = profile.avatar;
  if (statusEl) statusEl.textContent = profile.statusText;
  if (locationEl) locationEl.textContent = profile.location;

  // 渲染量化指标卡片
  const metricsContainer = document.getElementById('metrics-container');
  if (metricsContainer && metrics) {
    metricsContainer.innerHTML = metrics.map(m => `
      <div class="spotlight-card p-5 text-center">
        <div class="text-2xl sm:text-3xl font-extrabold text-gradient font-display">${m.value}</div>
        <div class="text-xs sm:text-sm text-dim mt-1">${m.label}</div>
      </div>
    `).join('');
  }

  // 渲染交互终端 Tab 与代码
  const tabContainer = document.getElementById('terminal-tabs');
  const codeContent = document.getElementById('terminal-code-body');
  if (tabContainer && codeContent && terminalTabs) {
    const tabKeys = Object.keys(terminalTabs);
    tabContainer.innerHTML = tabKeys.map((tab, idx) => `
      <button class="terminal-tab ${idx === 0 ? 'active' : ''}" data-tab="${tab}">
        ${tab}
      </button>
    `).join('');

    codeContent.textContent = terminalTabs[tabKeys[0]];

    tabContainer.querySelectorAll('.terminal-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        tabContainer.querySelectorAll('.terminal-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-tab');
        codeContent.textContent = terminalTabs[tabKey];
      });
    });
  }
}

/* ==========================================================================
   7. Magic UI: 渲染无限滚动跑马灯 (Infinite Marquee Rail)
   ========================================================================== */
function renderMarquee(skills) {
  const track1 = document.getElementById('marquee-track-1');
  const track2 = document.getElementById('marquee-track-2');
  if (!track1 || !skills) return;

  const html = skills.map(s => `
    <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <div class="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
        <i data-lucide="${s.icon}" class="w-4 h-4"></i>
      </div>
      <span class="text-xs font-semibold text-title tracking-wide whitespace-nowrap">${s.name}</span>
    </div>
  `).join('');

  track1.innerHTML = html;
  if (track2) track2.innerHTML = html;
}

/* ==========================================================================
   8. 渲染关于我 Bento 卡片 (About Me Bento Grid)
   ========================================================================== */
function renderAboutMe(aboutMe) {
  const bioParasEl = document.getElementById('about-bio-paras');
  const tagsContainer = document.getElementById('about-tags');
  const focusContainer = document.getElementById('about-focus-list');

  if (bioParasEl && aboutMe.paragraphs) {
    bioParasEl.innerHTML = aboutMe.paragraphs.map(p => `
      <p class="text-body leading-relaxed text-sm sm:text-base">${p}</p>
    `).join('');
  }

  if (tagsContainer && aboutMe.tags) {
    tagsContainer.innerHTML = aboutMe.tags.map(tag => `
      <span class="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/20">
        ${tag}
      </span>
    `).join('');
  }

  if (focusContainer && aboutMe.currentFocus) {
    focusContainer.innerHTML = aboutMe.currentFocus.map(item => `
      <div class="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
        <div class="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 mt-0.5">
          <i data-lucide="${item.icon}" class="w-4 h-4"></i>
        </div>
        <div>
          <h4 class="font-bold text-sm text-title">${item.title}</h4>
          <p class="text-xs text-dim mt-0.5 leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   9. 渲染技能栈专长 (Tech Arsenal)
   ========================================================================== */
function renderSkills(categories) {
  const container = document.getElementById('skills-container');
  if (!container || !categories) return;

  container.innerHTML = categories.map(cat => `
    <div class="spotlight-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-lg text-title font-display">${cat.category}</h3>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/20 font-mono">
            ${cat.skills.length} 项
          </span>
        </div>
        <p class="text-xs text-dim mb-6 leading-relaxed">${cat.description}</p>
        
        <div class="space-y-4">
          ${cat.skills.map(skill => `
            <div>
              <div class="flex items-center justify-between text-xs font-medium mb-1.5">
                <span class="flex items-center gap-1.5 text-title">
                  <i data-lucide="${skill.icon}" class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400"></i>
                  ${skill.name}
                </span>
                <span class="text-dim font-mono">${skill.level}%</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-2 rounded-full skill-progress-bar" style="width: ${skill.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   10. 渲染与平滑过滤精选项目 (Projects Showcase)
   ========================================================================== */
function renderProjects(projects, categories) {
  const filterContainer = document.getElementById('project-filters');
  const projectGrid = document.getElementById('projects-grid');
  if (!projectGrid || !projects) return;

  if (filterContainer && categories) {
    filterContainer.innerHTML = categories.map((cat, idx) => `
      <button class="project-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
        idx === 0
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
          : 'bg-white/5 hover:bg-white/10 text-body border border-color'
      }" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.project-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.project-filter-btn').forEach(b => {
          b.className = 'project-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold transition-all bg-white/5 hover:bg-white/10 text-body border border-color';
        });
        btn.className = 'project-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/30';
        
        const selectedCat = btn.getAttribute('data-category');
        filterProjectsGrid(selectedCat);
      });
    });
  }

  function filterProjectsGrid(cat) {
    const cards = projectGrid.querySelectorAll('.project-card');
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (cat === '全部' || cardCat === cat) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      } else {
        card.style.display = 'none';
      }
    });
  }

  projectGrid.innerHTML = projects.map(proj => `
    <div class="project-card spotlight-card flex flex-col justify-between" data-category="${proj.category}">
      <!-- 预览渐变头部 -->
      <div class="h-44 bg-gradient-to-br ${proj.previewGradient} relative p-6 flex flex-col justify-between border-b border-color">
        <div class="flex items-center justify-between">
          <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/60 backdrop-blur-md text-white border border-white/15">
            ${proj.badge || proj.category}
          </span>
          <div class="flex items-center gap-2">
            ${proj.githubUrl ? `
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white transition-all shadow-sm" title="查看 GitHub 源码">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
            ` : ''}
            ${proj.demoUrl ? `
              <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white transition-all shadow-sm" title="在线演示">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            ` : ''}
          </div>
        </div>

        <div class="mt-auto">
          <h3 class="text-xl font-bold text-title tracking-wide font-display">${proj.title}</h3>
        </div>
      </div>

      <!-- 卡片详情内容 -->
      <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <p class="text-xs sm:text-sm text-body leading-relaxed mb-5 line-clamp-2">${proj.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${proj.tags.map(t => `
              <span class="px-2.5 py-1 text-xs rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/20 font-medium">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-color">
          <button class="open-project-detail-btn text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors" data-id="${proj.id}">
            <span>查看完整设计与亮点</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
          <span class="text-xs text-dim font-mono">${proj.category}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   11. 渲染成长足迹时间轴 (Timeline)
   ========================================================================== */
function renderTimeline(timeline) {
  const container = document.getElementById('timeline-container');
  if (!container || !timeline) return;

  container.innerHTML = timeline.map((item, index) => `
    <div class="relative pl-8 sm:pl-10 pb-8 last:pb-0">
      <!-- 节点发光圆点 -->
      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 shadow-md shadow-indigo-500/60"></div>
      ${index !== timeline.length - 1 ? '<div class="absolute left-[7px] top-5 bottom-0 w-0.5 bg-indigo-200 dark:bg-slate-800"></div>' : ''}
      
      <div class="spotlight-card p-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h4 class="text-base font-bold text-title font-display">${item.title}</h4>
          <span class="text-xs px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-mono font-semibold">
            ${item.year}
          </span>
        </div>
        <div class="text-xs font-semibold text-dim mb-3">${item.org}</div>
        <p class="text-xs text-body leading-relaxed mb-4">${item.description}</p>
        
        <div class="flex flex-wrap gap-1.5">
          ${item.tags.map(tag => `
            <span class="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-color text-dim font-mono">
              #${tag}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   12. 渲染文章随笔 (Articles)
   ========================================================================== */
function renderArticles(articles) {
  const container = document.getElementById('articles-container');
  if (!container || !articles) return;

  container.innerHTML = articles.map(art => `
    <div class="spotlight-card p-6 sm:p-7 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between text-xs text-dim mb-3.5">
          <span class="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-semibold">${art.category}</span>
          <span class="font-mono">${art.date}</span>
        </div>
        <h3 class="text-base font-bold text-title group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mb-2.5 line-clamp-1 font-display">
          ${art.title}
        </h3>
        <p class="text-xs text-body leading-relaxed line-clamp-2 mb-5">
          ${art.summary}
        </p>
      </div>

      <div class="pt-4 border-t border-color flex items-center justify-between">
        <a href="${art.link}" class="text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>阅读全文</span> <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </a>
        <span class="text-[11px] text-dim font-mono">${art.readTime}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   13. 渲染社交互动卡片 (Socials)
   ========================================================================== */
function renderSocials(socials) {
  const container = document.getElementById('socials-container');
  if (!container || !socials) return;

  container.innerHTML = socials.map(item => {
    if (item.isPlain) {
      return `<div class="spotlight-card p-4 flex items-center gap-3.5"><div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><i data-lucide="${item.icon}" class="w-5 h-5"></i></div><div><div class="text-xs font-bold text-title">${item.name}</div><div class="text-xs text-dim">${item.desc}</div></div></div>`;
    } else if (item.isCopyable) {
      return `
        <button class="copy-btn spotlight-card p-4 flex items-center gap-3.5 text-left w-full hover:border-indigo-500/50 transition-all" data-copy="${item.desc}">
          <div class="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-title flex items-center gap-1.5">
              ${item.name} <span class="text-[10px] text-indigo-500 dark:text-indigo-400 font-normal">(点击复制)</span>
            </div>
            <div class="text-xs text-dim truncate font-mono">${item.desc}</div>
          </div>
          <i data-lucide="copy" class="w-4 h-4 text-dim"></i>
        </button>
      `;
    } else if (item.action === 'openWechatModal') {
      return `
        <button class="open-wechat-btn spotlight-card p-4 flex items-center gap-3.5 text-left w-full hover:border-emerald-500/50 transition-all">
          <div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-title">${item.name}</div>
            <div class="text-xs text-dim truncate">${item.desc}</div>
          </div>
          <i data-lucide="qr-code" class="w-4 h-4 text-dim"></i>
        </button>
      `;
    } else {
      return `
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="spotlight-card p-4 flex items-center gap-3.5 text-left w-full hover:border-indigo-500/50 transition-all">
          <div class="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-title">${item.name}</div>
            <div class="text-xs text-dim truncate">${item.desc}</div>
          </div>
          <i data-lucide="external-link" class="w-4 h-4 text-dim"></i>
        </a>
      `;
    }
  }).join('');

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`已复制到剪贴板: ${text} 📋`);
        }).catch(() => showToast("复制未成功，请选中邮箱地址手动复制"));
      }
    });
  });

  document.querySelectorAll('.open-wechat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('wechat-modal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

/* ==========================================================================
   14. GSAP Core 动效编排 (GSAP Entrance Animations)
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // 首屏元素优雅浮入
  gsap.from('#hero h1, #hero p, #hero .shimmer-btn, #hero .spotlight-card', {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // 终端卡片 3D 微动效
  const terminal = document.querySelector('.terminal-window');
  if (terminal) {
    terminal.addEventListener('mousemove', (e) => {
      const rect = terminal.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(terminal, {
        rotationY: x * 8,
        rotationX: -y * 8,
        ease: 'power1.out',
        duration: 0.4
      });
    });

    terminal.addEventListener('mouseleave', () => {
      gsap.to(terminal, { rotationY: 0, rotationX: 0, ease: 'power2.out', duration: 0.6 });
    });
  }
}

/* ==========================================================================
   15. 模态框与 Toast 系统
   ========================================================================== */
function initModals(projects) {
  const projectModal = document.getElementById('project-modal');
  const wechatModal = document.getElementById('wechat-modal');

  function closeModal(modal) {
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(projectModal);
      closeModal(wechatModal);
    });
  });

  [projectModal, wechatModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(projectModal);
      closeModal(wechatModal);
    }
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-project-detail-btn');
    if (!btn) return;
    const projId = btn.getAttribute('data-id');
    const project = projects.find(p => p.id === projId);
    if (project && projectModal) {
      document.getElementById('modal-proj-title').textContent = project.title;
      document.getElementById('modal-proj-cat').textContent = project.category;
      document.getElementById('modal-proj-desc').textContent = project.description;

      const detailsContainer = document.getElementById('modal-proj-details');
      if (detailsContainer && project.details) {
        detailsContainer.innerHTML = `
          <div class="space-y-4 text-xs sm:text-sm">
            <div>
              <h5 class="font-bold text-title mb-1">项目初衷与定位</h5>
              <p class="text-body leading-relaxed">${project.details.background || ''}</p>
            </div>
            <div>
              <h5 class="font-bold text-title mb-2">核心技术亮点</h5>
              <ul class="list-disc list-inside space-y-1.5 text-body">
                ${(project.details.highlights || []).map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h5 class="font-bold text-title mb-2">架构技术栈</h5>
              <div class="flex flex-wrap gap-1.5">
                ${(project.details.techStack || project.tags).map(t => `
                  <span class="px-2.5 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-mono">${t}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }

      const demoBtn = document.getElementById('modal-demo-btn');
      const githubBtn = document.getElementById('modal-github-btn');
      if (demoBtn) {
        demoBtn.href = project.demoUrl || '#';
        demoBtn.style.display = project.demoUrl ? 'inline-flex' : 'none';
      }
      if (githubBtn) {
        githubBtn.href = project.githubUrl || '#';
        githubBtn.style.display = project.githubUrl ? 'inline-flex' : 'none';
      }

      projectModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      refreshLucide();
    }
  });
}

function initUptimeCounter(startDateStr) {
  const counterEl = document.getElementById('uptime-counter');
  if (!counterEl) return;
  const startDate = new Date(startDateStr || '2024-01-01T00:00:00');

  function update() {
    const diff = Math.max(0, new Date() - startDate);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    counterEl.textContent = `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
  }
  update();
  setInterval(update, 1000);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = new FormData(form);
    const body = `${fields.get('message')}\n\n来自：${fields.get('name')}\n回复邮箱：${fields.get('email')}`;
    window.location.href = 'mailto:zhujy9413@gmail.com?subject=' + encodeURIComponent('个人主页来信') + '&body=' + encodeURIComponent(body);

  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const circle = document.getElementById('scroll-progress-bar');
  if (!btn) return;
  const circumference = 2 * Math.PI * 18;

  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1), 1);
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
    if (circle) circle.style.strokeDashoffset = circumference - progress * circumference;
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function showToast(message, duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
