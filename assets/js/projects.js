// Project data loader and renderer
class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
        this.projectContainer = null;
        this.filterButtons = null;
    }

    async loadProjects() {
        try {
            console.log('🔄 Loading projects...');
            
            // Use the new loadProjectData function from projects-data.js
            if (window.loadProjectData) {
                const data = window.loadProjectData();
                if (data && data.projects) {
                    this.projects = data.projects;
                    console.log('✅ Projects loaded successfully:', this.projects.length, 'projects');
                    return this.projects;
                }
            }
            
            // Fallback: try embedded data directly
            if (window.projectData && window.projectData.projects) {
                console.log('📋 Using embedded project data');
                this.projects = window.projectData.projects;
                console.log('✅ Projects loaded from embedded data:', this.projects.length, 'projects');
                return this.projects;
            }
            
            // Last resort: fetch from JSON file
            console.log('📁 Loading projects from: assets/data/projects.json');
            const response = await fetch('assets/data/projects.json?' + Date.now());
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Projects loaded from JSON file:', data.projects.length, 'projects');
            
            this.projects = data.projects;
            
            // Update window.projectData for consistency
            window.projectData = data;
            
            return this.projects;
        } catch (error) {
            console.error('❌ Error loading projects:', error);
            
            // Show error message to user
            if (this.projectContainer) {
                this.projectContainer.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <div class="text-red-500 mb-4">
                            <i class="fas fa-exclamation-triangle text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2">Failed to Load Projects</h3>
                        <p class="text-gray-600">Please check your internet connection and try again.</p>
                        <button onclick="window.projectsManager.init()" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
                            Retry
                        </button>
                    </div>
                `;
            }
            
            return [];
        }
    }

    getCategoryColor(category) {
        const colors = {
            'mobile': 'bg-blue-100 text-blue-800',
            'web': 'bg-orange-100 text-orange-800',
            'design': 'bg-green-100 text-green-800',
            'other': 'bg-purple-100 text-purple-800'
        };
        return colors[category] || colors['other'];
    }

    getTechBadgeColor(index) {
        const colors = [
            'bg-red-100 text-red-800',
            'bg-yellow-100 text-yellow-800',
            'bg-green-100 text-green-800',
            'bg-blue-100 text-blue-800',
            'bg-indigo-100 text-indigo-800',
            'bg-purple-100 text-purple-800',
            'bg-pink-100 text-pink-800',
            'bg-teal-100 text-teal-800'
        ];
        return colors[index % colors.length];
    }

    renderProjectCard(project) {
        const categoryColor = this.getCategoryColor(project.category);
        const techBadges = project.technologies.map((tech, index) => 
            `<span class="inline-block ${this.getTechBadgeColor(index)} px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1">${tech}</span>`
        ).join('');

        return `
            <div class="project-item card p-4" data-category="${project.category}">
                <div class="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition duration-500 hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div>
                            <h4 class="text-white font-bold text-sm">${project.title}</h4>
                            <p class="text-gray-200 text-xs">${project.year} • ${project.client}</p>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <h3 class="font-bold text-lg mb-2">${project.title}</h3>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm ${categoryColor} px-2 py-1 rounded-full">${project.categoryLabel}</span>
                        <div class="flex space-x-2">
                            ${(project.link && project.link !== '#' && project.link !== '') ? `<a href="${project.link}" target="_blank" class="text-blue-500 hover:text-blue-600 text-sm" title="Visit Website"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            ${(project.github && project.github !== '#' && project.github !== '') ? `<a href="${project.github}" target="_blank" class="text-gray-700 hover:text-gray-900 text-sm" title="View Code"><i class="fab fa-github"></i></a>` : ''}
                            ${(!project.github || project.github === '#' || project.github === '') ? `<span class="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded" title="Private Repository"><i class="fas fa-lock mr-1"></i>Private</span>` : ''}
                        </div>
                    </div>
                    <div class="mb-2">
                        ${techBadges}
                    </div>
                </div>
                <p class="text-gray-600 mb-4 text-sm">
                    ${project.description}
                </p>
                <div class="flex justify-end">
                    <button onclick="projectManager.showProjectDetails(${project.id})" class="px-4 py-1 rounded-full gradient-bg text-white text-sm font-semibold hover:shadow-lg transition">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    renderProjects(filter = 'all') {
        console.log('Rendering projects with filter:', filter);
        
        if (!this.projectContainer) {
            this.projectContainer = document.querySelector('.project-container');
        }

        if (!this.projectContainer) {
            console.error('Project container not found during render!');
            return;
        }

        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.category === filter);

        console.log('Filtered projects count:', filteredProjects.length);

        if (filteredProjects.length === 0) {
            this.projectContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-gray-400 mb-4">
                        <i class="fas fa-folder-open text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">No Projects Found</h3>
                    <p class="text-gray-600">No projects match the selected filter.</p>
                </div>
            `;
            return;
        }

        this.projectContainer.innerHTML = filteredProjects.map(project => 
            this.renderProjectCard(project)
        ).join('');

        console.log('Projects rendered successfully');

        // Update project items reference for filtering
        this.updateProjectItems();
    }

    updateProjectItems() {
        const projectItems = document.querySelectorAll('.project-item');
        
        // Add hover effects and animations
        projectItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupFilterButtons() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                this.filterButtons.forEach(btn => {
                    btn.classList.remove('gradient-bg', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-dark');
                });
                
                button.classList.remove('bg-gray-200', 'text-dark');
                button.classList.add('gradient-bg', 'text-white');
                
                // Filter projects
                const filterValue = button.getAttribute('data-filter');
                this.currentFilter = filterValue;
                this.renderProjects(filterValue);
            });
        });
    }

    showProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Create full-screen modal for project details
        const modalHtml = `
            <div id="project-modal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10000] p-4">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
                    <!-- Modal Header -->
                    <div class="relative bg-gradient-to-r from-primary to-secondary text-white">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover opacity-30">
                        <div class="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center">
                            <div class="container mx-auto px-6 flex justify-between items-center">
                                <div>
                                    <h2 class="text-xl md:text-3xl font-bold mb-2">${project.title}</h2>
                                    <div class="flex flex-wrap items-center gap-2 text-sm">
                                        <span class="bg-white/20 px-2 py-1 rounded-full text-xs">${project.year}</span>
                                        <span class="bg-white/20 px-2 py-1 rounded-full text-xs">${project.client}</span>
                                        <span class="bg-white/20 px-2 py-1 rounded-full text-xs">${project.categoryLabel}</span>
                                        <span class="bg-green-500/80 px-2 py-1 rounded-full text-xs">${project.status}</span>
                                    </div>
                                </div>
                                <button onclick="projectManager.closeProjectModal()" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition group">
                                    <i class="fas fa-times text-white text-lg group-hover:scale-110 transition-transform"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal Body -->
                    <div class="flex-1 overflow-y-auto">
                        <div class="p-6">
                            <!-- Action Buttons -->
                            <div class="flex flex-wrap gap-3 mb-6">
                                ${(project.link && project.link !== '#' && project.link !== '') ? `<a href="${project.link}" target="_blank" class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg text-sm"><i class="fas fa-external-link-alt mr-2"></i>Live Demo</a>` : ''}
                                ${(project.github && project.github !== '#' && project.github !== '') ? `<a href="${project.github}" target="_blank" class="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition shadow-md hover:shadow-lg text-sm"><i class="fab fa-github mr-2"></i>View Code</a>` : `<span class="flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-lg text-sm cursor-not-allowed"><i class="fas fa-lock mr-2"></i>Private Repository</span>`}
                                <button onclick="projectsManager.shareProject(${project.id})" class="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md hover:shadow-lg text-sm">
                                    <i class="fas fa-share-alt mr-2"></i>Share Project
                                </button>
                            </div>
                            
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <!-- Main Content -->
                                <div class="lg:col-span-2 space-y-6">
                                    <!-- Project Overview -->
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <h3 class="text-lg font-bold mb-3 flex items-center">
                                            <i class="fas fa-info-circle text-primary mr-2"></i>
                                            Project Overview
                                        </h3>
                                        <p class="text-gray-700 leading-relaxed">${project.description}</p>
                                    </div>
                                    
                                    <!-- Key Features -->
                                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                                        <h3 class="text-lg font-bold mb-4 flex items-center">
                                            <i class="fas fa-star text-yellow-500 mr-2"></i>
                                            Key Features
                                        </h3>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            ${project.features.map((feature, index) => `
                                                <div class="flex items-start p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-2 border-green-500 hover:shadow-sm transition-shadow">
                                                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">
                                                        ${index + 1}
                                                    </div>
                                                    <span class="text-gray-700 text-sm">${feature}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <!-- Screenshots/Gallery -->
                                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                                        <h3 class="text-lg font-bold mb-4 flex items-center">
                                            <i class="fas fa-images text-purple-500 mr-2"></i>
                                            Project Gallery
                                        </h3>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow group">
                                                <div class="text-center">
                                                    <i class="fas fa-image text-gray-400 text-2xl mb-1 group-hover:text-gray-600 transition-colors"></i>
                                                    <p class="text-gray-500 group-hover:text-gray-700 transition-colors text-xs">Main Interface</p>
                                                </div>
                                            </div>
                                            <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow group">
                                                <div class="text-center">
                                                    <i class="fas fa-image text-gray-400 text-2xl mb-1 group-hover:text-gray-600 transition-colors"></i>
                                                    <p class="text-gray-500 group-hover:text-gray-700 transition-colors text-xs">Feature Demo</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Sidebar -->
                                <div class="space-y-4">
                                    <!-- Project Info -->
                                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 class="text-lg font-bold mb-4 flex items-center">
                                            <i class="fas fa-clipboard-list text-blue-500 mr-2"></i>
                                            Details
                                        </h4>
                                        <div class="space-y-3">
                                            <div class="flex justify-between items-center py-1 border-b border-gray-100">
                                                <span class="text-gray-600 text-sm">Status</span>
                                                <span class="px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">${project.status}</span>
                                            </div>
                                            <div class="flex justify-between items-center py-1 border-b border-gray-100">
                                                <span class="text-gray-600 text-sm">Year</span>
                                                <span class="font-semibold text-sm">${project.year}</span>
                                            </div>
                                            <div class="flex justify-between items-center py-1 border-b border-gray-100">
                                                <span class="text-gray-600 text-sm">Client</span>
                                                <span class="font-semibold text-sm">${project.client}</span>
                                            </div>
                                            <div class="flex justify-between items-center py-1">
                                                <span class="text-gray-600 text-sm">Category</span>
                                                <span class="font-semibold text-sm">${project.categoryLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Technologies Used -->
                                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 class="text-lg font-bold mb-4 flex items-center">
                                            <i class="fas fa-code text-purple-500 mr-2"></i>
                                            Technologies
                                        </h4>
                                        <div class="flex flex-wrap gap-2">
                                            ${project.technologies.map((tech, index) => `
                                                <span class="inline-block ${this.getTechBadgeColor(index)} px-2 py-1 rounded-md text-xs font-medium hover:scale-105 transition-transform cursor-default">${tech}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <!-- Contact CTA -->
                                    <div class="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-4">
                                        <h4 class="text-lg font-bold mb-2">Interested in Similar Project?</h4>
                                        <p class="text-white/90 mb-3 text-sm">Let's discuss your project requirements and create something amazing together.</p>
                                        <a href="#contact" onclick="projectManager.closeProjectModal()" class="block w-full text-center bg-white text-primary font-bold py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                                            Get In Touch
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modal = document.getElementById('project-modal');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
        
        // Add event listeners for closing
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });
        
        // Add escape key listener
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeProjectModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    shareProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Create share URL (could be enhanced with actual URL structure)
        const shareText = `Check out this amazing project: ${project.title} by Ahnaf Bawedan`;
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: project.title,
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareText} - ${shareUrl}`).then(() => {
                alert('Project link copied to clipboard!');
            });
        }
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            // Add closing animation
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    async init() {
        console.log('Initializing project manager...');
        
        // Get project container
        this.projectContainer = document.querySelector('.project-container');
        if (!this.projectContainer) {
            console.error('Project container not found!');
            return;
        }
        
        // Load projects
        const projects = await this.loadProjects();
        
        if (projects.length > 0) {
            this.renderProjects();
            this.setupFilterButtons();
            console.log('Project manager initialized successfully');
        } else {
            console.warn('No projects loaded');
        }
    }

    // Add refresh function to reload data and re-render
    async refreshProjects() {
        console.log('🔄 Refreshing projects...');
        
        // Clear current data
        this.projects = [];
        
        // Force reload from localStorage/JSON
        if (window.loadProjectData) {
            window.loadProjectData();
        }
        
        // Reload and re-render
        await this.loadProjects();
        this.renderProjects(this.currentFilter);
        
        console.log('✅ Projects refreshed successfully');
    }
}

// Initialize project manager
const projectsManager = new ProjectManager();
window.projectsManager = projectsManager; // Make it globally accessible
