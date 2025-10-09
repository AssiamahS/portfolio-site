// Projects Data - Edit this to add your own projects
const projects = [
    {
        title: "Liquid Portfolio",
        description: "A stunning portfolio website with liquid UI effects and smooth animations. Built with vanilla JavaScript and CSS.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Project Alpha",
        description: "An innovative web application that showcases modern design principles and cutting-edge technology.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        title: "Project Beta",
        description: "A mobile-first responsive application with seamless user experience and beautiful interactions.",
        tags: ["Vue.js", "Firebase", "TailwindCSS"],
        link: "#"
    },
    {
        title: "Project Gamma",
        description: "An open-source tool for developers featuring advanced functionality and clean architecture.",
        tags: ["TypeScript", "Express", "PostgreSQL"],
        link: "#"
    },
    {
        title: "Project Delta",
        description: "A creative experiment exploring the boundaries of web animation and interactive design.",
        tags: ["Three.js", "WebGL", "GSAP"],
        link: "#"
    },
    {
        title: "Project Epsilon",
        description: "A data visualization dashboard with real-time updates and beautiful charts.",
        tags: ["D3.js", "React", "WebSocket"],
        link: "#"
    }
];

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank">View Project</a>
        `;

        // Add ripple effect on click
        projectCard.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                createRipple(e, this);
            }
        });

        projectsContainer.appendChild(projectCard);
    });
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
    renderProjects();
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
