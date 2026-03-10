 const snippets = {
        'get-startups': `fetch('/api/startups?page=1&limit=10&industry=hardware&min_shame=5')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-startups-random': `fetch('/api/startups/random')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-startups-top-shame': `fetch('/api/startups/top/shame?limit=10&min_shame=5')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-startups-top-funding': `fetch('/api/startups/top/funding?limit=10')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-startups-search': `fetch('/api/startups/search?q=juicero')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-startup-id': `fetch('/api/startups/1')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'post-startup': `const startup = {
  name: "Theranos 2.0",
  description: "La secuela que nadie pidió",
  industry: "HealthTech",
  funding: 0,
  shame_level: 8,
  founded: 2024,
  idea_real: "Tomar sangre con promesas vacías"
};

const res = await fetch('/api/startups', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(startup)
});
console.log(await res.json());`,
        'get-industries': `fetch('/api/industries')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-founders': `fetch('/api/founders')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-founder-id': `fetch('/api/founders/1')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-ideas': `fetch('/api/ideas')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-idea-id': `fetch('/api/ideas/1')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-stats': `fetch('/api/stats')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-timeline': `fetch('/api/timeline')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-health': `fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));`,
        'get-api-info': `fetch('/api')
  .then(res => res.json())
  .then(data => console.log(data));`
    };

    let currentEndpoint = 'get-startups';
    const currentLang = 'javascript';

    const codeBlock = document.getElementById('code-block');
    const responseBlock = document.getElementById('response-block');
    const statusBadge = document.getElementById('status-badge');
    const responseTime = document.getElementById('response-time');
    const endpointBtns = document.querySelectorAll('.endpoint-btn');
    const copyBtn = document.getElementById('copy-btn');
    const runBtn = document.getElementById('run-btn');
    const statsContainer = document.getElementById('stats-container');
    const endpointSearch = document.getElementById('endpoint-search');
    const infoMethod = document.getElementById('info-method');
    const infoUrl = document.getElementById('info-url');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const codeSidebar = document.getElementById('code-sidebar');
    const toggleLabel = document.getElementById('toggle-label');
    const mobileSidebarWrapper = document.getElementById('mobile-sidebar-wrapper');

    function showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        const icons = { success: '✅', error: '❌', info: '📋' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('exiting');
            toast.addEventListener('animationend', () => toast.remove());
        }, duration);
    }

    function updatePlayground(animated = false) {
        const snippet = snippets[currentEndpoint] ?? '// Snippet no disponible';
        const activeBtn = document.querySelector('.endpoint-btn.active');

        codeBlock.className = `language-javascript`;
        codeBlock.textContent = snippet;

        if (window.Prism) {
            Prism.highlightElement(codeBlock);
        }
        if (activeBtn) {
            const method = activeBtn.dataset.method || 'GET';
            if (method === 'GET') {
                runRequest();
            } else {
                responseBlock.textContent = '// Haz clic en "Ejecutar" para enviar esta petición';
                statusBadge.textContent = '---';
                statusBadge.className = 'status-code';
                responseTime.textContent = '';
                if (window.Prism) Prism.highlightElement(responseBlock);
            }
        }

        if (activeBtn) {
            const method = activeBtn.dataset.method || 'GET';
            const path = activeBtn.dataset.path || '';
            infoMethod.textContent = method;
            infoMethod.className = `method-badge ${method.toLowerCase()}`;

            const urlMatch = snippet.match(/['"](\/api[^'"]+)['"]/);
            infoUrl.textContent = urlMatch
                ? `${window.location.origin}${urlMatch[1]}`
                : `${window.location.origin}${path}`;
        }
    }

    endpointBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            endpointBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEndpoint = btn.dataset.target;
            updatePlayground();

            const path = btn.querySelector('.path')?.textContent ?? '';
            const method = btn.dataset.method ?? 'GET';
            if (toggleLabel) toggleLabel.textContent = `${method} ${path}`;

            if (window.innerWidth <= 860) {
                codeSidebar.classList.remove('open');
                sidebarToggle.classList.remove('open');
                sidebarToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
            showToast('Código copiado al portapapeles', 'success', 2000);
            setTimeout(() => {
                copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
            }, 2000);
        } catch {
            showToast('No se pudo copiar el código', 'error');
        }
    });

    async function runRequest() {
        const activeBtn = document.querySelector('.endpoint-btn.active');
        if (!activeBtn) return;

        const method = activeBtn.dataset.method ?? 'GET';
        const snippet = snippets[currentEndpoint];
        const urlMatch = snippet.match(/['"](\/api[^'"]+)['"]/);
        const path = urlMatch ? urlMatch[1] : activeBtn.dataset.path;
        const url = `${window.location.origin}${path}`;

        runBtn.disabled = true;
        runBtn.innerHTML = `<span class="spinner"></span> Ejecutando...`;
        responseBlock.textContent = 'Esperando respuesta...';
        statusBadge.textContent = '...';
        statusBadge.className = 'status-code status-loading';
        responseTime.textContent = '';

        const startTime = Date.now();

        try {
            const options = { method };
            if (method === 'POST' && currentEndpoint === 'post-startup') {
                options.headers = { 'Content-Type': 'application/json' };
                options.body = JSON.stringify({
                    name: "Theranos 2.0",
                    description: "La secuela que nadie pidió",
                    industry: "HealthTech",
                    funding: 0,
                    shame_level: 8,
                    founded: 2024
                });
            }

            const res = await fetch(url, options);
            const elapsed = Date.now() - startTime;
            const data = await res.json();

            statusBadge.textContent = `${res.status} ${res.statusText}`;
            statusBadge.className = 'status-code ' + (res.ok ? 'status-ok' : 'status-error');
            responseTime.textContent = `Real · ${elapsed}ms`;

            responseBlock.textContent = JSON.stringify(data, null, 2);
            if (window.Prism) Prism.highlightElement(responseBlock);

            showToast(`Respuesta ${res.status} en ${elapsed}ms`, res.ok ? 'success' : 'error');
        } catch (err) {
            const elapsed = Date.now() - startTime;
            statusBadge.textContent = 'Error';
            statusBadge.className = 'status-code status-error';
            responseTime.textContent = `${elapsed}ms`;
            responseBlock.textContent = `// Error: ${err.message}`;
            showToast('Error al conectar con la API', 'error');
        } finally {
            runBtn.disabled = false;
            runBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Ejecutar`;
        }
    }

    runBtn.addEventListener('click', runRequest);

    endpointSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const allBtns = document.querySelectorAll('.endpoint-btn');
        const groups = document.querySelectorAll('.endpoint-group-section');

        allBtns.forEach(btn => {
            const text = btn.querySelector('.path')?.textContent.toLowerCase() ?? '';
            const method = btn.dataset.method?.toLowerCase() ?? '';
            const matches = !query || text.includes(query) || method.includes(query);
            btn.classList.toggle('hidden', !matches);
        });

        groups.forEach(group => {
            const hasVisible = [...group.querySelectorAll('.endpoint-btn')].some(b => !b.classList.contains('hidden'));
            group.style.display = hasVisible ? '' : 'none';
        });
    });

    if (sidebarToggle) {
        // Show toggle only on mobile (CSS handles display)
        mobileSidebarWrapper.removeAttribute('aria-hidden');

        sidebarToggle.addEventListener('click', () => {
            const isOpen = codeSidebar.classList.toggle('open');
            sidebarToggle.classList.toggle('open', isOpen);
            sidebarToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    function animateCount(el, target, duration = 1200, prefix = '', suffix = '') {
        const isFloat = String(target).includes('.');
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    async function loadStats() {
        try {
            const res = await fetch('/api/stats');
            if (!res.ok) throw new Error('offline');
            const data = await res.json();
            renderStats(data, true);
        } catch {
            // Fallback to demo data
            renderStats({
                total_startups: 15,
                avg_shame_level: 8.5,
                industria_mas_vergonzosa: 'Hardware'
            }, false);
        }
    }

    function renderStats(data, isLive) {
        statsContainer.setAttribute('aria-busy', 'false');
        statsContainer.innerHTML = `
            <article class="stat-card">
                <h4>Total Fracasos</h4>
                <div class="stat-value" id="stat-total">0</div>
                ${isLive ? '<small style="color:var(--accent-green);font-size:.7rem;margin-top:.25rem;display:block">● En vivo</small>' : ''}
            </article>
            <article class="stat-card">
                <h4>Vergüenza Media</h4>
                <div class="stat-value" id="stat-shame" style="color:var(--accent-red)">0</div>
                <small style="color:var(--text-muted);font-size:.7rem;margin-top:.25rem;display:block">sobre 10</small>
            </article>
            <article class="stat-card">
                <h4>Peor Industria</h4>
                <div class="stat-value" style="color:var(--accent-orange);font-size:1.4rem;text-transform:capitalize">${data.industria_mas_vergonzosa || 'N/A'}</div>
            </article>
        `;

        // Animate numbers
        setTimeout(() => {
            const totalEl = document.getElementById('stat-total');
            const shameEl = document.getElementById('stat-shame');
            if (totalEl) animateCount(totalEl, data.total_startups || 0);
            if (shameEl) animateCount(shameEl, parseFloat(data.avg_shame_level) || 0, 1400, '', '/10');
        }, 100);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    document.getElementById('endpoints-list').addEventListener('keydown', (e) => {
        if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
        e.preventDefault();
        const btns = [...document.querySelectorAll('.endpoint-btn:not(.hidden)')];
        const idx = btns.indexOf(document.activeElement);
        if (idx === -1) return;
        const next = e.key === 'ArrowDown' ? btns[idx + 1] : btns[idx - 1];
        next?.focus();
    });

    updatePlayground();
    loadStats();