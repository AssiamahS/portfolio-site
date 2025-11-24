// Projects Data - Edit this to add your own projects
const projects = [
    {
        title: "Kasa Glow Clean",
        shortDescription: "Professional cleaning services",
        description: "Premium residential and commercial cleaning services with eco-friendly solutions.",
        tags: ["Cleaning", "Service", "Business"],
        link: "https://kasaglowclean.com"
    },
    {
        title: "Epic Training Portal",
        shortDescription: "Healthcare IT training",
        description: "Comprehensive training system for hospital staff on Epic EMR workflows, featuring interactive modules and assessments.",
        tags: ["Healthcare", "Epic", "Training"],
        link: "https://example.com/epic"
    },
    {
        title: "Slytek Consulting",
        shortDescription: "IT consulting services",
        description: "Expert IT consulting for healthcare organizations, specializing in Epic optimization and infrastructure.",
        tags: ["IT", "Consulting", "Healthcare"],
        link: "https://slytek.com"
    },
    {
        title: "DJ Services",
        shortDescription: "Professional DJ & entertainment",
        description: "High-energy DJ services for events, weddings, and parties with extensive music library.",
        tags: ["Music", "Events", "Entertainment"],
        link: "https://example.com/dj"
    },
    {
        title: "Automation Scripts",
        shortDescription: "IT automation tools",
        description: "PowerShell and Python automation scripts for healthcare IT operations and workflows.",
        tags: ["PowerShell", "Python", "Automation"],
        link: "https://github.com/yourusername"
    },
    {
        title: "Portfolio Projects",
        shortDescription: "Web development showcase",
        description: "Collection of web development projects featuring modern design and interactive experiences.",
        tags: ["Web", "Design", "Development"],
        link: "https://example.com/portfolio"
    }
];

// Modal functionality
const modal = document.getElementById('projectModal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');
const modalIframe = document.getElementById('modalIframe');

function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    modalLink.href = project.link;
    
    // Load the website in iframe
    modalIframe.src = project.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Clear iframe to stop loading
    setTimeout(() => {
        modalIframe.src = 'about:blank';
    }, 300);
}

// Close modal events
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <div class="project-card-inner">
                <h2>${project.title}</h2>
                <p class="short-description">${project.shortDescription}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        // Open modal on click
        projectCard.addEventListener('click', function() {
            openModal(project);
        });

        projectsContainer.appendChild(projectCard);
    });
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
function updateCursorListeners() {
    document.querySelectorAll('a, .project-card, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });
}

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
    renderProjects();
    animateCursor();

    // Observe cards after they're rendered
    setTimeout(() => {
        observeCards();
        updateCursorListeners();
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
