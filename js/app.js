// ========================================================
// AWESOME WEB EFFECTS STUDIO - CORE APPLICATION CONTROLLER
// ========================================================

class AppController {
  constructor() {
    this.registry = window.EffectRegistry || {};
    this.currentEffectId = 'particles-bg';
    this.currentEffect = null;
    this.currentSettings = {};
    this.bgMode = false;
    this.activeTab = 'complete';

    this.categoryIcons = {
      'Background Decoration': '🌌',
      'Mouse Effect': '🖱️',
      'Css 3D Effect': '🎲',
      'Image Effect': '🖼️',
      'Input Effect': '⌨️',
      'Transition Effect': '⚡',
      'Rain & Snow': '🌧️',
      'Button Effect': '🔘',
      'Loading Effect': '⏳',
      'Audio Effect': '🔊',
      'SVG Animations': '📐',
      'Fireworks': '🎆',
      'Physics & Simulation': '🪂',
      'Special / Experimental': '👾',
      'Other Effect': '🕹️'
    };

    this.palettes = {
      cyberpunk: { name: '🟣 Cyberpunk', colors: ['#ec4899', '#06b6d4', '#8b5cf6', '#f43f5e'] },
      matrix: { name: '🟢 Matrix', colors: ['#22c55e', '#16a34a', '#86efac', '#4ade80'] },
      dracula: { name: '🧛 Dracula', colors: ['#a855f7', '#ef4444', '#f43f5e', '#c084fc'] },
      sunset: { name: '🌅 Sunset', colors: ['#f59e0b', '#f97316', '#ea580c', '#fbbf24'] },
      nordic: { name: '❄️ Nordic', colors: ['#38bdf8', '#0284c7', '#e0f2fe', '#7dd3fc'] }
    };

    this.autoTourTimer = null;
    this.autoTourActive = false;
    this.isDualLayer = false;

    this.initDOM();
    this.buildNavigation();
    this.bindGlobalEvents();
    this.initAudioReactive();
    this.initZenMode();
    this.initAutoTour();
    this.initDualLayer();
    this.initCodeExports();
    this.loadEffect(this.currentEffectId);
    this.startPerformanceMonitor();
  }

  initDOM() {
    this.dom = {
      appShell: document.getElementById('app-container'),
      ambientWrapper: document.getElementById('ambient-canvas-wrapper'),
      ambientBanner: document.getElementById('ambient-overlay-banner'),
      categoryNav: document.getElementById('category-nav'),
      effectsCounterBadge: document.getElementById('effects-counter-badge'),
      stageViewport: document.getElementById('stage-viewport'),
      effectHost: document.getElementById('effect-host'),
      stageTitle: document.getElementById('stage-title'),
      stageDesc: document.getElementById('stage-desc'),
      stageTags: document.getElementById('stage-tags'),
      stageGithubLink: document.getElementById('stage-github-link'),
      dynamicControls: document.getElementById('dynamic-controls'),
      presetButtons: document.getElementById('preset-buttons'),
      effectSearch: document.getElementById('effect-search'),
      btnToggleBg: document.getElementById('btn-toggle-bg-mode'),
      btnExitBg: document.getElementById('btn-exit-bg-mode'),
      btnRandom: document.getElementById('btn-random-effect'),
      btnReset: document.getElementById('btn-reset-effect'),
      btnFullscreen: document.getElementById('btn-fullscreen-stage'),
      btnOpenCode: document.getElementById('btn-open-code-modal'),
      btnQuickCopy: document.getElementById('btn-quick-copy'),
      codeModal: document.getElementById('code-modal'),
      btnCloseModal: document.getElementById('btn-close-modal'),
      modalTitle: document.getElementById('modal-effect-title'),
      codeContent: document.getElementById('code-content'),
      btnCopyCode: document.getElementById('btn-copy-code'),
      copyNotice: document.getElementById('copy-notice'),
      modalTabs: document.querySelectorAll('.modal-tabs .tab-btn'),
      fpsVal: document.getElementById('stat-fps'),
      particleVal: document.getElementById('stat-particles'),
      interactionVal: document.getElementById('stat-interaction'),

      // New V2 Features
      btnAudioReactive: document.getElementById('btn-audio-reactive'),
      audioStatusDot: document.getElementById('audio-status-dot'),
      audioBtnLabel: document.getElementById('audio-btn-label'),
      btnDualLayer: document.getElementById('btn-dual-layer'),
      modalDualLayer: document.getElementById('modal-dual-layer'),
      btnCloseDualModal: document.getElementById('btn-close-dual-modal'),
      btnStartDualLayer: document.getElementById('btn-start-dual-layer'),
      btnDownloadDualHtml: document.getElementById('btn-download-dual-html'),
      selectLayerBg: document.getElementById('select-layer-bg'),
      selectLayerFg: document.getElementById('select-layer-fg'),
      btnZenMode: document.getElementById('btn-zen-mode'),
      btnExitZen: document.getElementById('btn-exit-zen'),
      btnAutoTour: document.getElementById('btn-auto-tour'),
      autoTourBar: document.getElementById('auto-tour-bar'),
      btnDownloadHtml: document.getElementById('btn-download-html'),
      btnOpenCodePen: document.getElementById('btn-open-codepen')
    };
  }

  buildNavigation() {
    const categories = {};
    const effectIds = Object.keys(this.registry);
    this.dom.effectsCounterBadge.textContent = `${effectIds.length} effecten`;

    // Group effects by category
    effectIds.forEach(id => {
      const effect = this.registry[id];
      const cat = effect.category || 'Other Effect';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(effect);
    });

    this.dom.categoryNav.innerHTML = '';

    Object.keys(categories).forEach((catName, index) => {
      const effects = categories[catName];
      const icon = this.categoryIcons[catName] || '✨';
      const isOpen = index === 0;

      const groupEl = document.createElement('div');
      groupEl.className = `cat-group ${isOpen ? 'open' : ''}`;
      groupEl.dataset.category = catName;

      groupEl.innerHTML = `
        <div class="cat-group-header">
          <div class="cat-title-wrap">
            <span class="cat-icon">${icon}</span>
            <span class="cat-name">${catName}</span>
          </div>
          <div class="cat-meta">
            <span class="cat-count">${effects.length}</span>
            <span class="cat-arrow">▶</span>
          </div>
        </div>
        <div class="cat-effect-list">
          ${effects.map(eff => `
            <div class="effect-nav-item ${eff.id === this.currentEffectId ? 'active' : ''}" data-id="${eff.id}">
              <span class="effect-nav-name">${eff.title}</span>
              <span class="effect-nav-badge">${eff.tech ? eff.tech.split(' ')[0] : 'CSS'}</span>
            </div>
          `).join('')}
        </div>
      `;

      // Accordion toggle
      const header = groupEl.querySelector('.cat-group-header');
      header.addEventListener('click', () => {
        groupEl.classList.toggle('open');
      });

      // Item click
      groupEl.querySelectorAll('.effect-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const effectId = item.dataset.id;
          this.loadEffect(effectId);
        });
      });

      this.dom.categoryNav.appendChild(groupEl);
    });
  }

  loadEffect(effectId) {
    if (!this.registry[effectId]) return;

    // Destroy current active effect
    if (this.currentEffect && typeof this.currentEffect.destroy === 'function') {
      try { this.currentEffect.destroy(); } catch (err) { console.error(err); }
    }

    this.currentEffectId = effectId;
    this.currentEffect = this.registry[effectId];
    this.currentSettings = { ...this.currentEffect.defaultSettings };

    // Update active nav styling
    document.querySelectorAll('.effect-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.id === effectId);
      if (item.dataset.id === effectId) {
        const parentGroup = item.closest('.cat-group');
        if (parentGroup) parentGroup.classList.add('open');
      }
    });

    // Update Header Meta
    this.dom.stageTitle.textContent = this.currentEffect.title;
    this.dom.stageDesc.textContent = this.currentEffect.description;
    this.dom.stageTags.innerHTML = `
      <span class="tag tag-category">${this.currentEffect.category}</span>
      <span class="tag tag-tech">${this.currentEffect.tech || 'Web'}</span>
    `;

    if (this.currentEffect.github) {
      this.dom.stageGithubLink.href = this.currentEffect.github;
      this.dom.stageGithubLink.style.display = 'inline-flex';
    } else {
      this.dom.stageGithubLink.style.display = 'none';
    }

    // Mount target
    const targetContainer = this.bgMode ? this.dom.ambientWrapper : this.dom.effectHost;
    this.currentEffect.init(targetContainer, this.currentSettings);

    // Build Inspector Controls
    this.buildControls();

    // Update modal title
    this.dom.modalTitle.textContent = `Code Snippet: ${this.currentEffect.title}`;
    this.updateCodeModalContent();
  }

  buildControls() {
    const controls = this.currentEffect.controls || [];
    this.dom.dynamicControls.innerHTML = '';

    if (controls.length === 0) {
      this.dom.dynamicControls.innerHTML = `
        <div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px 0;">
          Dit effect gebruikt vaste CSS/WebGL transformaties zonder extra afstelparameters.
        </div>
      `;
      return;
    }

    // 1-Click Color Palette Generator Bar
    const colorControls = controls.filter(c => c.type === 'color');
    if (colorControls.length > 0) {
      const palWrap = document.createElement('div');
      palWrap.className = 'palette-bar-wrapper';
      palWrap.innerHTML = `
        <div class="palette-bar-title">
          <span>🎨 1-Klik Kleurthema's</span>
          <span style="font-size: 0.72rem; color: var(--accent-cyan);">Instant Palette</span>
        </div>
        <div class="palette-pills">
          <button class="palette-pill" data-palette="cyberpunk">
            <span class="palette-pill-dot" style="background: #ec4899;"></span> Cyberpunk
          </button>
          <button class="palette-pill" data-palette="matrix">
            <span class="palette-pill-dot" style="background: #22c55e;"></span> Matrix
          </button>
          <button class="palette-pill" data-palette="dracula">
            <span class="palette-pill-dot" style="background: #a855f7;"></span> Dracula
          </button>
          <button class="palette-pill" data-palette="sunset">
            <span class="palette-pill-dot" style="background: #f97316;"></span> Sunset
          </button>
          <button class="palette-pill" data-palette="nordic">
            <span class="palette-pill-dot" style="background: #38bdf8;"></span> Nordic
          </button>
          <button class="palette-pill" data-palette="random">
            🎲 Dobbelsteen
          </button>
        </div>
      `;

      palWrap.querySelectorAll('.palette-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.applyPalette(btn.dataset.palette, colorControls);
        });
      });

      this.dom.dynamicControls.appendChild(palWrap);
    }

    controls.forEach(ctrl => {
      const group = document.createElement('div');
      group.className = 'control-group';

      if (ctrl.type === 'range') {
        const val = this.currentSettings[ctrl.key] !== undefined ? this.currentSettings[ctrl.key] : ctrl.min;
        group.innerHTML = `
          <div class="control-label-row">
            <label class="control-label">${ctrl.label}</label>
            <span class="control-val" id="val-${ctrl.key}">${val}</span>
          </div>
          <input type="range" id="input-${ctrl.key}" min="${ctrl.min}" max="${ctrl.max}" step="${ctrl.step || 1}" value="${val}">
        `;
        const input = group.querySelector(`#input-${ctrl.key}`);
        const valDisplay = group.querySelector(`#val-${ctrl.key}`);

        input.addEventListener('input', (e) => {
          const num = parseFloat(e.target.value);
          valDisplay.textContent = num;
          this.currentSettings[ctrl.key] = num;
          this.applySettingsUpdate();
        });
      } else if (ctrl.type === 'color') {
        const hex = this.currentSettings[ctrl.key] || '#3b82f6';
        group.innerHTML = `
          <div class="control-label-row">
            <label class="control-label">${ctrl.label}</label>
          </div>
          <div class="color-picker-row">
            <input type="color" id="input-${ctrl.key}" value="${hex}">
            <span class="color-hex-label" id="val-${ctrl.key}">${hex}</span>
          </div>
        `;
        const input = group.querySelector(`#input-${ctrl.key}`);
        const valDisplay = group.querySelector(`#val-${ctrl.key}`);

        input.addEventListener('input', (e) => {
          valDisplay.textContent = e.target.value;
          this.currentSettings[ctrl.key] = e.target.value;
          this.applySettingsUpdate();
        });
      } else if (ctrl.type === 'switch') {
        const checked = !!this.currentSettings[ctrl.key];
        group.innerHTML = `
          <div class="switch-row">
            <label class="control-label">${ctrl.label}</label>
            <label class="switch">
              <input type="checkbox" id="input-${ctrl.key}" ${checked ? 'checked' : ''}>
              <span class="slider-switch"></span>
            </label>
          </div>
        `;
        const input = group.querySelector(`#input-${ctrl.key}`);
        input.addEventListener('change', (e) => {
          this.currentSettings[ctrl.key] = e.target.checked;
          this.applySettingsUpdate();
        });
      } else if (ctrl.type === 'select') {
        const curVal = this.currentSettings[ctrl.key];
        const optionsHtml = ctrl.options.map(opt => {
          const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
          const lbl = typeof opt === 'object' && opt !== null ? opt.label : opt;
          return `<option value="${val}" ${val === curVal ? 'selected' : ''}>${lbl}</option>`;
        }).join('');
        group.innerHTML = `
          <div class="control-label-row">
            <label class="control-label">${ctrl.label}</label>
          </div>
          <select class="control-select" id="input-${ctrl.key}">
            ${optionsHtml}
          </select>
        `;
        const select = group.querySelector(`#input-${ctrl.key}`);
        select.addEventListener('change', (e) => {
          this.currentSettings[ctrl.key] = e.target.value;
          this.applySettingsUpdate();
        });
      } else if (ctrl.type === 'text') {
        const textVal = this.currentSettings[ctrl.key] !== undefined ? this.currentSettings[ctrl.key] : '';
        group.innerHTML = `
          <div class="control-label-row">
            <label class="control-label">${ctrl.label}</label>
          </div>
          <input type="text" class="power-input" style="height: 38px; font-size: 0.88rem; padding: 0 12px; width: 100%; border: 1px solid var(--border-subtle); background: var(--bg-surface-elevated); border-radius: var(--radius-md);" id="input-${ctrl.key}" value="${textVal}" placeholder="${ctrl.placeholder || ''}">
        `;
        const textInput = group.querySelector(`#input-${ctrl.key}`);
        textInput.addEventListener('input', (e) => {
          this.currentSettings[ctrl.key] = e.target.value;
          this.applySettingsUpdate();
        });
      } else if (ctrl.type === 'trigger') {
        group.innerHTML = `
          <button class="btn-control-trigger" id="btn-trigger-${ctrl.key}">
            ${ctrl.label}
          </button>
        `;
        const btn = group.querySelector(`#btn-trigger-${ctrl.key}`);
        btn.addEventListener('click', () => {
          if (typeof this.currentEffect[ctrl.key] === 'function') {
            this.currentEffect[ctrl.key]();
          }
        });
      }

      this.dom.dynamicControls.appendChild(group);
    });
  }

  applySettingsUpdate() {
    if (this.currentEffect && typeof this.currentEffect.update === 'function') {
      this.currentEffect.update(this.currentSettings);
    }
    this.updateCodeModalContent();
  }

  applyPreset(presetName) {
    const presets = {
      neon: { color: '#06b6d4', glowColor: '#06b6d4', faceColor: '#06b6d4', burstColor: '#06b6d4', textColor: '#06b6d4', strokeColor: '#06b6d4', waterColor: '#06b6d4' },
      cosmic: { color: '#8b5cf6', glowColor: '#8b5cf6', faceColor: '#8b5cf6', burstColor: '#8b5cf6', textColor: '#8b5cf6', strokeColor: '#8b5cf6', waterColor: '#8b5cf6' },
      matrix: { color: '#22c55e', glowColor: '#22c55e', faceColor: '#22c55e', burstColor: '#22c55e', textColor: '#22c55e', strokeColor: '#22c55e', waterColor: '#22c55e' },
      fire: { color: '#f59e0b', glowColor: '#f97316', faceColor: '#ea580c', burstColor: '#f59e0b', textColor: '#f59e0b', strokeColor: '#f59e0b', waterColor: '#f59e0b' }
    };

    const chosen = presets[presetName];
    if (!chosen) return;

    Object.assign(this.currentSettings, chosen);
    this.buildControls();
    this.applySettingsUpdate();

    document.querySelectorAll('.btn-preset').forEach(b => {
      b.classList.toggle('active', b.dataset.preset === presetName);
    });
  }

  updateCodeModalContent() {
    if (!this.currentEffect || typeof this.currentEffect.getCode !== 'function') {
      this.dom.codeContent.textContent = '<!-- Geen code template beschikbaar voor dit effect -->';
      return;
    }

    const fullCode = this.currentEffect.getCode(this.currentSettings);
    if (this.activeTab === 'complete') {
      this.dom.codeContent.textContent = fullCode;
    } else if (this.activeTab === 'js') {
      const match = fullCode.match(/<script>([\s\S]*?)<\/script>/i);
      this.dom.codeContent.textContent = match ? match[1].trim() : fullCode;
    } else if (this.activeTab === 'css') {
      const match = fullCode.match(/<style>([\s\S]*?)<\/style>/i);
      this.dom.codeContent.textContent = match ? match[1].trim() : '/* Geen specifieke inline CSS */';
    }
  }

  toggleBgMode(enable) {
    this.bgMode = enable !== undefined ? enable : !this.bgMode;

    if (this.bgMode) {
      this.dom.ambientWrapper.classList.add('active');
      this.dom.appShell.classList.add('bg-mode-active');
      this.dom.btnToggleBg.classList.add('active');
      this.dom.ambientBanner.classList.remove('hidden');
      this.loadEffect(this.currentEffectId);
    } else {
      this.dom.ambientWrapper.classList.remove('active');
      this.dom.appShell.classList.remove('bg-mode-active');
      this.dom.btnToggleBg.classList.remove('active');
      this.dom.ambientBanner.classList.add('hidden');
      this.loadEffect(this.currentEffectId);
    }
  }

  openCodeModal() {
    this.updateCodeModalContent();
    if (this.dom.codeModal) {
      this.dom.codeModal.classList.remove('hidden');
    }
  }

  showCopyToast(message = 'HTML code succesvol gekopieerd naar klembord!') {
    let toast = document.getElementById('superduper-copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'superduper-copy-toast';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  async copyTextToClipboard(text) {
    if (!text) return false;

    // 1. Moderne Clipboard API (mits ondersteund en in veilige context)
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('navigator.clipboard.writeText geweigerd of mislukt, fallback wordt gestart:', err);
      }
    }

    // 2. Robuuste Fallback via document.execCommand('copy')
    return this.fallbackCopyText(text);
  }

  fallbackCopyText(text) {
    return new Promise((resolve, reject) => {
      let textArea = null;
      try {
        textArea = document.createElement('textarea');
        textArea.value = text;
        // Zorg dat het element focusbaar en selecteerbaar is zonder de layout te verstoren
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.color = 'transparent';
        textArea.style.fontSize = '14pt'; // Voorkomt inzoomen op mobiel
        textArea.setAttribute('aria-hidden', 'true');
        // Let op: GEEN readonly of disabled zetten (blokkeert selectie op iOS Safari)

        document.body.appendChild(textArea);
        textArea.focus({ preventScroll: true });
        textArea.select();
        textArea.setSelectionRange(0, textArea.value.length);

        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        textArea = null;

        if (success) {
          resolve(true);
        } else {
          reject(new Error('execCommand("copy") gaf false terug'));
        }
      } catch (err) {
        if (textArea && textArea.parentNode) {
          document.body.removeChild(textArea);
        }
        reject(err);
      }
    });
  }

  bindGlobalEvents() {
    // Search
    this.dom.effectSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.cat-group').forEach(group => {
        let hasVisibleChild = false;
        group.querySelectorAll('.effect-nav-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          const match = text.includes(q);
          item.style.display = match ? 'flex' : 'none';
          if (match) hasVisibleChild = true;
        });

        if (q.length > 0) {
          group.style.display = hasVisibleChild ? 'block' : 'none';
          if (hasVisibleChild) group.classList.add('open');
        } else {
          group.style.display = 'block';
        }
      });
    });

    // Escape clears search
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.dom.effectSearch.value = '';
        this.dom.effectSearch.dispatchEvent(new Event('input'));
        this.dom.codeModal.classList.add('hidden');
        if (this.bgMode) this.toggleBgMode(false);
      }
    });

    // Background Mode Toggle
    this.dom.btnToggleBg.addEventListener('click', () => this.toggleBgMode());
    this.dom.btnExitBg.addEventListener('click', () => this.toggleBgMode(false));

    // Random Effect
    this.dom.btnRandom.addEventListener('click', () => {
      const keys = Object.keys(this.registry);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      this.loadEffect(randomKey);
    });

    // Reset Effect
    this.dom.btnReset.addEventListener('click', () => {
      this.loadEffect(this.currentEffectId);
    });

    // Fullscreen Stage
    this.dom.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.dom.stageViewport.requestFullscreen().catch(err => alert(err.message));
      } else {
        document.exitFullscreen();
      }
    });

    // Code Modal
    this.dom.btnOpenCode.addEventListener('click', () => {
      this.openCodeModal();
    });

    this.dom.btnCloseModal.addEventListener('click', () => {
      this.dom.codeModal.classList.add('hidden');
    });

    this.dom.codeModal.addEventListener('click', (e) => {
      if (e.target === this.dom.codeModal) {
        this.dom.codeModal.classList.add('hidden');
      }
    });

    // Quick Copy Button in stage header
    if (this.dom.btnQuickCopy) {
      this.dom.btnQuickCopy.addEventListener('click', async () => {
        if (!this.currentEffect || typeof this.currentEffect.getCode !== 'function') return;
        const code = this.currentEffect.getCode(this.currentSettings);
        try {
          await this.copyTextToClipboard(code);
          this.showCopyToast('HTML code succesvol gekopieerd naar klembord!');
          const originalHTML = this.dom.btnQuickCopy.innerHTML;
          this.dom.btnQuickCopy.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>✓ Gekopieerd!</span>
          `;
          this.dom.btnQuickCopy.style.background = '#10b981';
          this.dom.btnQuickCopy.style.borderColor = '#10b981';
          setTimeout(() => {
            this.dom.btnQuickCopy.innerHTML = originalHTML;
            this.dom.btnQuickCopy.style.background = '';
            this.dom.btnQuickCopy.style.borderColor = '';
          }, 2000);
        } catch (err) {
          // If automatic copy is blocked by browser permissions, open code modal with code preloaded & selected
          this.openCodeModal();
          const range = document.createRange();
          range.selectNodeContents(this.dom.codeContent);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          if (this.dom.copyNotice) {
            this.dom.copyNotice.textContent = 'Druk op Ctrl+C (of Cmd+C) om de geselecteerde HTML te kopiëren!';
            this.dom.copyNotice.classList.add('copied');
          }
        }
      });
    }

    // Modal Tabs
    this.dom.modalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.modalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.dataset.tab;
        this.updateCodeModalContent();
      });
    });

    // Copy Code Button
    this.dom.btnCopyCode.addEventListener('click', async () => {
      const code = this.dom.codeContent.textContent;
      try {
        await this.copyTextToClipboard(code);
        this.showCopyToast('Code gekopieerd naar klembord!');
        this.dom.copyNotice.textContent = '✓ Gekopieerd naar klembord! Plak direct in je eigen bestand.';
        this.dom.copyNotice.classList.add('copied');
        this.dom.btnCopyCode.style.background = '#10b981';
        setTimeout(() => {
          this.dom.copyNotice.textContent = 'Klik op kopiëren om direct in je project te plakken!';
          this.dom.copyNotice.classList.remove('copied');
          this.dom.btnCopyCode.style.background = '';
        }, 2500);
      } catch (err) {
        // Fallback: select text inside code element
        const range = document.createRange();
        range.selectNodeContents(this.dom.codeContent);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        this.dom.copyNotice.textContent = 'Selectie actief: Druk op Ctrl+C om te kopiëren!';
      }
    });

    // Presets
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyPreset(btn.dataset.preset);
      });
    });
  }

  applyPalette(paletteKey, colorControls) {
    if (paletteKey === 'random') {
      const baseHue = Math.floor(Math.random() * 360);
      colorControls.forEach((ctrl, idx) => {
        const h = (baseHue + idx * 75) % 360;
        const col = `hsl(${h}, 90%, 60%)`;
        this.currentSettings[ctrl.key] = col;
      });
    } else {
      const pal = this.palettes[paletteKey];
      if (!pal) return;
      colorControls.forEach((ctrl, idx) => {
        const col = pal.colors[idx % pal.colors.length];
        this.currentSettings[ctrl.key] = col;
      });
    }

    this.applySettingsUpdate();
    this.buildControls();
  }

  initAudioReactive() {
    if (!this.dom.btnAudioReactive) return;
    this.audioModes = ['off', 'mic', 'synth'];
    this.audioModeIdx = 0;

    this.dom.btnAudioReactive.addEventListener('click', async () => {
      this.audioModeIdx = (this.audioModeIdx + 1) % this.audioModes.length;
      const mode = this.audioModes[this.audioModeIdx];

      if (mode === 'mic') {
        const ok = await window.AudioReactive.startMic();
        if (ok) {
          this.dom.audioStatusDot.style.background = '#10b981';
          this.dom.audioStatusDot.style.boxShadow = '0 0 10px #10b981';
          this.dom.audioBtnLabel.textContent = '🎙️ Microfoon Live';
          this.dom.btnAudioReactive.style.borderColor = '#10b981';
        } else {
          this.dom.audioStatusDot.style.background = '#f59e0b';
          this.dom.audioStatusDot.style.boxShadow = '0 0 10px #f59e0b';
          this.dom.audioBtnLabel.textContent = '🥁 Synth Beat Live';
          this.dom.btnAudioReactive.style.borderColor = '#f59e0b';
        }
      } else if (mode === 'synth') {
        window.AudioReactive.startSynthBeat();
        this.dom.audioStatusDot.style.background = '#f59e0b';
        this.dom.audioStatusDot.style.boxShadow = '0 0 10px #f59e0b';
        this.dom.audioBtnLabel.textContent = '🥁 Synth Beat Live';
        this.dom.btnAudioReactive.style.borderColor = '#f59e0b';
      } else {
        window.AudioReactive.stop();
        this.dom.audioStatusDot.style.background = '#64748b';
        this.dom.audioStatusDot.style.boxShadow = 'none';
        this.dom.audioBtnLabel.textContent = '🎙️ Audio Reactief';
        this.dom.btnAudioReactive.style.borderColor = '';
      }
    });
  }

  initZenMode() {
    if (this.dom.btnZenMode) {
      this.dom.btnZenMode.addEventListener('click', () => {
        document.body.classList.toggle('zen-mode');
      });
    }

    if (this.dom.btnExitZen) {
      this.dom.btnExitZen.addEventListener('click', () => {
        document.body.classList.remove('zen-mode');
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.key === 'z' || e.key === 'Z') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        document.body.classList.toggle('zen-mode');
      } else if (e.key === 'Escape') {
        document.body.classList.remove('zen-mode');
      }
    });
  }

  initAutoTour() {
    if (!this.dom.btnAutoTour) return;

    this.dom.btnAutoTour.addEventListener('click', () => {
      this.autoTourActive = !this.autoTourActive;

      if (this.autoTourActive) {
        this.dom.btnAutoTour.classList.add('btn-primary');
        this.dom.btnAutoTour.innerHTML = `<span>⏹ Stop Tour</span>`;
        this.runAutoTourStep();
      } else {
        this.dom.btnAutoTour.classList.remove('btn-primary');
        this.dom.btnAutoTour.innerHTML = `<span>⚡ Auto-Tour</span>`;
        clearTimeout(this.autoTourTimer);
        cancelAnimationFrame(this.tourProgRaf);
        if (this.dom.autoTourBar) this.dom.autoTourBar.style.width = '0%';
      }
    });
  }

  runAutoTourStep() {
    if (!this.autoTourActive) return;
    const keys = Object.keys(this.registry);
    const curIdx = keys.indexOf(this.currentEffectId);
    const nextIdx = (curIdx + 1) % keys.length;
    this.loadEffect(keys[nextIdx]);

    const dur = 10000;
    const start = performance.now();

    const updateProg = (now) => {
      if (!this.autoTourActive) return;
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / dur) * 100);
      if (this.dom.autoTourBar) this.dom.autoTourBar.style.width = `${pct}%`;
      if (elapsed < dur) {
        this.tourProgRaf = requestAnimationFrame(updateProg);
      }
    };
    this.tourProgRaf = requestAnimationFrame(updateProg);

    clearTimeout(this.autoTourTimer);
    this.autoTourTimer = setTimeout(() => {
      this.runAutoTourStep();
    }, dur);
  }

  initDualLayer() {
    if (!this.dom.btnDualLayer) return;

    this.dom.btnDualLayer.addEventListener('click', () => {
      this.dom.modalDualLayer.style.display = 'flex';
    });

    if (this.dom.btnCloseDualModal) {
      this.dom.btnCloseDualModal.addEventListener('click', () => {
        this.dom.modalDualLayer.style.display = 'none';
      });
    }

    if (this.dom.modalDualLayer) {
      this.dom.modalDualLayer.addEventListener('click', (e) => {
        if (e.target === this.dom.modalDualLayer) {
          this.dom.modalDualLayer.style.display = 'none';
        }
      });
    }

    if (this.dom.btnStartDualLayer) {
      this.dom.btnStartDualLayer.addEventListener('click', () => {
        const bgId = this.dom.selectLayerBg.value;
        const fgId = this.dom.selectLayerFg.value;
        this.startDualLayerMode(bgId, fgId);
        this.dom.modalDualLayer.style.display = 'none';
      });
    }

    if (this.dom.btnDownloadDualHtml) {
      this.dom.btnDownloadDualHtml.addEventListener('click', () => {
        const bgId = this.dom.selectLayerBg.value;
        const fgId = this.dom.selectLayerFg.value;
        this.downloadCombinedDualHtml(bgId, fgId);
      });
    }
  }

  startDualLayerMode(bgId, fgId) {
    if (this.currentEffect && typeof this.currentEffect.destroy === 'function') {
      this.currentEffect.destroy();
    }
    this.isDualLayer = true;

    this.dom.effectHost.innerHTML = `
      <div class="dual-layer-container">
        <div id="dual-bg-slot" class="dual-layer-bg"></div>
        <div id="dual-fg-slot" class="dual-layer-fg"></div>
      </div>
    `;

    const bgEffect = this.registry[bgId];
    const fgEffect = this.registry[fgId];

    if (bgEffect) {
      bgEffect.init(document.getElementById('dual-bg-slot'), bgEffect.defaultSettings || {});
      this.activeDualBg = bgEffect;
    }
    if (fgEffect) {
      fgEffect.init(document.getElementById('dual-fg-slot'), fgEffect.defaultSettings || {});
      this.activeDualFg = fgEffect;
    }

    this.dom.stageTitle.textContent = `🎛️ Dual Layer: ${bgEffect?.title || bgId} + ${fgEffect?.title || fgId}`;
    this.dom.stageDesc.textContent = 'Achtergrondeffect en interactieve voorgrond gecombineerd in één actieve weergave!';
    this.dom.stageTags.innerHTML = `
      <span class="tag tag-category">Dual Composite</span>
      <span class="tag tag-tech">Multi-Layer HTML5</span>
    `;

    this.dom.dynamicControls.innerHTML = `
      <div style="padding: 16px 0; text-align: center; color: #94a3b8; font-size: 0.88rem;">
        <p>🎛️ <strong>Dual Layer is actief!</strong></p>
        <p style="font-size: 0.8rem; margin-top: 6px;">Beide effecten draaien synchroon op het podium.</p>
        <button id="btn-reopen-dual" class="btn-action btn-primary" style="margin-top: 10px; width: 100%;">
          Kies Andere Combinatie
        </button>
      </div>
    `;
    const btnReopen = document.getElementById('btn-reopen-dual');
    if (btnReopen) btnReopen.addEventListener('click', () => { this.dom.modalDualLayer.style.display = 'flex'; });
  }

  downloadCombinedDualHtml(bgId, fgId) {
    const bgEffect = this.registry[bgId];
    const fgEffect = this.registry[fgId];
    if (!bgEffect || !fgEffect) return;

    const bgCode = bgEffect.getCode(bgEffect.defaultSettings || {});
    const fgCode = fgEffect.getCode(fgEffect.defaultSettings || {});

    const combined = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Awesome Web Effects: ${bgEffect.title} + ${fgEffect.title}</title>
  <style>
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; font-family: sans-serif; }
    .composite-bg { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 1; overflow: hidden; }
    .composite-fg { position: relative; z-index: 10; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; pointer-events: auto; }
  </style>
</head>
<body>
  <div class="composite-bg" id="bg-root"></div>
  <div class="composite-fg" id="fg-root"></div>

  <script>
    const bgContainer = document.getElementById('bg-root');
    const bgFrame = document.createElement('iframe');
    bgFrame.style.width = '100%'; bgFrame.style.height = '100%'; bgFrame.style.border = 'none';
    bgContainer.appendChild(bgFrame);
    bgFrame.contentDocument.open();
    bgFrame.contentDocument.write(${JSON.stringify(bgCode)});
    bgFrame.contentDocument.close();

    const fgContainer = document.getElementById('fg-root');
    const fgFrame = document.createElement('iframe');
    fgFrame.style.width = '100%'; fgFrame.style.height = '100%'; fgFrame.style.border = 'none';
    fgFrame.style.background = 'transparent';
    fgFrame.allowTransparency = "true";
    fgContainer.appendChild(fgFrame);
    fgFrame.contentDocument.open();
    fgFrame.contentDocument.write(${JSON.stringify(fgCode)});
    fgFrame.contentDocument.close();
  </script>
</body>
</html>`;

    this.downloadHtml(`dual-layer-${bgId}-${fgId}.html`, combined);
  }

  initCodeExports() {
    if (this.dom.btnDownloadHtml) {
      this.dom.btnDownloadHtml.addEventListener('click', () => {
        if (!this.currentEffect || typeof this.currentEffect.getCode !== 'function') return;
        const code = this.currentEffect.getCode(this.currentSettings);
        const filename = `${this.currentEffectId}.html`;
        this.downloadHtml(filename, code);
      });
    }

    if (this.dom.btnOpenCodePen) {
      this.dom.btnOpenCodePen.addEventListener('click', () => {
        if (!this.currentEffect || typeof this.currentEffect.getCode !== 'function') return;
        const code = this.currentEffect.getCode(this.currentSettings);
        this.openInCodePen(code, this.currentEffect.title);
      });
    }
  }

  downloadHtml(filename, content) {
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  openInCodePen(code, title) {
    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify({
      title: title || 'Awesome Web Effect',
      html: code,
      editors: '100'
    });

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  startPerformanceMonitor() {
    let lastTime = performance.now();
    let frameCount = 0;

    const tick = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        this.dom.fpsVal.textContent = fps;
        frameCount = 0;
        lastTime = now;

        // Update elements stat
        if (this.currentSettings.particleCount) {
          this.dom.particleVal.textContent = this.currentSettings.particleCount;
        } else if (this.currentSettings.starCount) {
          this.dom.particleVal.textContent = this.currentSettings.starCount;
        } else if (this.currentSettings.flakeCount) {
          this.dom.particleVal.textContent = this.currentSettings.flakeCount;
        } else {
          this.dom.particleVal.textContent = 'GPU Accel';
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
