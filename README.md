# Liquid Portfolio - GitHub Pages

A stunning portfolio website with liquid UI effects, smooth animations, and interactive elements.

## Features

- **Liquid UI Design**: Animated waves and floating blobs create a fluid, dynamic background
- **Glitch Text Effect**: Eye-catching title animation
- **Custom Liquid Cursor**: Interactive cursor that follows mouse movement
- **Ripple Effects**: Click animations on project cards
- **Parallax Scrolling**: Background elements move with mouse and scroll
- **Responsive Design**: Works beautifully on all devices
- **Glass Morphism**: Modern frosted glass effect on cards

## How to Customize

### Adding Your Projects

Edit the `script.js` file and modify the `projects` array (starting at line 2):

```javascript
const projects = [
    {
        title: "Your Project Name",
        description: "Description of your project",
        tags: ["Tag1", "Tag2", "Tag3"],
        link: "https://github.com/yourusername/project"
    },
    // Add more projects...
];
```

### Changing Colors

Edit `styles.css` to customize the color scheme:
- Lines 12-13: Main background gradient
- Lines 21-33: Gradient definitions for liquid effects
- Lines 69-87: Blob gradients

### Personalizing the Header

Edit `index.html` line 32-33 to change the title and subtitle:
```html
<h1 class="glitch" data-text="Your Name">Your Name</h1>
<p class="subtitle">Your tagline here</p>
```

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `portfolio`)
2. Upload all files from the `portfolio-site` folder
3. Go to Settings > Pages
4. Select main branch and root folder
5. Save and wait for deployment
6. Visit `https://yourusername.github.io/portfolio`

### Option 2: Using Git CLI

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial commit: Liquid portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Option 3: Use as Username Site

To make it available at `yourusername.github.io`:
1. Create a repository named `yourusername.github.io`
2. Push these files to that repository
3. It will automatically be published

## Technologies Used

- HTML5
- CSS3 (with advanced animations)
- Vanilla JavaScript
- SVG for liquid effects

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## License

Free to use and modify for your personal portfolio!
