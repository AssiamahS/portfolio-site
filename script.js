// GitHub Configuration - Edit this to add your GitHub username
const GITHUB_USERNAME = "AssiamahS"; // Change to your GitHub username

// Projects Data - Can be manually added or fetched from GitHub
let projects = [
    {
        title: "Liquid Portfolio",
        description: "A stunning portfolio website with liquid UI effects and smooth animations. Built with vanilla JavaScript and CSS.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/AssiamahS/portfolio-site",
        todos: [
            "Add more projects",
            "Customize color scheme",
            "Add contact form"
        ]
    }
];

// Fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch repos');

        const repos = await response.json();

        // Transform GitHub repos into project format
        const githubProjects = repos
            .filter(repo => !repo.fork && !repo.private) // Only show your own public repos
            .map(repo => ({
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: repo.description || "A GitHub project - click to view details",
                tags: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language || "Code"],
                link: repo.html_url,
                homepage: repo.homepage,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                todos: [] // Can be customized per project
            }));

        // Merge manual projects with GitHub projects
        projects = [...projects, ...githubProjects];

        // Re-render projects
        renderProjects();

        // Re-observe cards after new render
        setTimeout(observeCards, 100);

        // Re-add event listeners
        setTimeout(() => {
            document.querySelectorAll('.project-card, .project-link').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('expand');
                });

                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('expand');
                });
            });
        }, 100);

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // If fetch fails, just render manual projects
        renderProjects();
    }
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Clear existing projects

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        // Build stats section if available
        let statsHTML = '';
        if (project.stars !== undefined || project.forks !== undefined) {
            statsHTML = `
                <div class="project-stats">
                    ${project.stars !== undefined ? `<span class="stat">⭐ ${project.stars}</span>` : ''}
                    ${project.forks !== undefined ? `<span class="stat">🔱 ${project.forks}</span>` : ''}
                </div>
            `;
        }

        // Build todo list if available
        let todosHTML = '';
        if (project.todos && project.todos.length > 0) {
            todosHTML = `
                <div class="todo-section">
                    <button class="todo-toggle" onclick="toggleTodo(this)">
                        <span class="toggle-icon">▶</span> Project Tasks
                    </button>
                    <ul class="todo-list collapsed">
                        ${project.todos.map(todo => `<li class="todo-item">${todo}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        projectCard.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${statsHTML}
            ${todosHTML}
            <div class="project-links">
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                ${project.homepage ? `<a href="${project.homepage}" class="project-link project-link-secondary" target="_blank">Live Demo</a>` : ''}
            </div>
        `;

        // Add ripple effect on click
        projectCard.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && !e.target.classList.contains('toggle-icon')) {
                createRipple(e, this);
            }
        });

        projectsContainer.appendChild(projectCard);
    });
}

// Toggle Todo List
function toggleTodo(button) {
    const todoList = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');

    if (todoList.classList.contains('collapsed')) {
        todoList.classList.remove('collapsed');
        todoList.classList.add('expanded');
        icon.textContent = '▼';
    } else {
        todoList.classList.add('collapsed');
        todoList.classList.remove('expanded');
        icon.textContent = '▶';
    }
}

// Ripple Effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Liquid Cursor
const cursor = document.querySelector('.cursor-liquid');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

// Expand cursor on hover
document.querySelectorAll('a, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
    });
});

// Parallax Effect on Blobs
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.liquid-blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;

        blob.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Smooth Scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animation to cards
function observeCards() {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub projects first, or render manual projects if fetch fails
    fetchGitHubProjects();
    animateCursor();

    // Observe cards after they're rendered
    setTimeout(observeCards, 100);

    // Re-add event listeners to dynamically created elements
    setTimeout(() => {
        document.querySelectorAll('.project-card, .project-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expand');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expand');
            });
        });
    }, 100);
});

// Add some extra liquid effects on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const waves = document.querySelectorAll('[class^="wave"]');

    waves.forEach((wave, index) => {
        const speed = (index + 1) * 0.1;
        wave.style.transform = `translateY(${currentScroll * speed}px)`;
    });

    lastScroll = currentScroll;
});
