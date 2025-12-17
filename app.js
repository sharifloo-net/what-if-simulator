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
	},
	{
		id: 'workweek-20-hours',
		title: 'Workweek is 20 hours',
		seed: 'Standard work week reduced to 20 hours globally',
		sections: {
			'Daily Life': [
				'More time for hobbies and family',
				'Work-life balance dramatically improved',
				'Multiple part-time jobs become common',
				'Leisure industries boom significantly'
			],
			'Economy': [
				'Productivity per hour increases',
				'More jobs created for same output',
				'Consumer spending patterns shift',
				'Automation accelerates to compensate'
			],
			'Technology': [
				'Automation becomes essential everywhere',
				'AI handles routine tasks primarily',
				'Remote work tools improve rapidly',
				'Efficiency software in high demand'
			],
			'Social Structure': [
				'Stronger family and community bonds',
				'Volunteer work increases substantially',
				'Mental health generally improves',
				'Creative pursuits flourish widely'
			],
			'Advantages': [
				'Reduced stress and burnout rates',
				'Lower unemployment through job sharing',
				'Better physical and mental health',
				'More time for education and growth'
			],
			'Problems': [
				'Potential income reduction concerns',
				'Some industries struggle to adapt',
				'Coordination across time zones harder',
				'Economic adjustment period challenging'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'no-combustion-engines',
		title: 'No internal combustion engines',
		seed: 'Internal combustion engines never invented or developed',
		sections: {
			'Daily Life': [
				'Electric and steam vehicles dominate',
				'Cities designed for shorter distances',
				'Bicycles are primary transportation mode',
				'Air quality significantly better everywhere'
			],
			'Economy': [
				'Oil industry never developed this way',
				'Electric infrastructure built earlier',
				'Different geopolitical power dynamics',
				'Local manufacturing more prevalent'
			],
			'Technology': [
				'Battery technology advances earlier',
				'Steam power remains more relevant',
				'Solar and wind developed sooner',
				'Electric motors refined extensively'
			],
			'Social Structure': [
				'Cities more compact and walkable',
				'Rural areas develop differently',
				'Less suburban sprawl patterns',
				'Public transit prioritized everywhere'
			],
			'Advantages': [
				'No climate change from vehicle emissions',
				'Cleaner air in all urban areas',
				'Quieter cities and neighborhoods',
				'No oil-related geopolitical conflicts'
			],
			'Problems': [
				'Long-distance travel more challenging',
				'Agricultural mechanization delayed',
				'Emergency response potentially slower',
				'Heavy industry development hindered'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'languages-mutually-intelligible',
		title: 'All languages mutually intelligible',
		seed: 'Every human can understand any language instantly',
		sections: {
			'Daily Life': [
				'Travel anywhere without language barriers',
				'Consume any media without subtitles',
				'Make friends across all cultures easily',
				'Access global knowledge directly'
			],
			'Economy': [
				'Global trade dramatically simplified',
				'Translation industry becomes obsolete',
				'International hiring without limits',
				'Tourism industry expands massively'
			],
			'Technology': [
				'No need for translation software',
				'Global collaboration on projects easier',
				'Documentation accessible to everyone',
				'Customer support simplified globally'
			],
			'Social Structure': [
				'Cultural exchange accelerates rapidly',
				'Immigration integration much easier',
				'Cross-cultural marriages increase',
				'National identities may weaken'
			],
			'Advantages': [
				'Perfect global communication achieved',
				'Education accessible across languages',
				'Scientific collaboration enhanced greatly',
				'Reduced misunderstandings between nations'
			],
			'Problems': [
				'Linguistic diversity may diminish',
				'Cultural nuances potentially lost',
				'Some languages may go extinct faster',
				'Local identity erosion concerns'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'ai-decisions-banned',
		title: 'Autonomous AI decisions banned',
		seed: 'AI systems cannot make decisions without human approval',
		sections: {
			'Daily Life': [
				'All AI recommendations need confirmation',
				'Slower but more deliberate technology use',
				'Human operators required everywhere',
				'More jobs in AI supervision created'
			],
			'Economy': [
				'Automation benefits limited significantly',
				'Labor market remains more stable',
				'AI companies pivot to advisory tools',
				'Human-in-the-loop services premium priced'
			],
			'Technology': [
				'AI assists but never decides alone',
				'Focus shifts to explainable AI',
				'Real-time applications become limited',
				'Hybrid human-AI systems dominate'
			],
			'Social Structure': [
				'Human expertise remains highly valued',
				'AI anxiety reduced substantially',
				'Clearer accountability for decisions',
				'Job displacement concerns eased'
			],
			'Advantages': [
				'Human oversight prevents AI errors',
				'Accountability clearly established always',
				'Jobs preserved in many sectors',
				'Ethical concerns more easily addressed'
			],
			'Problems': [
				'Slower response in critical situations',
				'Competitive disadvantage internationally',
				'Some beneficial automations blocked',
				'Enforcement across borders very difficult'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	},
	{
		id: 'sea-level-drops-10m',
		title: 'Global sea level drops 10m',
		seed: 'Ocean levels decrease by 10 meters worldwide',
		sections: {
			'Daily Life': [
				'Coastal cities gain significant new land',
				'Beaches extend much further out',
				'Many ports require major reconstruction',
				'New archaeological sites revealed'
			],
			'Economy': [
				'Shipping industry faces massive disruption',
				'New land creates development opportunities',
				'Fishing grounds shift dramatically',
				'Port cities invest in infrastructure'
			],
			'Technology': [
				'New desalination less necessary inland',
				'Bridge and tunnel projects redesigned',
				'Ocean monitoring systems updated',
				'Coastal engineering transformed completely'
			],
			'Social Structure': [
				'Coastal property values fluctuate wildly',
				'New territorial disputes over land',
				'Island nations gain more territory',
				'Migration patterns shift significantly'
			],
			'Advantages': [
				'More habitable land area available',
				'Flood risks reduced for many cities',
				'Hidden resources become accessible',
				'Some islands reconnect to mainland'
			],
			'Problems': [
				'Marine ecosystems severely disrupted',
				'Major ports become non-functional',
				'Groundwater tables affected negatively',
				'Climate patterns change unpredictably'
			]
		},
		lastUpdated: new Date().toISOString(),
		favorite: false
	}
];

let scenarios = [];
let currentScenarioId = null;

const elements = {
	searchInput: document.getElementById('searchInput'),
	scenarioSelect: document.getElementById('scenarioSelect'),
	scenarioButtons: document.getElementById('scenarioButtons'),
	createBtn: document.getElementById('createBtn'),
	generateBtn: document.getElementById('generateBtn'),
	exportBtn: document.getElementById('exportBtn'),
	importBtn: document.getElementById('importBtn'),
	importFile: document.getElementById('importFile'),
	favToggle: document.getElementById('favToggle'),
	favIcon: document.getElementById('favIcon'),
	viewer: document.getElementById('viewer'),
	scenarioTitle: document.getElementById('scenarioTitle'),
	scenarioSeed: document.getElementById('scenarioSeed'),
	sectionCards: document.getElementById('sectionCards'),
	totalCount: document.getElementById('totalCount'),
	favCount: document.getElementById('favCount'),
	offlineIndicator: document.getElementById('offlineIndicator'),
	customModal: document.getElementById('customModal'),
	customTitle: document.getElementById('customTitle'),
	customSeed: document.getElementById('customSeed'),
	cancelModal: document.getElementById('cancelModal'),
	saveCustom: document.getElementById('saveCustom'),
	aiModal: document.getElementById('aiModal'),
	aiPrompt: document.getElementById('aiPrompt'),
	aiApiKey: document.getElementById('aiApiKey'),
	aiModel: document.getElementById('aiModel'),
	cancelAiModal: document.getElementById('cancelAiModal'),
	generateAi: document.getElementById('generateAi'),
	loadingOverlay: document.getElementById('loadingOverlay')
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
	const displayScenarios = scenarios.slice(0, 6);
	elements.scenarioButtons.innerHTML = displayScenarios.map(s =>
		`<button class="scenario-btn ${s.id === currentScenarioId ? 'active' : ''}" data-id="${s.id}">${truncateText(s.title, 20)}</button>`
	).join('');
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
	elements.sectionCards.innerHTML = SECTION_NAMES.map(name => `
        <div class="section-card">
            <h3 class="section-card__title">${name}</h3>
            <ul class="section-card__list">
                ${sections[name] ? sections[name].map(point => `<li>${point}</li>`).join('') : '<li>No data available</li>'}
            </ul>
        </div>
    `).join('');
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

function updateStats() {
	elements.totalCount.textContent = scenarios.length;
	elements.favCount.textContent = scenarios.filter(s => s.favorite).length;
}

function setupEventListeners() {
	elements.searchInput.addEventListener('input', e => renderScenarioSelect(e.target.value));
	elements.scenarioSelect.addEventListener('change', e => selectScenario(e.target.value));
	elements.scenarioButtons.addEventListener('click', e => {
		if (e.target.classList.contains('scenario-btn')) {
			selectScenario(e.target.dataset.id);
		}
	});
	elements.createBtn.addEventListener('click', () => openModal('customModal'));
	elements.generateBtn.addEventListener('click', () => {
		elements.aiApiKey.value = localStorage.getItem(AI_KEY_STORAGE) || '';
		openModal('aiModal');
	});
	elements.exportBtn.addEventListener('click', exportScenarios);
	elements.importBtn.addEventListener('click', () => elements.importFile.click());
	elements.importFile.addEventListener('change', importScenarios);
	elements.favToggle.addEventListener('click', toggleFavorite);
	elements.cancelModal.addEventListener('click', () => closeModal('customModal'));
	elements.saveCustom.addEventListener('click', saveCustomScenario);
	elements.cancelAiModal.addEventListener('click', () => closeModal('aiModal'));
	elements.generateAi.addEventListener('click', handleGenerateAi);
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

function toggleFavorite() {
	const scenario = scenarios.find(s => s.id === currentScenarioId);
	if (scenario) {
		scenario.favorite = !scenario.favorite;
		saveScenarios();
		updateFavButton(scenario.favorite);
	}
}

function saveCustomScenario() {
	const title = elements.customTitle.value.trim();
	const seed = elements.customSeed.value.trim();
	if (!title || !seed) {
		alert('Please fill in title and description');
		return;
	}

	const newScenario = {
		id: createIdFromTitle(title),
		title,
		seed,
		sections: SECTION_NAMES.reduce((acc, name) => ({...acc, [name]: []}), {}),
		lastUpdated: new Date().toISOString(),
		favorite: false
	};

	scenarios.push(newScenario);
	saveScenarios();
	renderScenarioSelect();
	renderScenarioButtons();
	selectScenario(newScenario.id);
	closeModal('customModal');
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
			alert(`Generation failed: ${error.message}. Check console for details. Using fallback.`);
			const fallbackScenario = generateFallbackScenario(prompt);
			scenarios.push(fallbackScenario);
			saveScenarios();
			renderScenarioSelect();
			renderScenarioButtons();
			selectScenario(fallbackScenario.id);
		})
		.finally(() => {
			showLoading(false);
			closeModal('aiModal');
		});
}

async function generateScenarioWithAi(userPrompt, apiKey, model) {
	const systemPrompt = `You are a scenario generator for "What If?" simulations. Generate a hypothetical scenario based on the user prompt.
Make all responses compact, minimal, fun, easy to read, and use emojis where appropriate. Keep points short and snappy!
Output strictly in JSON format with no additional text:
{
    "id": "unique-slug-based-on-title",
    "title": "Scenario Title",
    "seed": "Brief description",
    "sections": {
        "Daily Life": ["point1", "point2", "point3", "point4"],
        "Economy": ["point1", "point2", "point3", "point4"],
        "Technology": ["point1", "point2", "point3", "point4"],
        "Social Structure": ["point1", "point2", "point3", "point4"],
        "Advantages": ["point1", "point2", "point3", "point4"],
        "Problems": ["point1", "point2", "point3", "point4"]
    }
}
Exactly 4 points per section. Make the id a kebab-case slug from the title.`;

	const messages = [
		{role: 'system', content: systemPrompt},
		{role: 'user', content: `Generate scenario for: ${userPrompt}`}
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
			temperature: 0.7,
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

	// Validate sections
	Object.keys(scenario.sections).forEach(key => {
		if (!Array.isArray(scenario.sections[key]) || scenario.sections[key].length !== 4) {
			throw new Error('Invalid section format');
		}
	});

	return scenario;
}

function generateFallbackScenario(prompt) {
	const title = `Fallback: ${prompt}`;
	const id = createIdFromTitle(title);
	const seed = prompt;
	const sections = {};
	SECTION_NAMES.forEach(section => {
		sections[section] = [
			`Placeholder point 1 for ${section.toLowerCase()} 😊`,
			`Placeholder point 2 for ${section.toLowerCase()} 🚀`,
			`Placeholder point 3 for ${section.toLowerCase()} 🌟`,
			`Placeholder point 4 for ${section.toLowerCase()} ⚡`
		];
	});
	return {
		id,
		title,
		seed,
		sections,
		lastUpdated: new Date().toISOString(),
		favorite: false
	};
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