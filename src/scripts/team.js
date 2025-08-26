// Team member data
const teamMembers = [
    {
        id: '1',
        name: 'Srinivasan Seshadri Simhan',
        title: 'B. Tech (IITM), MBA(IIMA)',
        degree: 'Board Member & CTO',
        description: 'Qualcomm architect specializing in SoC design and advanced verification methodologies.',
        expertise: ['Semiconductor Strategy', 'Business Leadership', 'Technology Vision'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
        borderColor: 'red-border',
        fullBio: 'Srinivasan is a seasoned technology leader with over 20 years of experience in semiconductor design and architecture. He has led multiple successful projects at Qualcomm and has been instrumental in developing next-generation SoC architectures.',
        experience: '20+ years at Qualcomm',
        achievements: [
            'Led development of 5 major SoC architectures',
            'Published 15+ research papers in top-tier conferences',
            'Holds 25+ patents in semiconductor design'
        ]
    },
    {
        id: '2',
        name: 'Dr. Priya Sharma',
        title: 'PhD',
        degree: 'Board Member & CTO',
        description: 'Qualcomm architect specializing in SoC design and advanced verification methodologies.',
        expertise: ['SoC Architecture', 'System Design', 'Innovation'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b132?w=60&h=60&fit=crop&crop=face',
        borderColor: 'red-border',
        fullBio: 'Dr. Priya Sharma brings extensive experience in system-on-chip design and has been a driving force behind several breakthrough innovations in the semiconductor industry.',
        experience: '15+ years in semiconductor industry',
        achievements: [
            'Leading expert in SoC verification',
            'Keynote speaker at 10+ international conferences',
            'Winner of IEEE Outstanding Engineer Award'
        ]
    },
    {
        id: '3',
        name: 'Arjun Patel',
        title: 'Senior Member - VLSI Design',
        degree: 'M.Tech',
        description: '12+ years at NVIDIA working GPU design teams and verification infrastructure development.',
        expertise: ['GPU Design', 'Verification', 'SystemVerilog'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        borderColor: 'green-border',
        fullBio: 'Arjun has been at the forefront of GPU design innovation at NVIDIA, contributing to multiple generations of graphics processors and establishing robust verification methodologies.',
        experience: '12+ years at NVIDIA',
        achievements: [
            'Key contributor to 3 GPU architectures',
            'Developed industry-standard verification flows',
            'Mentored 50+ engineers'
        ]
    },
    {
        id: '4',
        name: 'Vikram Singh',
        title: 'Senior Member - Embedded Systems',
        degree: 'B.Tech',
        description: 'Former Texas Instruments lead engineer with expertise in ARM processors and IoT solutions.',
        expertise: ['ARM Architecture', 'IoT Systems', 'RTOS'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
        borderColor: 'green-border',
        fullBio: 'Vikram specializes in embedded systems design with a focus on low-power ARM processors and IoT applications. His work has enabled numerous successful commercial products.',
        experience: '14+ years at Texas Instruments',
        achievements: [
            'Architected 5 ARM-based SoCs',
            'Expert in real-time operating systems',
            'Led IoT platform development'
        ]
    },
    {
        id: '5',
        name: 'Anjali Mehta',
        title: 'Principal Engineer - Analog Design',
        degree: 'M.S.',
        description: 'Analog design specialist with expertise in high-speed interfaces and power management circuits.',
        expertise: ['Analog Design', 'Power Management', 'High-Speed Interfaces'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
        borderColor: 'blue-border',
        fullBio: 'Anjali is recognized as one of the leading analog design engineers in the industry, with particular expertise in power-efficient circuit design and high-speed data interfaces.',
        experience: '16+ years in analog design',
        achievements: [
            'Designed power management for 10+ products',
            'Expert in SerDes and high-speed I/O',
            'Published 20+ technical papers'
        ]
    },
    {
        id: '6',
        name: 'Rajesh Kumar',
        title: 'Senior Architect - AI/ML Hardware',
        degree: 'PhD',
        description: 'AI hardware acceleration expert with focus on neural network processors and machine learning accelerators.',
        expertise: ['AI Hardware', 'Neural Networks', 'ML Accelerators'],
        linkedinUrl: '#',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
        borderColor: 'purple-border',
        fullBio: 'Dr. Rajesh Kumar is pioneering the next generation of AI hardware, developing specialized processors for machine learning workloads and neural network acceleration.',
        experience: '18+ years in AI hardware',
        achievements: [
            'Developed 3 AI processor architectures',
            'Leading researcher in neuromorphic computing',
            'Holds 30+ patents in AI hardware'
        ]
    }
];

// DOM elements
const mainView = document.getElementById('main-view');
const detailView = document.getElementById('detail-view');
const teamGrid = document.getElementById('team-grid');
const backButton = document.getElementById('back-button');

// Detail view elements
const detailAvatar = document.getElementById('detail-avatar');
const detailName = document.getElementById('detail-name');
const detailTitle = document.getElementById('detail-title');
const detailDegree = document.getElementById('detail-degree');
const detailExpertise = document.getElementById('detail-expertise');
const detailBio = document.getElementById('detail-bio');
const detailExperience = document.getElementById('detail-experience');
const detailAchievements = document.getElementById('detail-achievements');

// State
let selectedMember = null;

// Initialize the app
function init() {
    renderTeamGrid();
    setupEventListeners();
}

// Render team member cards
function renderTeamGrid() {
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const card = createTeamCard(member);
        teamGrid.appendChild(card);
    });
}

// Create team member card
function createTeamCard(member) {
    const card = document.createElement('div');
    card.className = `card team-card ${member.borderColor}`;
    card.onclick = () => showMemberDetail(member);
    
    card.innerHTML = `
        <div class="team-card-content">
            <div class="team-member-header">
                <img src="${member.avatar}" alt="${member.name}" class="team-avatar">
                <div class="team-member-info">
                    <h4>${member.name}</h4>
                    <p class="team-member-title">${member.title}</p>
                    <p class="team-member-degree">${member.degree}</p>
                </div>
            </div>
            
            <p class="team-member-description">${member.description}</p>
            
            <div class="expertise-tags">
                ${member.expertise.map(skill => `<span class="expertise-tag">${skill}</span>`).join('')}
            </div>
            
            <button class="linkedin-button" onclick="event.stopPropagation(); window.open('${member.linkedinUrl}', '_blank')">
                <svg class="linkedin-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn Profile
            </button>
        </div>
    `;
    
    return card;
}

// Show member detail view
function showMemberDetail(member) {
    selectedMember = member;
    
    // Update detail view content
    detailAvatar.src = member.avatar;
    detailAvatar.alt = member.name;
    detailName.textContent = member.name;
    detailTitle.textContent = member.title;
    detailDegree.textContent = member.degree;
    detailBio.textContent = member.fullBio;
    detailExperience.textContent = member.experience;
    
    // Update expertise tags
    detailExpertise.innerHTML = '';
    member.expertise.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'expertise-tag';
        tag.textContent = skill;
        detailExpertise.appendChild(tag);
    });
    
    // Update achievements
    detailAchievements.innerHTML = '';
    member.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        detailAchievements.appendChild(li);
    });
    
    // Switch views
    mainView.classList.add('hidden');
    detailView.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show main view
function showMainView() {
    selectedMember = null;
    detailView.classList.add('hidden');
    mainView.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Setup event listeners
function setupEventListeners() {
    backButton.addEventListener('click', showMainView);
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.view === 'detail') {
            // Don't do anything, let the user navigate away
        } else {
            showMainView();
        }
    });
    
    // Add state to history when showing detail
    const originalShowMemberDetail = showMemberDetail;
    showMemberDetail = function(member) {
        originalShowMemberDetail(member);
        history.pushState({view: 'detail', memberId: member.id}, '', `#member-${member.id}`);
    };
}

// Handle page load with hash
function handleInitialHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#member-')) {
        const memberId = hash.replace('#member-', '');
        const member = teamMembers.find(m => m.id === memberId);
        if (member) {
            showMemberDetail(member);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    handleInitialHash();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Any resize-specific logic can go here
});