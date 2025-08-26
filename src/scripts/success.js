// Easy to add new success stories - just add objects to this array
const successStories = [
    {
        name: "Ms. Kavya Vijayakumar C",
        company: "Government College of Technology, Coimbatore",
        role: "Atena",
        initials: "KV",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/gct-logo.png" // Add company logo here
    },
    {
        name: "Mohamed Sharith",
        company: "Muthayir",
        role: "Jr. Design Engineer",
        initials: "MS",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/muthayir-logo.png" // Add company logo here
    },
    {
        name: "Kavya Vijayakumar C",
        company: "Atena",
        role: "Verification Engineer",
        initials: "KV",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/atena-logo.png" // Add company logo here
    },
    {
        name: "Miruthala E",
        company: "HCL Technologies",
        role: "Systems Engineer",
        initials: "ME",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-logo.png" // Add company logo here
    },
    {
        name: "Macklin Eriya C",
        company: "HCL Technologies",
        role: "Software Engineer",
        initials: "MC",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-logo.png" // Add company logo here
    },
    {
        name: "Kiran K",
        company: "HCL Technologies",
        role: "Technical Specialist",
        initials: "KK",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-logo.png" // Add company logo here
    },
    {
        name: "Karthikeyan K",
        company: "HCL Technologies",
        role: "Project Engineer",
        initials: "KA",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-logo.png" // Add company logo here
    },
    {
        name: "Surendhar G",
        company: "HCL Technologies",
        role: "Senior Analyst",
        initials: "SG",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-logo.png" // Add company logo here
    },
    {
        name: "Vignesh D",
        company: "HCL Robotics",
        role: "Robotics Engineer",
        initials: "VD",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/hcl-robotics-logo.png" // Add company logo here
    },
    // Add more success stories here - just copy the format above
    {
        name: "Priya Sharma",
        company: "Tech Solutions Inc",
        role: "Full Stack Developer",
        initials: "PS",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/tech-solutions-logo.png" // Add company logo here
    },
    {
        name: "Rahul Patel",
        company: "Innovation Labs",
        role: "Data Scientist",
        initials: "RP",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/innovation-labs-logo.png" // Add company logo here
    },
    {
        name: "Sneha Reddy",
        company: "Digital Dynamics",
        role: "UI/UX Designer",
        initials: "SR",
        // avatar: "path/to/profile.jpg", // Add profile image here
        // companyLogo: "path/to/digital-dynamics-logo.png" // Add company logo here
    }
];

/**
 * Creates an employee card element
 * @param {Object} person - Employee data object
 * @returns {HTMLElement} - Complete employee card element
 */
function createEmployeeCard(person) {
    // Create main card container
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.setAttribute('data-employee', person.name);

    // Create profile section
    const profileSection = document.createElement('div');
    profileSection.className = 'profile-section';

    // Handle profile image or placeholder
    if (person.avatar) {
        const profileImg = document.createElement('img');
        profileImg.src = person.avatar;
        profileImg.alt = person.name;
        profileImg.className = 'profile-image';
        
        // Handle image load errors
        profileImg.onerror = function() {
            console.warn(`Failed to load profile image for ${person.name}: ${person.avatar}`);
            const placeholder = createProfilePlaceholder(person.initials);
            this.parentNode.replaceChild(placeholder, this);
        };
        
        profileSection.appendChild(profileImg);
    } else {
        const placeholder = createProfilePlaceholder(person.initials);
        profileSection.appendChild(placeholder);
    }

    // Create employee information elements
    const name = document.createElement('h3');
    name.className = 'employee-name';
    name.textContent = person.name;

    const company = document.createElement('p');
    company.className = 'employee-company';
    company.textContent = person.company;

    const role = document.createElement('p');
    role.className = 'employee-role';
    role.textContent = person.role;

    // Create company logo section
    const logoSection = document.createElement('div');
    logoSection.className = 'logo-section';

    // Handle company logo or placeholder
    if (person.companyLogo) {
        const logoImg = document.createElement('img');
        logoImg.src = person.companyLogo;
        logoImg.alt = `${person.company} logo`;
        logoImg.className = 'company-logo';
        
        // Handle logo load errors
        logoImg.onerror = function() {
            console.warn(`Failed to load company logo for ${person.company}: ${person.companyLogo}`);
            const placeholder = createLogoPlaceholder();
            this.parentNode.replaceChild(placeholder, this);
        };
        
        logoSection.appendChild(logoImg);
    } else {
        const placeholder = createLogoPlaceholder();
        logoSection.appendChild(placeholder);
    }

    // Assemble the complete card
    card.appendChild(profileSection);
    card.appendChild(name);
    card.appendChild(company);
    card.appendChild(role);
    card.appendChild(logoSection);

    return card;
}

/**
 * Creates a profile placeholder element
 * @param {string} initials - Employee initials
 * @returns {HTMLElement} - Profile placeholder element
 */
function createProfilePlaceholder(initials) {
    const placeholder = document.createElement('div');
    placeholder.className = 'profile-placeholder';
    placeholder.textContent = initials;
    placeholder.setAttribute('title', 'Profile photo not available');
    return placeholder;
}

/**
 * Creates a logo placeholder element
 * @returns {HTMLElement} - Logo placeholder element
 */
function createLogoPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'logo-placeholder';
    placeholder.textContent = 'Logo';
    placeholder.setAttribute('title', 'Company logo not available');
    return placeholder;
}

/**
 * Renders all employee cards to the grid
 * @param {Array} employees - Array of employee objects
 */
function renderEmployees(employees = successStories) {
    const grid = document.getElementById('employeeGrid');
    
    if (!grid) {
        console.error('Employee grid container not found');
        return;
    }

    // Clear existing content
    grid.innerHTML = '';

    // Handle empty state
    if (!employees || employees.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'error';
        emptyState.textContent = 'No employees to display';
        grid.appendChild(emptyState);
        return;
    }

    // Create and append employee cards
    employees.forEach((person, index) => {
        try {
            const card = createEmployeeCard(person);
            card.setAttribute('data-index', index);
            grid.appendChild(card);
        } catch (error) {
            console.error(`Error creating card for employee ${person.name}:`, error);
        }
    });

    console.log(`Rendered ${employees.length} employee cards`);
}

/**
 * Adds a new employee to the grid
 * @param {Object} employee - Employee object to add
 */
function addEmployee(employee) {
    // Validate required fields
    if (!employee.name || !employee.company || !employee.role || !employee.initials) {
        console.error('Employee must have name, company, role, and initials');
        return false;
    }

    successStories.push(employee);
    renderEmployees();
    console.log(`Added new employee: ${employee.name}`);
    return true;
}

/**
 * Removes an employee by index
 * @param {number} index - Index of employee to remove
 */
function removeEmployee(index) {
    if (index >= 0 && index < successStories.length) {
        const removed = successStories.splice(index, 1)[0];
        renderEmployees();
        console.log(`Removed employee: ${removed.name}`);
        return true;
    }
    console.error('Invalid employee index');
    return false;
}

/**
 * Filters employees by search term
 * @param {string} searchTerm - Term to search for
 */
function searchEmployees(searchTerm) {
    if (!searchTerm) {
        renderEmployees();
        return;
    }

    const filtered = successStories.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderEmployees(filtered);
    console.log(`Found ${filtered.length} employees matching "${searchTerm}"`);
}

/**
 * Initialize the application
 */
function init() {
    try {
        renderEmployees();
        console.log('Employee grid initialized successfully');
    } catch (error) {
        console.error('Failed to initialize employee grid:', error);
        
        // Show error state
        const grid = document.getElementById('employeeGrid');
        if (grid) {
            grid.innerHTML = '<div class="error">Failed to load employees</div>';
        }
    }
}

// Wait for DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for external use (if needed)
window.EmployeeGrid = {
    addEmployee,
    removeEmployee,
    searchEmployees,
    renderEmployees,
    data: successStories
};

// Example usage (uncomment to test):
/*
// Add a new employee
addEmployee({
    name: "New Employee",
    company: "New Company",
    role: "New Role",
    initials: "NE",
    avatar: "path/to/image.jpg",
    companyLogo: "path/to/logo.png"
});

// Search employees
searchEmployees("HCL");

// Remove an employee by index
removeEmployee(0);
*/