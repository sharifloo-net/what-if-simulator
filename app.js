/**
 * What If? Simulator - Main Application
 *
 * A PWA that explores hypothetical scenarios and their consequences.
 *
 * PWA/APK Build Instructions:
 * 1. Deploy this app to a HTTPS server
 * 2. Visit https://www.pwabuilder.com/
 * 3. Enter your deployed URL
 * 4. Click "Build My PWA" and select Android
 * 5. Download and sign the generated APK
 */

const STORAGE_KEY = 'whatif-scenarios-v1';
const AI_KEY_STORAGE = 'whatif-ai-apikey-v1';
const SECTION_NAMES = ['Daily Life', 'Economy', 'Technology', 'Social Structure', 'Advantages', 'Problems'];

const BUILT_IN_SCENARIOS = [
	{
		id: 'money-never-invented',
		title: 'Humans never invented money',
		seed: 'A world where currency and monetary systems never developed',
		sections: {
			'Daily Life': [
				'Barter systems dominate all transactions',
				'People trade skills and goods directly',
				'Communities become more self-sufficient',
				'Time-based exchange systems emerge'
			],
			'Economy': [
				'No stock markets or banking institutions',
				'Trade based on immediate needs and surplus',
				'Wealth measured by tangible assets only',
				'Complex multi-party exchanges become common'
			],
			'Technology': [
				'Slower innovation due to funding challenges',
				'Local craftsmen prioritized over factories',
				'Resource sharing platforms become essential',
				'Tracking systems for complex barter emerge'
			],
			'Social Structure': [
				'Stronger local community bonds',
				'Social status tied to skills and resources',
				'Less wealth inequality in traditional sense',
				'Gift economies in close-knit groups'
			],
			'Advantages': [
				'No debt or financial crises',
				'Reduced materialism and consumerism',
				'Stronger interpersonal relationships',
				'More sustainable consumption patterns'
			],
			'Problems': [
				'Difficult to save for future needs',
				'Complex transactions become cumbersome',
				'Specialization of labor hindered',
				'Long-distance trade severely limited'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'gravity-20-weaker',
		title: 'Gravity is 20% weaker',
		seed: 'Earth gravity reduced by 20% from current levels',
		sections: {
			'Daily Life': [
				'Walking feels lighter and bouncier',
				'Sports records completely rewritten',
				'Furniture and buildings designed taller',
				'Falls become less dangerous'
			],
			'Economy': [
				'Aerospace industry costs drop significantly',
				'Construction materials can be lighter',
				'New sports and entertainment industries emerge',
				'Shipping costs decrease substantially'
			],
			'Technology': [
				'Easier satellite and space launches',
				'New building designs reaching higher',
				'Flying vehicles become more practical',
				'Renewable energy from height differences'
			],
			'Social Structure': [
				'Elderly maintain mobility longer',
				'Physical disabilities less limiting',
				'New forms of dance and art emerge',
				'Architecture reflects vertical expansion'
			],
			'Advantages': [
				'Reduced joint and back problems',
				'Easier space exploration access',
				'Less energy needed for transportation',
				'Enhanced athletic performances'
			],
			'Problems': [
				'Atmosphere slowly escaping to space',
				'Bone density loss in all humans',
				'Muscle atrophy becomes common issue',
				'Weather patterns significantly disrupted'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'internet-disappears',
		title: 'Internet disappears tomorrow',
		seed: 'All internet infrastructure ceases to function permanently',
		sections: {
			'Daily Life': [
				'Return to physical mail and calls',
				'Local shopping becomes primary again',
				'Paper maps and directories revived',
				'Face-to-face meetings become essential'
			],
			'Economy': [
				'Global supply chains severely disrupted',
				'E-commerce collapses overnight',
				'Banking systems face major challenges',
				'Local businesses see resurgence'
			],
			'Technology': [
				'Offline-first software becomes critical',
				'Local network solutions developed rapidly',
				'Physical media storage in high demand',
				'Fax machines make unexpected comeback'
			],
			'Social Structure': [
				'Social media addiction crisis ends',
				'Local community ties strengthen again',
				'Information access becomes unequal',
				'Libraries become crucial information hubs'
			],
			'Advantages': [
				'Reduced screen time and addiction',
				'Privacy concerns largely eliminated',
				'Cybercrime becomes impossible',
				'More present in-person interactions'
			],
			'Problems': [
				'Remote work becomes impossible',
				'Medical records access critically impaired',
				'Education systems severely disrupted',
				'Emergency coordination greatly hindered'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	}
];

let scenarios = [];
let currentScenarioId = null;
let showFavoritesOnly = false;
let showQuickAccessOnly = false;
let quickAccessScenarios = JSON.parse(localStorage.getItem('quickAccessScenarios') || '[]');

const elements = {
	searchInput: document.getElementById('searchInput'),
	scenarioSelect: document.getElementById('scenarioSelect'),
	scenarioButtons: document.getElementById('scenarioButtons'),
	favFilterIcon: document.getElementById('favFilterIcon'),
	scenarioTitle: document.getElementById('scenarioTitle'),
	scenarioSeed: document.getElementById('scenarioSeed'),
	sectionCards: document.getElementById('sectionCards'),
	totalCount: document.getElementById('totalCount'),
	favCount: document.getElementById('favCount'),
	favoritesList: document.getElementById('favoritesList'),
	offlineIndicator: document.getElementById('offlineIndicator'),
	aiModal: document.getElementById('aiModal'),
	aiPrompt: document.getElementById('aiPrompt'),
	aiApiKey: document.getElementById('aiApiKey'),
	aiModel: document.getElementById('aiModel'),
	cancelAiModal: document.getElementById('cancelAiModal'),
	generateAi: document.getElementById('generateAi'),
	loadingOverlay: document.getElementById('loadingOverlay'),
	generateBtn: document.getElementById('generateBtn'),
	exportBtn: document.getElementById('exportBtn'),
	importBtn: document.getElementById('importBtn'),
	importFile: document.getElementById('importFile'),
	favToggle: document.getElementById('favToggle'),
	favIcon: document.getElementById('favIcon'),
	viewer: document.getElementById('viewer')
};

function init() {
	loadScenarios();
	renderScenarioSelect();
	renderScenarioButtons();
	updateStats();
	setupEventListeners();
	setupOfflineDetection();
	registerServiceWorker();

	if (scenarios.length > 0) {
		selectScenario(scenarios[0].id);
	}
}

function loadScenarios() {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		scenarios = JSON.parse(stored);
	} else {
		scenarios = [...BUILT_IN_SCENARIOS];
		saveScenarios();
	}
}

function saveScenarios() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
	updateStats();
}

function renderScenarioSelect(filter = '') {
	const filtered = filter
		? scenarios.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()))
		: scenarios;

	elements.scenarioSelect.innerHTML = filtered.map(s =>
		`<option value="${s.id}" ${s.id === currentScenarioId ? 'selected' : ''}>${s.title}</option>`
	).join('');
}

function renderScenarioButtons() {
	// Always show favorites section with empty state if needed
	const favoriteScenarios = scenarios.filter(s => s.favorite);

	if (favoriteScenarios.length > 0) {
		elements.favoritesList.innerHTML = favoriteScenarios.map(s => `
            <div class="scenario-item">
                <button class="scenario-btn ${s.id === currentScenarioId ? 'active' : ''}" data-id="${s.id}" aria-label="${s.title}">
                    <span class="scenario-btn__title">${truncateText(s.title, 18)}</span>
                    <span class="scenario-btn__favorite" aria-hidden="true">★</span>
                </button>
                <button class="scenario-delete" data-id="${s.id}" aria-label="Delete scenario">×</button>
            </div>
        `).join('');
	} else {
		elements.favoritesList.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state__icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
                <p class="empty-state__text">No favorites yet. Click the star on a scenario to add it here.</p>
            </div>
        `;
	}

	// Always show the favorites section
	elements.favoritesList.closest('.favorites').style.display = 'block';

	// Handle all scenarios section
	const displayScenarios = showFavoritesOnly ? [] : scenarios;

	if (displayScenarios.length === 0) {
		elements.scenarioButtons.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state__icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="12" x2="15" y2="12"></line>
                    <line x1="12" y1="9" x2="12" y2="15"></line>
                </svg>
                <p class="empty-state__text">
                    ${showFavoritesOnly ? 'No favorite scenarios. Mark some as favorites to see them here!' : 'No scenarios available. Create one to get started!'}
                </p>
            </div>`;
		return;
	}

	elements.scenarioButtons.innerHTML = displayScenarios.map(s => `
        <div class="scenario-item">
            <button class="scenario-btn ${s.id === currentScenarioId ? 'active' : ''}" data-id="${s.id}" aria-label="${s.title}">
                <span class="scenario-btn__title">${truncateText(s.title, 18)}</span>
                <span class="scenario-btn__favorite" aria-hidden="true">${s.favorite ? '★' : ''}</span>
            </button>
            <button class="scenario-delete" data-id="${s.id}" aria-label="Delete scenario">×</button>
        </div>
    `).join('');
}

function truncateText(text, maxLength) {
	return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function selectScenario(id) {
	const scenario = scenarios.find(s => s.id === id);
	if (!scenario) return;

	currentScenarioId = id;
	elements.scenarioTitle.textContent = scenario.title;
	elements.scenarioSeed.textContent = scenario.seed;
	renderSectionCards(scenario.sections);
	updateFavButton(scenario.favorite);
	updateActiveButtons();
}

function renderSectionCards(sections) {
    // Ensure section titles in the UI are always in English
    const sectionMapping = {
        'زندگی روزمره': 'Daily Life',
        'اقتصاد': 'Economy',
        'فناوری': 'Technology',
        'ساختار اجتماعی': 'Social Structure',
        'مزایا': 'Advantages',
        'مشکلات': 'Problems'
    };

    elements.sectionCards.innerHTML = SECTION_NAMES.map(name => {
        const points = sections[name] || sections[Object.keys(sectionMapping).find(key => sectionMapping[key] === name)];
        return `
            <div class="section-card">
                <h3 class="section-card__title">${name}</h3>
                <ul class="section-card__list">
                    ${points ? points.map(point => `<li>${point}</li>`).join('') : '<li>No data available</li>'}
                </ul>
            </div>
        `;
    }).join('');
}

function updateFavButton(isFavorite) {
	elements.favIcon.textContent = isFavorite ? '★' : '☆';
	elements.favToggle.lastChild.textContent = isFavorite ? ' Remove from Favorites' : ' Add to Favorites';
}

function updateActiveButtons() {
	document.querySelectorAll('.scenario-btn').forEach(btn => {
		btn.classList.toggle('active', btn.dataset.id === currentScenarioId);
	});
	elements.scenarioSelect.value = currentScenarioId;
}

function toggleFavorite() {
	if (!currentScenarioId) return;

	const scenario = scenarios.find(s => s.id === currentScenarioId);
	if (!scenario) return;

	// Toggle favorite status
	scenario.favorite = !scenario.favorite;
	scenario.lastUpdated = new Date().toISOString();

	// Update UI
	updateFavButton(scenario.favorite);
	renderScenarioButtons();
	saveScenarios();

	// Show notification
	const notification = document.createElement('div');
	notification.className = 'notification';
	notification.textContent = scenario.favorite ? 'Added to favorites' : 'Removed from favorites';
	document.body.appendChild(notification);

	setTimeout(() => {
		notification.classList.add('show');
		setTimeout(() => {
			notification.classList.remove('show');
			setTimeout(() => notification.remove(), 300);
		}, 2000);
	}, 10);
}

function removeScenario(id) {
	if (!confirm('Are you sure you want to delete this scenario? This cannot be undone.')) {
		return;
	}

	const index = scenarios.findIndex(s => s.id === id);
	if (index === -1) return;

	// If deleting the current scenario, select a new one
	if (currentScenarioId === id) {
		const newIndex = index > 0 ? index - 1 : scenarios.length > 1 ? 1 : -1;
		currentScenarioId = newIndex !== -1 ? scenarios[newIndex].id : null;
	}

	// Remove the scenario
	scenarios.splice(index, 1);
	saveScenarios();

	// Update UI
	renderScenarioSelect();
	renderScenarioButtons();

	if (currentScenarioId) {
		selectScenario(currentScenarioId);
	} else if (scenarios.length > 0) {
		selectScenario(scenarios[0].id);
	} else {
		// No scenarios left
		elements.scenarioTitle.textContent = 'No Scenarios';
		elements.scenarioSeed.textContent = '';
		elements.sectionCards.innerHTML = '';
	}
}

function updateStats() {
	elements.totalCount.textContent = scenarios.length;
	elements.favCount.textContent = scenarios.filter(s => s.favorite).length;
}

function setupEventListeners() {
	// Search functionality
	elements.searchInput.addEventListener('input', e => renderScenarioSelect(e.target.value));

	// Scenario selection
	elements.scenarioSelect.addEventListener('change', e => selectScenario(e.target.value));

	// Click handlers for scenario buttons in both sections
	const handleScenarioClick = (e) => {
		const btn = e.target.closest('.scenario-btn');
		if (btn) {
			selectScenario(btn.dataset.id);
		}
	};

	elements.scenarioButtons.addEventListener('click', handleScenarioClick);
	elements.favoritesList.addEventListener('click', handleScenarioClick);

	// Restore favorites section visibility from localStorage
	const showFavorites = localStorage.getItem('showFavorites') !== 'false';
	const favoritesSection = elements.favoritesList.closest('.favorites');
	favoritesSection.style.display = showFavorites ? 'block' : 'none';

	// AI generation
	elements.generateBtn.addEventListener('click', () => {
		elements.aiApiKey.value = localStorage.getItem(AI_KEY_STORAGE) || '';
		openModal('aiModal');
	});

	// Import/Export
	elements.exportBtn.addEventListener('click', exportScenarios);
	elements.importBtn.addEventListener('click', () => elements.importFile.click());
	elements.importFile.addEventListener('change', importScenarios);

	// Modal controls
	elements.cancelAiModal.addEventListener('click', () => closeModal('aiModal'));
	elements.generateAi.addEventListener('click', handleGenerateAi);

	// Favorite toggle
	elements.favToggle.addEventListener('click', toggleFavorite);

	// Handle delete button clicks
	document.addEventListener('click', (e) => {
		const deleteBtn = e.target.closest('.scenario-delete');
		if (deleteBtn) {
			e.stopPropagation();
			removeScenario(deleteBtn.dataset.id);
		}
	});
}

function openModal(id) {
	elements[id].classList.remove('hidden');
}

function closeModal(id) {
	elements[id].classList.add('hidden');
}

function showLoading(show) {
	elements.loadingOverlay.classList.toggle('hidden', !show);
}

function handleGenerateAi() {
	const prompt = elements.aiPrompt.value.trim();
	if (!prompt) {
		alert('Please enter a scenario prompt');
		return;
	}

	const apiKey = elements.aiApiKey.value.trim();
	if (!apiKey) {
		alert('Please enter your OpenRouter API key');
		return;
	}

	const model = elements.aiModel.value.trim() || 'nex-agi/deepseek-v3.1-nex-n1:free';

	showLoading(true);
	generateScenarioWithAi(prompt, apiKey, model)
		.then(newScenario => {
			if (newScenario) {
				scenarios.push(newScenario);
				saveScenarios();
				renderScenarioSelect();
				renderScenarioButtons();
				selectScenario(newScenario.id);
				localStorage.setItem(AI_KEY_STORAGE, apiKey);
			}
		})
		.catch(error => {
			console.error('AI generation failed:', error);
			alert(`Generation failed: ${error.message}. Check console for details.`);
		})
		.finally(() => {
			showLoading(false);
			closeModal('aiModal');
		});
}

async function generateScenarioWithAi(userPrompt, apiKey, model) {
    const isPersian = /[\u0600-\u06FF]/.test(userPrompt); // Check if input contains Persian characters

    const systemPrompt = isPersian
        ? `شما یک هوش مصنوعی خلاق و سرگرم‌کننده هستید که سناریوهای "چه می‌شد اگر؟" را به زبان فارسی تولید می‌کنید! 🎭✨
دستورالعمل‌ها:
- فقط یک شیء JSON معتبر مطابق با فرمت زیر تولید کنید.
- نام بخش‌ها را تغییر ندهید و هیچ بخشی را حذف نکنید.
- بسیار مهم: هر بخش باید ۳ تا ۵ نکته داشته باشد.
- از ایموجی‌ها برای جذاب‌تر کردن پاسخ‌ها استفاده کنید. 😄✨
- پاسخ‌ها باید خلاقانه، هیجان‌انگیز و حتی کمی طنزآمیز باشند.
- از زبان جذاب و سرگرم‌کننده استفاده کنید.
- پاسخ‌ها کوتاه، مفید و مختصر، و در عین حال جذاب باشند.
- لطفاً دقیقاً از این فرمت و استایل پیروی کنید.

فرمت پاسخ:
{
    "id": "نام-سناریو",
    "title": "عنوان جذاب",
    "seed": "توضیح کوتاه",
    "sections": {
        "زندگی روزمره": ["نکته ۱", "نکته ۲", "نکته ۳"],
        "اقتصاد": ["نکته ۱", "نکته ۲", "نکته ۳"],
        "فناوری": ["نکته ۱", "نکته ۲", "نکته ۳"],
        "ساختار اجتماعی": ["نکته ۱", "نکته ۲", "نکته ۳"],
        "مزایا": ["نکته ۱", "نکته ۲", "نکته ۳"],
        "مشکلات": ["نکته ۱", "نکته ۲", "نکته ۳"]
    }
}`
        : `You are a creative and fun AI that generates "What If?" scenarios! 🎭✨
Instructions:
- Output ONLY valid JSON in the format below.
- Do NOT rename or omit any sections.
- Very important: each section must have 3-5 points.
- Use emojis to make responses engaging. 😄✨
- Make the answers fun, creative, exciting, and even a little humorous.
- Use engaging and entertaining language.
- Answer should be short, useful, concise, yet engaging.
- Please follow the format exactly.
Response format:
{
    "id": "scenario-name",
    "title": "Catchy Title",
    "seed": "Short description",
    "sections": {
        "Daily Life": ["Point 1", "Point 2", "Point 3"],
        "Economy": ["Point 1", "Point 2", "Point 3"],
        "Technology": ["Point 1", "Point 2", "Point 3"],
        "Social Structure": ["Point 1", "Point 2", "Point 3"],
        "Advantages": ["Point 1", "Point 2", "Point 3"],
        "Problems": ["Point 1", "Point 2", "Point 3"]
    }
}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate scenario for: ${userPrompt}` }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.8, // Increase temperature for more creative responses
            max_tokens: 2000
        })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    // Extract JSON if wrapped in markdown or extra text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Invalid JSON response');
    }

    const scenario = JSON.parse(jsonMatch[0]);
    scenario.lastUpdated = new Date().toISOString();
    scenario.favorite = false;
    scenario.id = scenario.id || createIdFromTitle(scenario.title);

    // Validate sections - ensure all required sections exist with 3-5 points
    const requiredSections = isPersian
        ? ['زندگی روزمره', 'اقتصاد', 'فناوری', 'ساختار اجتماعی', 'مزایا', 'مشکلات']
        : ['Daily Life', 'Economy', 'Technology', 'Social Structure', 'Advantages', 'Problems'];
    requiredSections.forEach(section => {
        if (!scenario.sections[section]) {
            throw new Error(`Missing section: ${section}`);
        }
        if (!Array.isArray(scenario.sections[section])) {
            throw new Error(`Section ${section} is not an array`);
        }
        if (scenario.sections[section].length < 3 || scenario.sections[section].length > 5) {
            throw new Error(`Section ${section} must have 3-5 points`);
        }
    });

    return scenario;
}


function createIdFromTitle(title) {
	return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function exportScenarios() {
	const data = JSON.stringify(scenarios, null, 2);
	const blob = new Blob([data], {type: 'application/json'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'scenarios.json';
	a.click();
	URL.revokeObjectURL(url);
}

function importScenarios(e) {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = event => {
		try {
			const imported = JSON.parse(event.target.result);
			scenarios = [...scenarios, ...imported];
			saveScenarios();
			renderScenarioSelect();
			renderScenarioButtons();
			if (imported.length > 0) {
				selectScenario(imported[0].id);
			}
		} catch (error) {
			alert('Invalid JSON file');
		}
	};
	reader.readAsText(file);
}

function setupOfflineDetection() {
	window.addEventListener('online', updateOfflineIndicator);
	window.addEventListener('offline', updateOfflineIndicator);
	updateOfflineIndicator();
}

function updateOfflineIndicator() {
	elements.offlineIndicator.classList.toggle('hidden', navigator.onLine);
}

function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
			.then(reg => console.log('Service Worker registered', reg))
			.catch(err => console.error('Service Worker registration failed', err));
	}
}

init();