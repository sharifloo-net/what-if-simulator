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
    aiEndpoint: document.getElementById('aiEndpoint'),
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
    
    elements.sectionCards.classList.add('fade-out');
    
    setTimeout(() => {
        renderScenario(scenario);
        elements.sectionCards.classList.remove('fade-out');
    }, 150);
    
    renderScenarioSelect();
    renderScenarioButtons();
    updateFavoriteButton(scenario.favorite);
}

function renderScenario(scenario) {
    elements.scenarioTitle.textContent = scenario.title;
    elements.scenarioSeed.textContent = scenario.seed;
    
    elements.sectionCards.innerHTML = SECTION_NAMES.map(name => `
        <div class="section-card">
            <h3 class="section-card__title">${name}</h3>
            <ul class="section-card__list">
                ${(scenario.sections[name] || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function updateFavoriteButton(isFavorite) {
    elements.favIcon.textContent = isFavorite ? '★' : '☆';
    elements.favToggle.classList.toggle('active', isFavorite);
    elements.favToggle.innerHTML = `<span id="favIcon">${isFavorite ? '★' : '☆'}</span> ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}`;
}

function toggleFavorite() {
    if (!currentScenarioId) return;
    
    const scenario = scenarios.find(s => s.id === currentScenarioId);
    if (scenario) {
        scenario.favorite = !scenario.favorite;
        scenario.lastUpdated = new Date().toISOString();
        saveScenarios();
        updateFavoriteButton(scenario.favorite);
    }
}

function updateStats() {
    elements.totalCount.textContent = scenarios.length;
    elements.favCount.textContent = scenarios.filter(s => s.favorite).length;
}

function generateId() {
    return 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function generateFallback(seed) {
    const keywords = seed.toLowerCase();
    const sections = {};
    
    SECTION_NAMES.forEach(name => {
        sections[name] = [];
    });
    
    if (keywords.includes('water') || keywords.includes('ocean') || keywords.includes('sea')) {
        sections['Daily Life'] = ['Water conservation becomes essential', 'Swimming skills widely taught', 'Coastal living patterns shift'];
        sections['Economy'] = ['Maritime industries transformed', 'Water pricing affects markets', 'New shipping routes emerge'];
        sections['Technology'] = ['Desalination technology advances', 'Water recycling systems improve', 'Aquatic sensors developed'];
        sections['Social Structure'] = ['Coastal communities reorganize', 'Water rights become political', 'Migration to water sources'];
        sections['Advantages'] = ['Cleaner water sources', 'New aquatic opportunities', 'Marine awareness increases'];
        sections['Problems'] = ['Water scarcity in some regions', 'Ecosystem disruption possible', 'Infrastructure changes needed'];
    } else if (keywords.includes('fly') || keywords.includes('flight') || keywords.includes('air')) {
        sections['Daily Life'] = ['Air travel becomes common', 'Vertical living increases', 'Ground transportation decreases'];
        sections['Economy'] = ['Aviation industry expands', 'Real estate values shift', 'New air-based services emerge'];
        sections['Technology'] = ['Personal flight devices develop', 'Air traffic systems evolve', 'Landing infrastructure grows'];
        sections['Social Structure'] = ['Geographic barriers fade', 'New communities form above', 'Social spaces go vertical'];
        sections['Advantages'] = ['Faster travel everywhere', 'Reduced road congestion', 'New exploration possibilities'];
        sections['Problems'] = ['Air traffic management complex', 'Safety regulations needed', 'Noise pollution increases'];
    } else if (keywords.includes('food') || keywords.includes('eat') || keywords.includes('hunger')) {
        sections['Daily Life'] = ['Meal patterns fundamentally change', 'Food preparation evolves', 'Eating habits transform'];
        sections['Economy'] = ['Agriculture industry shifts', 'Food distribution changes', 'Restaurant sector adapts'];
        sections['Technology'] = ['Food production innovates', 'Nutrition tracking advances', 'Food preservation improves'];
        sections['Social Structure'] = ['Shared meals evolve culturally', 'Food-based traditions change', 'Community eating patterns shift'];
        sections['Advantages'] = ['Potential health improvements', 'Resource usage optimized', 'New culinary experiences'];
        sections['Problems'] = ['Cultural food loss possible', 'Transition challenges arise', 'Nutritional concerns emerge'];
    } else if (keywords.includes('sleep') || keywords.includes('dream') || keywords.includes('rest')) {
        sections['Daily Life'] = ['Sleep schedules restructured', 'Rest patterns fundamentally change', 'Night activities increase'];
        sections['Economy'] = ['24-hour businesses expand', 'Sleep industry transforms', 'Productivity patterns shift'];
        sections['Technology'] = ['Sleep monitoring advances', 'Rest optimization tech grows', 'Dream recording explored'];
        sections['Social Structure'] = ['Social schedules realign', 'Night communities develop', 'Family time patterns change'];
        sections['Advantages'] = ['More productive hours possible', 'Flexible lifestyle options', 'Health optimization potential'];
        sections['Problems'] = ['Circadian rhythm disruption', 'Social coordination harder', 'Health impacts uncertain'];
    } else {
        sections['Daily Life'] = ['Routines fundamentally altered', 'New habits form quickly', 'Adaptation becomes necessary', 'Lifestyle adjustments required'];
        sections['Economy'] = ['Markets respond to changes', 'New industries may emerge', 'Traditional sectors adapt', 'Economic patterns shift'];
        sections['Technology'] = ['Innovation accelerates in response', 'New solutions developed', 'Existing tech repurposed', 'Research priorities change'];
        sections['Social Structure'] = ['Communities reorganize naturally', 'Social norms evolve', 'Relationships adapt accordingly', 'Institutions may reform'];
        sections['Advantages'] = ['New opportunities arise', 'Problems may be solved', 'Growth potential exists', 'Innovation is stimulated'];
        sections['Problems'] = ['Adjustment period challenging', 'Unforeseen issues emerge', 'Some groups face difficulties', 'Transition costs are real'];
    }
    
    return sections;
}

async function generateWithAI(prompt, endpoint) {
    const template = `INPUT_SCENARIO: "${prompt}"

Produce VALID JSON with keys:
Daily Life, Economy, Technology, Social Structure, Advantages, Problems

Rules:
- 2–4 bullets per section
- Max 12 words per bullet
- Realistic, concrete
- No extra text`;

    if (!endpoint) {
        return generateFallback(prompt);
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: template })
        });
        
        if (!response.ok) throw new Error('AI request failed');
        
        const data = await response.json();
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        
        const isValid = SECTION_NAMES.every(name => 
            Array.isArray(parsed[name]) && parsed[name].length >= 2 && parsed[name].length <= 4
        );
        
        if (!isValid) throw new Error('Invalid AI response format');
        
        return parsed;
    } catch (error) {
        console.log('AI generation failed, using fallback:', error.message);
        return generateFallback(prompt);
    }
}

function createCustomScenario(title, seed) {
    const scenario = {
        id: generateId(),
        title: title.trim(),
        seed: seed.trim(),
        sections: generateFallback(seed),
        lastUpdated: new Date().toISOString(),
        favorite: false
    };
    
    scenarios.unshift(scenario);
    saveScenarios();
    renderScenarioSelect();
    renderScenarioButtons();
    selectScenario(scenario.id);
}

function exportScenarios() {
    const dataStr = JSON.stringify(scenarios, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'whatif-scenarios-export.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

function importScenarios(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (!Array.isArray(imported)) throw new Error('Invalid format');
            
            const existingTitles = new Set(scenarios.map(s => s.title.toLowerCase()));
            let addedCount = 0;
            
            imported.forEach(scenario => {
                if (!existingTitles.has(scenario.title.toLowerCase())) {
                    scenario.id = generateId();
                    scenarios.push(scenario);
                    existingTitles.add(scenario.title.toLowerCase());
                    addedCount++;
                }
            });
            
            saveScenarios();
            renderScenarioSelect();
            renderScenarioButtons();
            alert(`Imported ${addedCount} new scenarios (${imported.length - addedCount} duplicates skipped)`);
        } catch (error) {
            alert('Failed to import: Invalid JSON file');
        }
    };
    reader.readAsText(file);
}

function setupEventListeners() {
    elements.searchInput.addEventListener('input', (e) => {
        renderScenarioSelect(e.target.value);
    });
    
    elements.scenarioSelect.addEventListener('change', (e) => {
        selectScenario(e.target.value);
    });
    
    elements.scenarioButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('scenario-btn')) {
            selectScenario(e.target.dataset.id);
        }
    });
    
    elements.createBtn.addEventListener('click', () => {
        elements.customModal.classList.remove('hidden');
        elements.customTitle.focus();
    });
    
    elements.cancelModal.addEventListener('click', () => {
        elements.customModal.classList.add('hidden');
        elements.customTitle.value = '';
        elements.customSeed.value = '';
    });
    
    elements.saveCustom.addEventListener('click', () => {
        const title = elements.customTitle.value.trim();
        const seed = elements.customSeed.value.trim();
        
        if (!title) {
            alert('Please enter a title');
            return;
        }
        
        createCustomScenario(title, seed || title);
        elements.customModal.classList.add('hidden');
        elements.customTitle.value = '';
        elements.customSeed.value = '';
    });
    
    elements.generateBtn.addEventListener('click', () => {
        elements.aiModal.classList.remove('hidden');
        elements.aiPrompt.focus();
    });
    
    elements.cancelAiModal.addEventListener('click', () => {
        elements.aiModal.classList.add('hidden');
        elements.aiPrompt.value = '';
    });
    
    elements.generateAi.addEventListener('click', async () => {
        const prompt = elements.aiPrompt.value.trim();
        const endpoint = elements.aiEndpoint.value.trim();
        
        if (!prompt) {
            alert('Please enter a scenario prompt');
            return;
        }
        
        elements.aiModal.classList.add('hidden');
        elements.loadingOverlay.classList.remove('hidden');
        
        try {
            const sections = await generateWithAI(prompt, endpoint);
            const scenario = {
                id: generateId(),
                title: prompt,
                seed: prompt,
                sections: sections,
                lastUpdated: new Date().toISOString(),
                favorite: false
            };
            
            scenarios.unshift(scenario);
            saveScenarios();
            renderScenarioSelect();
            renderScenarioButtons();
            selectScenario(scenario.id);
        } catch (error) {
            alert('Failed to generate scenario');
        } finally {
            elements.loadingOverlay.classList.add('hidden');
            elements.aiPrompt.value = '';
        }
    });
    
    elements.favToggle.addEventListener('click', toggleFavorite);
    
    elements.exportBtn.addEventListener('click', exportScenarios);
    
    elements.importBtn.addEventListener('click', () => {
        elements.importFile.click();
    });
    
    elements.importFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            importScenarios(e.target.files[0]);
            e.target.value = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const currentIndex = scenarios.findIndex(s => s.id === currentScenarioId);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : scenarios.length - 1;
            } else {
                newIndex = currentIndex < scenarios.length - 1 ? currentIndex + 1 : 0;
            }
            
            selectScenario(scenarios[newIndex].id);
        }
        
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFavorite();
        }
    });
    
    elements.customModal.addEventListener('click', (e) => {
        if (e.target === elements.customModal) {
            elements.customModal.classList.add('hidden');
        }
    });
    
    elements.aiModal.addEventListener('click', (e) => {
        if (e.target === elements.aiModal) {
            elements.aiModal.classList.add('hidden');
        }
    });
}

function setupOfflineDetection() {
    function updateOnlineStatus() {
        if (navigator.onLine) {
            elements.offlineIndicator.classList.add('hidden');
        } else {
            elements.offlineIndicator.classList.remove('hidden');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

document.addEventListener('DOMContentLoaded', init);
