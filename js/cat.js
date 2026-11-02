/* A browser-local companion; no account, network request, or model required. */
(() => {
  const host = document.getElementById('site-cat');
  if (!host) return;
  host.innerHTML = `
    <p class="cat-bubble" role="status" aria-live="polite" hidden></p>
    <button class="cat-toggle" type="button" aria-label="收起小黑猫" aria-expanded="true" title="收起小黑猫">−</button>
    <button class="cat-toy" type="button" aria-label="摸摸小黑猫，可拖动；方向键移动位置" title="点一下打招呼，拖动换位置；方向键也能移动">
      <svg viewBox="0 0 140 158" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cat-fur" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#343341"/><stop offset="1" stop-color="#15151e"/></linearGradient>
          <linearGradient id="cat-purple" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c4b5fd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient>
        </defs>
        <ellipse class="cat-shadow" cx="70" cy="148" rx="43" ry="5" fill="#7862b5" opacity=".18"/>
        <g class="cat-body">
          <path class="cat-tail" d="M102 132 Q138 139 130 112 Q125 101 117 111" fill="none" stroke="#252432" stroke-width="12" stroke-linecap="round"/>
          <path d="M47 91 Q34 108 41 137 Q69 149 101 136 Q105 104 88 92" fill="url(#cat-fur)" stroke="#494353" stroke-width="1.5"/>
          <path d="M59 109 Q70 103 82 111 L85 136 Q70 143 55 136Z" fill="#464051" opacity=".55"/>
          <g class="cat-paws"><ellipse cx="49" cy="139" rx="16" ry="8" fill="#292733" stroke="#52495f"/><ellipse cx="91" cy="139" rx="16" ry="8" fill="#292733" stroke="#52495f"/></g>
          <g class="cat-head">
            <path d="M30 58 L26 17 Q39 18 54 34 Q72 27 88 34 Q102 18 115 18 L109 62Z" fill="url(#cat-fur)" stroke="#51475e" stroke-width="2" stroke-linejoin="round"/>
            <path d="M32 26 L35 48 L48 38Z M107 27 L102 48 L94 38Z" fill="#b48cae"/>
            <path d="M27 58 Q29 30 70 32 Q112 31 115 60 L112 81 Q104 104 70 105 Q33 103 27 81Z" fill="url(#cat-fur)" stroke="#51475e" stroke-width="1.5"/>
            <path d="M42 44 Q55 35 66 38" fill="none" stroke="#686074" stroke-width="2" opacity=".5" stroke-linecap="round"/>
            <g class="cat-eyes">
              <ellipse cx="49" cy="68" rx="10" ry="12" fill="#ece6bd"/><ellipse cx="91" cy="68" rx="10" ry="12" fill="#ece6bd"/>
              <g class="cat-pupils"><ellipse cx="50" cy="69" rx="5.5" ry="8" fill="#24202e"/><ellipse cx="90" cy="69" rx="5.5" ry="8" fill="#24202e"/><circle cx="52" cy="65" r="2" fill="white"/><circle cx="92" cy="65" r="2" fill="white"/></g>
            </g>
            <g class="cat-sleep-eyes" fill="none" stroke="#dfd4f1" stroke-width="2.7" stroke-linecap="round"><path d="M40 70 Q49 76 58 70 M82 70 Q91 76 100 70"/></g>
            <path d="M66 82 Q70 79 74 82 L70 86Z" fill="#c99cbd"/>
            <path class="cat-smile" d="M61 89 Q66 94 70 88 Q74 94 79 89" fill="none" stroke="#d9c3de" stroke-width="1.6" stroke-linecap="round"/>
            <ellipse class="cat-yawn" cx="70" cy="91" rx="5" ry="7" fill="#d6adc4"/>
            <g class="cat-blush" fill="#de9dc3" opacity=".55"><ellipse cx="38" cy="82" rx="7" ry="3"/><ellipse cx="102" cy="82" rx="7" ry="3"/></g>
            <path d="M33 81 L18 78 M34 87 L18 89 M106 81 L121 78 M106 87 L122 90" stroke="#93809f" stroke-width="1.3" stroke-linecap="round"/>
            <g class="cat-headphones">
              <path d="M22 61 Q16 14 70 12 Q124 14 119 61" fill="none" stroke="#4c2b87" stroke-width="10"/>
              <path d="M22 57 Q19 16 70 16 Q120 18 119 57" fill="none" stroke="url(#cat-purple)" stroke-width="6"/>
              <rect x="15" y="54" width="16" height="29" rx="7" fill="url(#cat-purple)" stroke="#d0bfff" stroke-width="1.5"/>
              <rect x="109" y="54" width="16" height="29" rx="7" fill="url(#cat-purple)" stroke="#d0bfff" stroke-width="1.5"/>
              <path d="M21 62 L21 74 M115 62 L115 74" stroke="#eadfff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
            </g>
            <g class="cat-glasses" stroke="#d4baff" stroke-width="2.2" fill="#c4b5fd" fill-opacity=".08"><rect x="34" y="57" width="29" height="22" rx="7"/><rect x="77" y="57" width="29" height="22" rx="7"/><path d="M63 66 Q70 62 77 66" fill="none"/></g>
          </g>
          <g class="cat-grip" fill="#393342" stroke="#756184" stroke-width="1.2"><ellipse cx="40" cy="102" rx="10" ry="7"/><ellipse cx="100" cy="102" rx="10" ry="7"/><path d="M36 100 L36 104 M40 99 L40 104 M96 100 L96 104 M100 99 L100 104"/></g>
          <g class="cat-controller"><path d="M49 115 Q70 108 91 115 L97 131 Q96 141 86 135 L78 131 H62 L54 135 Q43 140 43 131Z" fill="#8b5cf6" stroke="#c4b5fd" stroke-width="1.5"/><path d="M53 120 V128 M49 124 H57" stroke="#f5f3ff" stroke-width="2.5" stroke-linecap="round"/><circle cx="84" cy="121" r="2" fill="#f5f3ff"/><circle cx="89" cy="126" r="2" fill="#f5f3ff"/><ellipse cx="41" cy="126" rx="7" ry="5" fill="#393342"/><ellipse cx="99" cy="126" rx="7" ry="5" fill="#393342"/></g>
        </g>
        <g class="cat-sleep-pose">
          <ellipse cx="63" cy="145" rx="49" ry="5" fill="#7862b5" opacity=".18"/>
          <path d="M18 126 Q12 110 32 99 Q55 85 79 98 Q106 111 100 131 Q87 147 52 144 Q27 144 18 126Z" fill="url(#cat-fur)" stroke="#71617e" stroke-width="1.6"/>
          <path d="M40 101 Q60 93 78 104" fill="none" stroke="#65596e" stroke-width="2" opacity=".6" stroke-linecap="round"/>
          <g transform="rotate(-20 39 123)">
            <path d="M17 124 L17 101 L33 112 Q43 108 52 113 L66 105 L63 129 Q55 141 39 139 Q21 139 17 124Z" fill="url(#cat-fur)" stroke="#71617e" stroke-width="1.5"/>
            <path d="M21 109 L23 120 L29 114 M60 113 L56 123 L53 117" fill="#b48cae"/>
            <path d="M24 127 Q29 132 34 127 M44 128 Q49 133 54 128" fill="none" stroke="#e1cee9" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M35 134 L40 134 L38 137Z" fill="#c99cbd"/>
          </g>
          <path d="M94 117 Q110 140 67 143 Q41 145 37 132 Q34 124 45 124" fill="none" stroke="#4c4358" stroke-width="12" stroke-linecap="round"/>
          <path d="M96 119 Q107 140 67 142" fill="none" stroke="#71617e" stroke-width="1.2" stroke-linecap="round"/>
          <g class="cat-resting-headphones" transform="translate(116 125) rotate(-22 10 10) scale(.68)">
            <path d="M0 16 Q-2 -3 13 -3 Q29 -3 27 16" fill="none" stroke="#b89aff" stroke-width="4.5"/>
            <rect x="-4" y="12" width="9" height="15" rx="4" fill="url(#cat-purple)" stroke="#d0bfff"/>
            <rect x="22" y="12" width="9" height="15" rx="4" fill="url(#cat-purple)" stroke="#d0bfff"/>
          </g>
        </g>
        <text class="cat-zzz" x="85" y="88" fill="#a78bfa" font-size="15" font-family="monospace" font-weight="bold">z Z</text>
      </svg>
    </button>
    <button class="cat-restore" type="button" aria-label="叫出小黑猫，可拖动；方向键移动位置" title="点一下展开，拖动换位置" hidden><svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><g fill="currentColor"><ellipse cx="16" cy="22" rx="9" ry="7"/><ellipse cx="6" cy="13" rx="3.5" ry="4.5" transform="rotate(-25 6 13)"/><ellipse cx="12" cy="7" rx="3.5" ry="4.5"/><ellipse cx="21" cy="7" rx="3.5" ry="4.5"/><ellipse cx="27" cy="13" rx="3.5" ry="4.5" transform="rotate(25 27 13)"/></g></svg></button>`;

  const toy = host.querySelector('.cat-toy');
  const toggle = host.querySelector('.cat-toggle');
  const restore = host.querySelector('.cat-restore');
  const bubble = host.querySelector('.cat-bubble');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let lastClick = performance.now(), moodTimer, bubbleTimer, scrollTimer, yawnTimer;
  let collapsed = false, sleeping = false, drag = null, suppressClick = false, moved = false;
  let lastScroll = scrollY, lastScrollAt = performance.now(), frame = 0, greeting = 0;
  const greetings = ['都逛到这里了，喝杯咖啡？☕', '耳机里放着我的摸鱼歌单。', '喵，今天也要保持好奇。', '给你一个猫猫击掌！🐾'];
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  function say(text) {
    clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.hidden = false;
    bubbleTimer = setTimeout(() => { bubble.hidden = true; }, 4200);
  }
  function recordClick() {
    lastClick = performance.now();
    if (!sleeping) { clearTimeout(yawnTimer); host.classList.remove('is-yawning'); }
  }
  function wake() {
    sleeping = false;
    host.classList.remove('is-sleeping', 'is-yawning');
    toy.setAttribute('aria-label', '摸摸小黑猫，可拖动；方向键移动位置');
    toy.title = '点一下打招呼，拖动换位置；方向键也能移动';
    recordClick();
  }
  function position(x, y) {
    const rect = host.getBoundingClientRect();
    const left = clamp(x, 10, innerWidth - rect.width - 10);
    const top = clamp(y, 12, innerHeight - rect.height - 12);
    host.style.left = `${left}px`;
    host.style.top = `${top}px`;
    host.style.right = 'auto';
    host.style.bottom = 'auto';
    host.classList.toggle('bubble-left', left < 200);
    host.classList.toggle('bubble-below', top < 110);
    moved = true;
  }
  function setCollapsed(value) {
    collapsed = value;
    host.classList.toggle('is-collapsed', value);
    toy.hidden = toggle.hidden = value;
    restore.hidden = !value;
    toggle.setAttribute('aria-expanded', String(!value));
    bubble.hidden = true;
    try { localStorage.setItem('jiayi-cat-collapsed', String(value)); } catch (_) { /* Storage can be disabled. */ }
    if (moved) { const r = host.getBoundingClientRect(); position(r.left, r.top); }
    if (!value) { wake(); toy.focus({preventScroll:true}); say('我回来啦。喵！'); }
    else restore.focus({preventScroll:true});
  }
  toggle.addEventListener('click', () => setCollapsed(true));
  restore.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) { event.preventDefault(); return; }
    setCollapsed(false);
  });
  try {
    if (localStorage.getItem('jiayi-cat-collapsed') === 'true') {
      collapsed = true; host.classList.add('is-collapsed'); toy.hidden = toggle.hidden = true; restore.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  } catch (_) { /* Keep the cat usable without storage. */ }

  toy.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) { event.preventDefault(); return; }
    const wasSleeping = sleeping;
    wake();
    clearTimeout(moodTimer);
    host.classList.add('is-happy');
    moodTimer = setTimeout(() => host.classList.remove('is-happy'), 1800);
    say(wasSleeping ? '醒啦！刚才梦见了一杯拿铁。' : greetings[greeting++ % greetings.length]);
  });
  function bindDrag(handle) {
    handle.addEventListener('dragstart', event => event.preventDefault());
    handle.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      event.preventDefault();
      handle.blur();
      const rect = host.getBoundingClientRect();
      drag = {id:event.pointerId, x:event.clientX, y:event.clientY, left:rect.left, top:rect.top, active:false};
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (!drag.active && Math.hypot(dx, dy) < 5) return;
      if (!drag.active) { drag.active = true; host.classList.add('is-dragging'); bubble.hidden = true; }
      position(drag.left + dx, drag.top + dy);
    });
    function release(event) {
      if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.id)) return;
      if (drag.active) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 400);
        if (event.type !== 'pointercancel' && !collapsed && !sleeping) say('就待在这里陪你啦。');
      }
      drag = null;
      host.classList.remove('is-dragging');
    }
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);
    handle.addEventListener('lostpointercapture', release);
    handle.addEventListener('keydown', event => {
      const step = event.shiftKey ? 40 : 16;
      const delta = {ArrowLeft:[-step,0], ArrowRight:[step,0], ArrowUp:[0,-step], ArrowDown:[0,step]}[event.key];
      if (!delta) return;
      event.preventDefault();
      const r = host.getBoundingClientRect(); position(r.left + delta[0], r.top + delta[1]);
    });

  }
  bindDrag(toy);
  bindDrag(restore);

  window.addEventListener('pointermove', event => {
    if (collapsed || sleeping || drag || event.pointerType === 'touch') return;
    const r = toy.getBoundingClientRect();
    const dx = event.clientX - (r.left + r.width/2), dy = event.clientY - (r.top + r.height*.45);
    const near = Math.hypot(dx,dy) < 260;
    host.style.setProperty('--look-x', `${clamp(dx/55,-3,3)}px`);
    host.style.setProperty('--look-y', `${clamp(dy/70,-2,2)}px`);
    host.style.setProperty('--lean', near && !reducedMotion.matches ? `${clamp(dx/45,-5,5)}deg` : '0deg');
  }, {passive:true});

  function updateContext() {
    frame = 0;
    const inView = id => {
      const el = document.getElementById(id);
      if (!el || el.hidden) return false;
      const r = el.getBoundingClientRect();
      return r.top < innerHeight*.82 && r.bottom > innerHeight*.2;
    };
    host.classList.toggle('is-reading', inView('ideas'));
    host.classList.toggle('is-gaming', inView('fun'));
  }
  function contextSoon() { if (!frame) frame = requestAnimationFrame(updateContext); }
  window.addEventListener('scroll', () => {
    contextSoon();
    const now = performance.now(), delta = scrollY-lastScroll;
    const speed = Math.abs(delta)/Math.max(16,now-lastScrollAt);
    lastScroll = scrollY; lastScrollAt = now;
    if (collapsed || sleeping || drag || reducedMotion.matches) return;
    host.classList.add('is-scrolling');
    host.classList.toggle('is-gripping', speed > 1.1 || Math.abs(delta) > 180);
    host.style.setProperty('--scroll-tilt', `${clamp(delta/16,-10,10)}deg`);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      host.classList.remove('is-scrolling','is-gripping');
      host.style.setProperty('--scroll-tilt','0deg');
    }, 230);
  }, {passive:true});
  const panels = document.querySelectorAll('.hub-panel');
  const observer = new MutationObserver(contextSoon);
  panels.forEach(panel => observer.observe(panel, {attributes:true,attributeFilter:['hidden']}));
  window.addEventListener('resize', () => {
    if (moved) { const r = host.getBoundingClientRect(); position(r.left,r.top); }
    contextSoon();
  }, {passive:true});
  setInterval(() => {
    if (document.hidden || collapsed || sleeping || drag || performance.now()-lastClick < 30000 || host.classList.contains('is-yawning')) return;
    host.classList.remove('is-happy');
    host.classList.add('is-yawning');
    yawnTimer = setTimeout(() => {
      host.classList.remove('is-yawning');
      host.classList.add('is-sleeping'); sleeping = true;
      toy.setAttribute('aria-label', '小猫睡着了，点一下叫醒，也可以拖动');
      toy.title = '小猫睡着了，点一下叫醒';
      host.style.setProperty('--lean','0deg');
      bubble.hidden = true;
    }, 1500);
  }, 1000);
  updateContext();
})();
