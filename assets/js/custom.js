// Custom JavaScript for Blog Theme
(function() {
  'use strict';

  // ==========================================
  // Theme Switcher
  // ==========================================
  function initThemeSwitcher() {
    const themeToggleButton = document.querySelector('.theme-toggle');
    
    if (themeToggleButton) {
      themeToggleButton.addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button emoji
        this.textContent = newTheme === 'dark' ? '🌓' : '☀️';
      });
      
      // Set initial emoji based on theme
      const currentTheme = document.documentElement.getAttribute('data-theme');
      themeToggleButton.textContent = currentTheme === 'dark' ? '🌓' : '☀️';
    }
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================
  // Reading Progress Bar
  // ==========================================
  function initReadingProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);

    const progressFill = progressBar.querySelector('.reading-progress-fill');

    // Update progress on scroll
    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const articleRect = article.getBoundingClientRect();
      const articleTop = scrollTop + articleRect.top;
      const articleHeight = article.offsetHeight;

      // Calculate progress within the article
      const progress = Math.max(0, Math.min(100, 
        ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
      ));

      progressFill.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // ==========================================
  // Copy Code Blocks
  // ==========================================
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.textContent = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      wrapper.appendChild(copyButton);

      copyButton.addEventListener('click', async () => {
        const code = block.querySelector('code') || block;
        const text = code.textContent;

        try {
          await navigator.clipboard.writeText(text);
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('copied');

          setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          copyButton.textContent = 'Failed';
        }
      });
    });
  }

  // ==========================================
  // Lazy Load Images
  // ==========================================
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ==========================================
  // Back to Top Button
  // ==========================================
  function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    function toggleBackToTop() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
  }

  // ==========================================
  // Search Functionality
  // ==========================================
  function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let posts = [];

    // Fetch posts data (you'd need to generate this in Jekyll)
    async function loadPosts() {
      try {
        const response = await fetch('/search.json');
        posts = await response.json();
      } catch (err) {
        console.error('Failed to load search data:', err);
      }
    }

    function performSearch(query) {
      if (!query) return [];

      query = query.toLowerCase();
      return posts.filter(post => {
        return post.title.toLowerCase().includes(query) ||
               post.content.toLowerCase().includes(query) ||
               post.tags.some(tag => tag.toLowerCase().includes(query));
      });
    }

    searchInput.addEventListener('input', (e) => {
      const results = performSearch(e.target.value);
      displaySearchResults(results);
    });

    loadPosts();
  }

  // ==========================================
  // Animate on Scroll
  // ==========================================
  function initAnimateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      }, {
        threshold: 0.1
      });

      animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
    }
  }

  // ==========================================
  // External Links
  // ==========================================
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
      // Skip links to same domain
      if (link.hostname === window.location.hostname) return;
      
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
      
      // Add external link icon
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon';
        icon.innerHTML = ' ↗';
        link.appendChild(icon);
      }
    });
  }

  // ==========================================
  // Initialize All
  // ==========================================
  function init() {
    initThemeSwitcher();
    initSmoothScroll();
    initReadingProgress();
    initCodeCopy();
    initLazyLoading();
    initBackToTop();
    initSearch();
    initAnimateOnScroll();
    initExternalLinks();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ==========================================
// Additional Styles for JS-Created Elements
// ==========================================
const styles = `
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9999;
  }

  .reading-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--brand-color), var(--accent-color));
    width: 0%;
    transition: width 0.2s ease;
  }

  .code-block-wrapper {
    position: relative;
    margin: var(--spacing-md) 0;
  }

  .code-copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 6px 12px;
    background: var(--brand-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }

  .code-block-wrapper:hover .code-copy-button {
    opacity: 1;
  }

  .code-copy-button.copied {
    background: #4caf50;
  }

  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--brand-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
  }

  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }

  .back-to-top:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .external-icon {
    font-size: 0.8em;
    opacity: 0.7;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
