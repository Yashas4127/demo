// Hackathon Winning Features - Impact Visualizations, Comparisons, Marketplace, Stories

// Impact Visualization - Convert CO2 to real-world equivalents
function calculateImpactMetrics(totalCo2e) {
    const co2eKg = totalCo2e * 1000; // Convert tonnes to kg
    
    return {
        carsOffRoad: Math.round(co2eKg / 4600), // Average car emits 4.6 tonnes/year = 4600 kg
        treesPlanted: Math.round(co2eKg / 21.77), // One tree absorbs ~21.77 kg CO2/year
        smartphonesCharged: Math.round(co2eKg / 0.05), // ~0.05 kg per charge
        milesDriven: Math.round(co2eKg / 0.411), // Average car: 0.411 kg CO2 per mile
        homesPowered: Math.round(co2eKg / 12000), // Average home: 12 tonnes/year
        flightsAvoided: Math.round(co2eKg / 200), // Short flight: ~200 kg CO2
    };
}

function renderImpactVisualization() {
    const logs = api.getCarbonLogs();
    const totalCo2e = logs.reduce((sum, log) => sum + (parseFloat(log.co2e) || 0), 0);
    const metrics = calculateImpactMetrics(totalCo2e);
    
    const impactGrid = document.getElementById('impactGrid');
    if (!impactGrid) return;
    
    const impactData = [
        {
            icon: '🚗',
            value: metrics.carsOffRoad,
            label: 'Cars Off Road',
            description: `Equivalent to removing ${metrics.carsOffRoad} cars from the road for a year`
        },
        {
            icon: '🌳',
            value: metrics.treesPlanted,
            label: 'Trees Planted',
            description: `Equivalent to planting ${metrics.treesPlanted} trees`
        },
        {
            icon: '📱',
            value: metrics.smartphonesCharged,
            label: 'Smartphones Charged',
            description: `Equivalent to charging ${metrics.smartphonesCharged.toLocaleString()} smartphones`
        },
        {
            icon: '🏠',
            value: metrics.homesPowered,
            label: 'Homes Powered',
            description: `Equivalent to powering ${metrics.homesPowered} homes for a year`
        },
        {
            icon: '✈️',
            value: metrics.flightsAvoided,
            label: 'Flights Avoided',
            description: `Equivalent to avoiding ${metrics.flightsAvoided} short-haul flights`
        },
        {
            icon: '🛣️',
            value: metrics.milesDriven.toLocaleString(),
            label: 'Miles Not Driven',
            description: `Equivalent to not driving ${metrics.milesDriven.toLocaleString()} miles`
        }
    ];
    
    impactGrid.innerHTML = impactData.map(item => `
        <div class="impact-card">
            <div class="impact-icon">${item.icon}</div>
            <div class="impact-value">${item.value}</div>
            <div class="impact-label">${item.label}</div>
            <div class="impact-description">${item.description}</div>
        </div>
    `).join('');
}

// Comparison Dashboard
function renderComparisonDashboard() {
    const logs = api.getCarbonLogs();
    const totalCo2e = logs.reduce((sum, log) => sum + (parseFloat(log.co2e) || 0), 0);
    const dailyCo2e = totalCo2e / 365; // Approximate daily from total
    
    // Global average: ~4.8 tonnes CO2e per person per year = ~13.15 kg/day
    const globalAvg = 13.15;
    // US average: ~16 tonnes CO2e per person per year = ~43.84 kg/day
    const usAvg = 43.84;
    // Community average (demo): ~8 tonnes CO2e per person per year = ~21.92 kg/day
    const communityAvg = 21.92;
    
    const dailyCo2eKg = dailyCo2e * 1000;
    
    const globalPercent = globalAvg > 0 ? ((dailyCo2eKg / globalAvg) * 100).toFixed(0) : 0;
    const nationalPercent = usAvg > 0 ? ((dailyCo2eKg / usAvg) * 100).toFixed(0) : 0;
    const communityPercent = communityAvg > 0 ? ((dailyCo2eKg / communityAvg) * 100).toFixed(0) : 0;
    
    const globalEl = document.getElementById('globalComparison');
    const nationalEl = document.getElementById('nationalComparison');
    const communityEl = document.getElementById('communityComparison');
    
    if (globalEl) globalEl.textContent = `${globalPercent}%`;
    if (nationalEl) nationalEl.textContent = `${nationalPercent}%`;
    if (communityEl) communityEl.textContent = `${communityPercent}%`;
}

// Carbon Offset Marketplace
const marketplaceProjects = [
    {
        id: 1,
        title: 'Amazon Rainforest Protection',
        location: '🇧🇷 Brazil',
        description: 'Protect 1,000 acres of Amazon rainforest from deforestation. This project prevents millions of tonnes of CO2 from entering the atmosphere while preserving biodiversity.',
        co2Offset: 5000,
        treesProtected: 50000,
        price: 25,
        verified: true,
        category: 'Forestry'
    },
    {
        id: 2,
        title: 'Solar Energy in India',
        location: '🇮🇳 India',
        description: 'Install solar panels in rural communities, replacing diesel generators. Provides clean energy access while reducing emissions.',
        co2Offset: 3000,
        homesPowered: 150,
        price: 15,
        verified: true,
        category: 'Renewable Energy'
    },
    {
        id: 3,
        title: 'Ocean Plastic Cleanup',
        location: '🌊 Pacific Ocean',
        description: 'Remove plastic waste from ocean gyres and convert to clean fuel. Each project removes 10,000 kg of plastic and prevents marine CO2 emissions.',
        co2Offset: 2000,
        plasticRemoved: 10000,
        price: 10,
        verified: true,
        category: 'Waste Management'
    },
    {
        id: 4,
        title: 'Wind Farm Development',
        location: '🇺🇸 Texas, USA',
        description: 'Support construction of new wind turbines providing clean energy to 50,000 homes. Verified carbon credits from renewable energy generation.',
        co2Offset: 8000,
        homesPowered: 50000,
        price: 40,
        verified: true,
        category: 'Renewable Energy'
    },
    {
        id: 5,
        title: 'Mangrove Restoration',
        location: '🇮🇩 Indonesia',
        description: 'Restore mangrove forests that act as natural carbon sinks. Mangroves absorb 4x more CO2 than terrestrial forests.',
        co2Offset: 4000,
        treesPlanted: 20000,
        price: 20,
        verified: true,
        category: 'Forestry'
    },
    {
        id: 6,
        title: 'Clean Cookstoves in Africa',
        location: '🇰🇪 Kenya',
        description: 'Distribute efficient cookstoves that reduce wood consumption by 60%. Improves air quality and reduces deforestation.',
        co2Offset: 2500,
        familiesHelped: 500,
        price: 12,
        verified: true,
        category: 'Social Impact'
    }
];

function renderMarketplace() {
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    if (!marketplaceGrid) return;
    
    marketplaceGrid.innerHTML = marketplaceProjects.map(project => `
        <div class="marketplace-item">
            <div class="marketplace-header">
                <div>
                    <div class="marketplace-title">${project.title}</div>
                    <div class="marketplace-location">📍 ${project.location}</div>
                </div>
                ${project.verified ? '<span class="marketplace-badge">✓ Verified</span>' : ''}
            </div>
            <div class="marketplace-description">${project.description}</div>
            <div class="marketplace-stats">
                <div class="marketplace-stat">
                    <div class="marketplace-stat-value">${project.co2Offset.toLocaleString()}</div>
                    <div class="marketplace-stat-label">kg CO₂ Offset</div>
                </div>
                <div class="marketplace-stat">
                    <div class="marketplace-stat-value">${project.treesProtected || project.homesPowered || project.treesPlanted || project.familiesHelped || project.plasticRemoved?.toLocaleString() || 'N/A'}</div>
                    <div class="marketplace-stat-label">${project.treesProtected ? 'Trees Protected' : project.homesPowered ? 'Homes Powered' : project.treesPlanted ? 'Trees Planted' : project.familiesHelped ? 'Families Helped' : project.plasticRemoved ? 'kg Plastic' : 'Impact'}</div>
                </div>
            </div>
            <div class="marketplace-footer">
                <div>
                    <div class="marketplace-price">$${project.price}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">per tonne CO₂</div>
                </div>
                <button class="marketplace-cta" onclick="handleOffsetPurchase(${project.id})">
                    Support Project
                </button>
            </div>
        </div>
    `).join('');
}

function handleOffsetPurchase(projectId) {
    const project = marketplaceProjects.find(p => p.id === projectId);
    if (!project) return;
    
    // Show confirmation
    if (confirm(`Support ${project.title}?\n\nThis will offset ${project.co2Offset} kg CO₂ for $${project.price} per tonne.\n\n(In demo mode, this is a simulation)`)) {
        // In production, this would process payment
        alert(`Thank you for supporting ${project.title}! Your contribution helps offset ${project.co2Offset} kg of CO₂. 🌱`);
        
        // Update user's offset total
        const currentOffset = parseFloat(localStorage.getItem('totalOffset') || '0');
        localStorage.setItem('totalOffset', (currentOffset + project.co2Offset).toString());
        
        // Trigger dashboard update
        if (typeof updateDashboard === 'function') {
            updateDashboard();
        }
    }
}

// Impact Stories
const impactStories = [
    {
        name: 'Sarah Chen',
        location: 'San Francisco, CA',
        avatar: 'SC',
        story: 'I started tracking my carbon footprint 6 months ago and made small changes like biking to work and reducing meat consumption. I\'ve reduced my footprint by 35% and saved over $200 on transportation!',
        impact: '2.1 tonnes CO₂ saved',
        timeframe: '6 months'
    },
    {
        name: 'Marcus Johnson',
        location: 'Austin, TX',
        avatar: 'MJ',
        story: 'Switching to solar panels and an electric vehicle cut my household emissions by 60%. The best part? My energy bills dropped significantly, and I feel great about my environmental impact.',
        impact: '4.8 tonnes CO₂ saved',
        timeframe: '1 year'
    },
    {
        name: 'Emma Rodriguez',
        location: 'Portland, OR',
        avatar: 'ER',
        story: 'By composting, reducing waste, and buying local, I\'ve achieved a 45% reduction. My community started a carbon challenge, and together we\'ve offset over 50 tonnes of CO₂!',
        impact: '1.9 tonnes CO₂ saved',
        timeframe: '8 months'
    }
];

function renderImpactStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;
    
    storiesGrid.innerHTML = impactStories.map(story => `
        <div class="story-card">
            <div class="story-header">
                <div class="story-avatar">${story.avatar}</div>
                <div class="story-info">
                    <h4>${story.name}</h4>
                    <p>📍 ${story.location}</p>
                </div>
            </div>
            <div class="story-content">"${story.story}"</div>
            <div class="story-impact">
                <div class="story-impact-value">${story.impact}</div>
                <div class="story-impact-label">in ${story.timeframe}</div>
            </div>
        </div>
    `).join('');
}

// Real-time Data Integration (Mock for demo)
function getRealTimeData() {
    // In production, this would fetch from weather/grid APIs
    return {
        weather: {
            temp: 72,
            condition: 'Sunny',
            renewableFriendly: true
        },
        gridIntensity: {
            current: 0.35, // kg CO2 per kWh (lower is better)
            renewablePercent: 45,
            optimalTime: '2:00 PM - 4:00 PM'
        }
    };
}

function renderRealTimeData() {
    const data = getRealTimeData();
    
    // Add real-time badge to dashboard if not exists
    const dashboardHeader = document.querySelector('#dashboard .section-header');
    if (dashboardHeader && !document.getElementById('realtimeBadge')) {
        const badge = document.createElement('div');
        badge.id = 'realtimeBadge';
        badge.className = 'realtime-badge';
        badge.innerHTML = `⚡ Live: ${data.gridIntensity.renewablePercent}% Renewable • Best time: ${data.gridIntensity.optimalTime}`;
        dashboardHeader.appendChild(badge);
    }
}

// Social Sharing
function shareAchievement(type, data) {
    const shareText = {
        footprint: `I've reduced my carbon footprint! Check out my progress: ${data.co2e} tonnes CO₂e saved. 🌱`,
        achievement: `I just unlocked the "${data.name}" achievement! 🏆`,
        offset: `I just supported ${data.project} to offset ${data.co2} kg CO₂! 🌍`
    };
    
    const text = shareText[type] || 'Check out my carbon footprint progress! 🌱';
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Carbon Footprint Progress',
            text: text,
            url: url
        }).catch(err => console.log('Error sharing', err));
    } else {
        // Fallback: copy to clipboard
        const shareUrl = `${text} ${url}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link copied to clipboard! Share it anywhere.');
        });
    }
}

// Enhanced AI Recommendations
function generatePersonalizedRecommendations() {
    const logs = api.getCarbonLogs();
    const totalCo2e = logs.reduce((sum, log) => sum + (parseFloat(log.co2e) || 0), 0);
    
    const recommendations = [];
    
    if (totalCo2e > 10) {
        recommendations.push({
            icon: '🚗',
            title: 'Switch to Electric Vehicle',
            description: 'Based on your transport emissions, switching to an EV could reduce your footprint by 50-70%.',
            impact: 'Save ~3 tonnes CO₂/year',
            difficulty: 'Medium',
            category: 'Transport'
        });
    }
    
    if (totalCo2e > 5) {
        recommendations.push({
            icon: '🌱',
            title: 'Go Plant-Based 3 Days/Week',
            description: 'Reducing meat consumption can cut food-related emissions by 40-50%.',
            impact: 'Save ~1.2 tonnes CO₂/year',
            difficulty: 'Easy',
            category: 'Food'
        });
    }
    
    recommendations.push({
        icon: '⚡',
        title: 'Optimize Energy Usage',
        description: 'Use appliances during peak renewable hours (usually midday) to maximize clean energy.',
        impact: 'Save ~0.5 tonnes CO₂/year',
        difficulty: 'Easy',
        category: 'Energy'
    });
    
    recommendations.push({
        icon: '🏠',
        title: 'Home Energy Audit',
        description: 'A professional audit can identify energy leaks and save 15-30% on bills.',
        impact: 'Save ~1.5 tonnes CO₂/year',
        difficulty: 'Medium',
        category: 'Energy'
    });
    
    return recommendations;
}

// Initialize all features
function initializeHackathonFeatures() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeFeatures, 500);
        });
    } else {
        setTimeout(initializeFeatures, 500);
    }
}

function initializeFeatures() {
    renderImpactVisualization();
    renderComparisonDashboard();
    renderMarketplace();
    renderImpactStories();
    renderRealTimeData();
    
    // Update on data changes
    if (typeof updateDashboard === 'function') {
        const originalUpdate = updateDashboard;
        updateDashboard = function() {
            originalUpdate();
            renderImpactVisualization();
            renderComparisonDashboard();
        };
    }
}

// Auto-initialize
initializeHackathonFeatures();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.hackathonFeatures = {
        renderImpactVisualization,
        renderComparisonDashboard,
        renderMarketplace,
        renderImpactStories,
        shareAchievement,
        generatePersonalizedRecommendations
    };
}

