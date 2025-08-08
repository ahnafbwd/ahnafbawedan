// Project data system with localStorage sync for admin panel integration
(function() {
  // Static fallback data - will be used if no localStorage data exists
  const fallbackProjectData = {
    "projects": [
    {
      "id": 1,
      "title": "Saysco Inventory System",
      "category": "web",
      "categoryLabel": "Web Application",
      "image": "assets/image/saysco.png",
      "technologies": ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
      "description": "Comprehensive inventory management system with real-time stock tracking, automated reports, and multi-user access control.",
      "features": [
        "Real-time inventory tracking",
        "Automated stock alerts",
        "Multi-user role management",
        "Comprehensive reporting"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Saysco Company",
      "link": "#",
      "github": "#"
    },
    {
      "id": 2,
      "title": "Dapur Bunda Catering",
      "category": "mobile",
      "categoryLabel": "Mobile App",
      "image": "assets/image/dapurbunda.png",
      "technologies": ["Flutter", "Firebase", "REST API", "Dart"],
      "description": "Full-featured catering app with menu browsing, order management, and real-time tracking for local catering business.",
      "features": [
        "Menu browsing and filtering",
        "Real-time order tracking",
        "Payment integration",
        "Customer reviews and ratings"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Dapur Bunda",
      "link": "#",
      "github": "#"
    },
    {
      "id": 3,
      "title": "DiKantin Food Ordering",
      "category": "mobile",
      "categoryLabel": "Mobile App",
      "image": "assets/image/dikantin.jpg",
      "technologies": ["Flutter", "Firebase", "Dart", "Cloud Functions"],
      "description": "Mobile food ordering application for campus canteen with real-time menu updates and order tracking.",
      "features": [
        "Real-time menu display",
        "Order queue management",
        "Push notifications",
        "Payment gateway integration"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Campus Canteen",
      "link": "#",
      "github": "#"
    },
    {
      "id": 4,
      "title": "Gassin Gas Delivery",
      "category": "mobile",
      "categoryLabel": "Mobile App",
      "image": "assets/image/gassin.jpg",
      "technologies": ["Flutter", "Firebase", "Google Maps", "Dart"],
      "description": "On-demand gas delivery application with GPS tracking, real-time updates, and secure payment system.",
      "features": [
        "Real-time GPS tracking",
        "Automated delivery scheduling",
        "Secure payment processing",
        "Customer notification system"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Gas Delivery Service",
      "link": "#",
      "github": "#"
    },
    {
      "id": 5,
      "title": "Kaba Arabic Learning",
      "category": "mobile",
      "categoryLabel": "Mobile App",
      "image": "assets/image/kaba.jpg",
      "technologies": ["Flutter", "SQLite", "Audio API", "Dart"],
      "description": "Interactive Arabic learning app with pronunciation guides, quizzes, and progress tracking for students.",
      "features": [
        "Interactive lessons",
        "Audio pronunciation guides",
        "Progress tracking",
        "Quiz and assessment system"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Kaba Arabic Course",
      "link": "#",
      "github": "#"
    },
    {
      "id": 6,
      "title": "Mighty Indonesia Portfolio",
      "category": "web",
      "categoryLabel": "Web Design",
      "image": "assets/image/mighty.jpg",
      "technologies": ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      "description": "Professional company portfolio website with modern design, responsive layout, and interactive elements.",
      "features": [
        "Responsive design",
        "Interactive animations",
        "Contact form integration",
        "SEO optimization"
      ],
      "status": "Completed",
      "year": "2024",
      "client": "Mighty Indonesia",
      "link": "#",
      "github": "#"
    },
    {
      "id": 7,
      "title": "Caricuan Digital Platform",
      "category": "web",
      "categoryLabel": "Web Application",
      "image": "assets/image/caricuan.png",
      "technologies": ["React", "Node.js", "MongoDB", "Express"],
      "description": "Digital platform for creative content sharing with user management, content moderation, and social features.",
      "features": [
        "User authentication system",
        "Content management",
        "Social interaction features",
        "Admin dashboard"
      ],
      "status": "In Progress",
      "year": "2024",
      "client": "Caricuan Creative",
      "link": "#",
      "github": "#"
    },
    {
      "id": 8,
      "title": "MieCustom Ordering System",
      "category": "web",
      "categoryLabel": "Web Application",
      "image": "assets/image/miecustom.png",
      "technologies": ["PHP", "MySQL", "jQuery", "Bootstrap"],
      "description": "Custom noodle ordering system with ingredient customization, order tracking, and inventory management.",
      "features": [
        "Ingredient customization",
        "Order management",
        "Inventory tracking",
        "Customer dashboard"
      ],
      "status": "Completed",
      "year": "2023",
      "client": "MieCustom Restaurant",
      "link": "#",
      "github": "#"
    },
    {
      "id": 9,
      "title": "UI/UX Design Portfolio",
      "category": "design",
      "categoryLabel": "UI/UX Design",
      "image": "assets/image/about.jpg",
      "technologies": ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
      "description": "Collection of user interface and user experience design projects for various mobile and web applications.",
      "features": [
        "Mobile app designs",
        "Web interface mockups",
        "User journey mapping",
        "Prototype development"
      ],
      "status": "Ongoing",
      "year": "2023-2024",
      "client": "Various Clients",
      "link": "#",
      "github": "#"
    }
  ]
};

// Function to load projects with localStorage priority
function loadProjectData() {
  const PORTFOLIO_KEY = "portfolioItems";
  
  try {
    // Priority 1: Check localStorage for admin panel data
    const localStorageData = localStorage.getItem(PORTFOLIO_KEY);
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData && parsedData.projects && Array.isArray(parsedData.projects) && parsedData.projects.length > 0) {
        console.log('🔄 Loading projects from admin panel (localStorage)');
        window.projectData = parsedData;
        return parsedData;
      }
    }
  } catch (error) {
    console.log('❌ Error reading localStorage:', error.message);
  }
  
  try {
    // Priority 2: Try to fetch from JSON file
    fetch('assets/data/projects.json?' + Date.now())
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch JSON file');
      })
      .then(data => {
        console.log('📁 Loading projects from JSON file');
        window.projectData = data;
        
        // Update localStorage with JSON data for consistency
        localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(data));
        
        // Trigger project reload if projects system is already initialized
        if (window.projectsManager && typeof window.projectsManager.loadProjects === 'function') {
          window.projectsManager.loadProjects();
        }
      })
      .catch(error => {
        console.log('❌ Error loading JSON file:', error.message);
        useFallbackData();
      });
  } catch (error) {
    console.log('❌ Error fetching JSON:', error.message);
    useFallbackData();
  }
  
  // Priority 3: Use embedded fallback data
  function useFallbackData() {
    console.log('📋 Using embedded fallback data');
    window.projectData = fallbackProjectData;
  }
  
  // Set initial data (fallback or localStorage)
  const localData = getLocalStorageData();
  window.projectData = localData || fallbackProjectData;
  
  return window.projectData;
}

// Helper function to get localStorage data safely
function getLocalStorageData() {
  try {
    const data = localStorage.getItem("portfolioItems");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.projects && Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.log('Error parsing localStorage:', error.message);
  }
  return null;
}

// Add sync button for admin panel users
function addSyncButton() {
  // Only add sync button if we're on the main portfolio page and localStorage has data
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const localData = getLocalStorageData();
    if (localData && localData.projects && localData.projects.length > 0) {
      
      // Create sync notification
      const syncNotification = document.createElement('div');
      syncNotification.id = 'sync-notification';
      syncNotification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm';
      syncNotification.innerHTML = `
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-200 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <h4 class="font-medium text-sm">Projects Updated!</h4>
            <p class="text-xs text-blue-200 mt-1">Showing latest data from admin panel</p>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="text-blue-200 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      `;
      
      // Add to page after DOM is loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(syncNotification);
          // Auto-hide after 5 seconds
          setTimeout(() => {
            if (syncNotification.parentElement) {
              syncNotification.remove();
            }
          }, 5000);
        });
      } else {
        document.body.appendChild(syncNotification);
        // Auto-hide after 5 seconds
        setTimeout(() => {
          if (syncNotification.parentElement) {
            syncNotification.remove();
          }
        }, 5000);
      }
    }
  }
}

// Initialize the project data system
loadProjectData();

// Add sync notification if applicable
addSyncButton();

// Make functions available globally for debugging
window.loadProjectData = loadProjectData;
window.getLocalStorageData = getLocalStorageData;

})();
