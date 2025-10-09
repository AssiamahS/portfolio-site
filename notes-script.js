// Notes Storage
let notes = JSON.parse(localStorage.getItem('liquidNotes')) || [];
let currentNoteId = null;
let previewVisible = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    setupEditor();
    animateCursor();
    setupEventListeners();

    // Create welcome note if no notes exist
    if (notes.length === 0) {
        createWelcomeNote();
    } else {
        loadNote(notes[0].id);
    }
});

// Create Welcome Note
function createWelcomeNote() {
    const welcomeNote = {
        id: generateId(),
        title: 'Welcome to Liquid Vault',
        content: `# Welcome to Liquid Vault 🌊

This is your personal knowledge base with a beautiful liquid UI.

## Features

- **Markdown Support**: Write in markdown and see live preview
- **Daily Notes**: Quick access to daily journal entries
- **Semantic Search**: Find notes by meaning, not just keywords
- **Graph View**: Visualize connections between notes
- **Local Storage**: All your notes stay private on your device

## Getting Started

1. Click **+ New Note** to create a note
2. Use **📅 Daily Note** for journal entries
3. Search notes with the search bar
4. View **🕸️ Graph View** to see connections

## Markdown Examples

### Text Formatting
**Bold text** and *italic text*

### Lists
- Bullet point 1
- Bullet point 2
  - Nested item

### Todo Lists
- [ ] Task to do
- [x] Completed task

### Links
[[Link to another note]]

---

Start writing your thoughts! 💭`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    notes.push(welcomeNote);
    saveNotes();
    loadNotes();
    loadNote(welcomeNote.id);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('liquidNotes', JSON.stringify(notes));
}

// Load notes list
function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        if (note.id === currentNoteId) {
            noteItem.classList.add('active');
        }

        const preview = note.content.slice(0, 100).replace(/[#*\[\]]/g, '');
        const date = new Date(note.updatedAt).toLocaleDateString();

        noteItem.innerHTML = `
            <div class="note-item-title">${note.title || 'Untitled'}</div>
            <div class="note-item-preview">${preview}...</div>
            <div class="note-item-date">${date}</div>
        `;

        noteItem.onclick = () => loadNote(note.id);
        notesList.appendChild(noteItem);
    });
}

// Load a specific note
function loadNote(noteId) {
    currentNoteId = noteId;
    const note = notes.find(n => n.id === noteId);

    if (!note) return;

    document.getElementById('note-title').value = note.title;
    document.getElementById('markdown-editor').value = note.content;

    updatePreview();
    loadNotes(); // Refresh list to update active state
}

// Create new note
function createNewNote() {
    const newNote = {
        id: generateId(),
        title: 'Untitled Note',
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    notes.unshift(newNote);
    saveNotes();
    loadNotes();
    loadNote(newNote.id);
}

// Create daily note
function createDailyNote() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const title = `Daily Note - ${dateStr}`;

    // Check if daily note already exists
    const existingNote = notes.find(n => n.title === title);
    if (existingNote) {
        loadNote(existingNote.id);
        return;
    }

    const dailyNote = {
        id: generateId(),
        title: title,
        content: `# ${title}

## 🎯 Intention for Today


## 📅 Events & Schedule


## 📝 Notes


## 🌟 Wins & Accomplishments


## 💭 Reflections

`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    notes.unshift(dailyNote);
    saveNotes();
    loadNotes();
    loadNote(dailyNote.id);
}

// Setup editor auto-save
function setupEditor() {
    const titleInput = document.getElementById('note-title');
    const editorTextarea = document.getElementById('markdown-editor');

    titleInput.addEventListener('input', () => {
        saveCurrentNote();
    });

    editorTextarea.addEventListener('input', () => {
        saveCurrentNote();
        updatePreview();
    });
}

// Save current note
function saveCurrentNote() {
    if (!currentNoteId) return;

    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.title = document.getElementById('note-title').value || 'Untitled';
    note.content = document.getElementById('markdown-editor').value;
    note.updatedAt = new Date().toISOString();

    saveNotes();
    loadNotes();
}

// Update preview
function updatePreview() {
    const markdown = document.getElementById('markdown-editor').value;
    const preview = document.getElementById('markdown-preview');

    // Process wiki links [[note name]]
    let processedMarkdown = markdown.replace(/\[\[(.*?)\]\]/g, '<a href="#" class="wiki-link">$1</a>');

    // Render markdown
    preview.innerHTML = marked.parse(processedMarkdown);
}

// Toggle preview
function togglePreview() {
    const previewPane = document.getElementById('preview-pane');
    previewVisible = !previewVisible;

    if (previewVisible) {
        previewPane.classList.add('visible');
        updatePreview();
    } else {
        previewPane.classList.remove('visible');
    }
}

// Delete current note
function deleteCurrentNote() {
    if (!currentNoteId) return;

    if (!confirm('Are you sure you want to delete this note?')) return;

    notes = notes.filter(n => n.id !== currentNoteId);
    saveNotes();

    currentNoteId = null;
    loadNotes();

    if (notes.length > 0) {
        loadNote(notes[0].id);
    } else {
        document.getElementById('note-title').value = '';
        document.getElementById('markdown-editor').value = '';
        createWelcomeNote();
    }
}

// Search notes
function searchNotes(query) {
    if (!query) {
        loadNotes();
        return;
    }

    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const searchResults = notes.filter(note => {
        const titleMatch = note.title.toLowerCase().includes(query.toLowerCase());
        const contentMatch = note.content.toLowerCase().includes(query.toLowerCase());
        return titleMatch || contentMatch;
    });

    searchResults.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        if (note.id === currentNoteId) {
            noteItem.classList.add('active');
        }

        const preview = note.content.slice(0, 100).replace(/[#*\[\]]/g, '');
        const date = new Date(note.updatedAt).toLocaleDateString();

        noteItem.innerHTML = `
            <div class="note-item-title">${highlightText(note.title, query)}</div>
            <div class="note-item-preview">${highlightText(preview, query)}...</div>
            <div class="note-item-date">${date}</div>
        `;

        noteItem.onclick = () => loadNote(note.id);
        notesList.appendChild(noteItem);
    });

    if (searchResults.length === 0) {
        notesList.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 1rem; text-align: center;">No notes found</div>';
    }
}

// Highlight search text
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(76, 172, 254, 0.4); color: #fff;">$1</mark>');
}

// Show graph view
function showGraph() {
    const modal = document.getElementById('graph-modal');
    modal.classList.add('visible');

    renderGraph();
}

// Close graph
function closeGraph() {
    const modal = document.getElementById('graph-modal');
    modal.classList.remove('visible');
}

// Render graph
function renderGraph() {
    const container = document.getElementById('graph-container');
    container.innerHTML = '';

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    // Create nodes and connections
    const width = container.clientWidth;
    const height = container.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    notes.forEach((note, index) => {
        const angle = (index / notes.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Create node
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', 'rgba(76, 172, 254, 0.6)');
        circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
        circle.setAttribute('stroke-width', '2');
        circle.style.cursor = 'pointer';

        circle.addEventListener('click', () => {
            closeGraph();
            loadNote(note.id);
        });

        // Add hover effect
        circle.addEventListener('mouseenter', () => {
            circle.setAttribute('r', '25');
            circle.setAttribute('fill', 'rgba(76, 172, 254, 0.9)');
        });

        circle.addEventListener('mouseleave', () => {
            circle.setAttribute('r', '20');
            circle.setAttribute('fill', 'rgba(76, 172, 254, 0.6)');
        });

        svg.appendChild(circle);

        // Add label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 35);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '12');
        text.textContent = note.title.slice(0, 20) + (note.title.length > 20 ? '...' : '');

        svg.appendChild(text);

        // Draw connections based on wiki links
        const wikiLinks = note.content.match(/\[\[(.*?)\]\]/g) || [];
        wikiLinks.forEach(link => {
            const linkedTitle = link.slice(2, -2);
            const linkedNote = notes.find(n => n.title === linkedTitle);

            if (linkedNote) {
                const linkedIndex = notes.indexOf(linkedNote);
                const linkedAngle = (linkedIndex / notes.length) * 2 * Math.PI;
                const linkedX = centerX + radius * Math.cos(linkedAngle);
                const linkedY = centerY + radius * Math.sin(linkedAngle);

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', y);
                line.setAttribute('x2', linkedX);
                line.setAttribute('y2', linkedY);
                line.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
                line.setAttribute('stroke-width', '1');

                svg.insertBefore(line, svg.firstChild); // Insert lines before nodes
            }
        });
    });

    container.appendChild(svg);
}

// Setup event listeners
function setupEventListeners() {
    // Cursor expand on interactive elements
    document.querySelectorAll('button, input, textarea, .note-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGraph();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + N: New note
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            createNewNote();
        }

        // Ctrl/Cmd + D: Daily note
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            createDailyNote();
        }

        // Ctrl/Cmd + P: Toggle preview
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            togglePreview();
        }
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

// Export notes (bonus feature)
function exportNotes() {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `liquid-vault-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Import notes (bonus feature)
function importNotes(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedNotes = JSON.parse(e.target.result);
            notes = [...notes, ...importedNotes];
            saveNotes();
            loadNotes();
            alert('Notes imported successfully!');
        } catch (error) {
            alert('Error importing notes. Please check the file format.');
        }
    };
    reader.readAsText(file);
}
