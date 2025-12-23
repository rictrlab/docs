document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-subsections a');

    // Version dropdown toggle
    const versionDropdown = document.querySelector('.version-dropdown');
    const versionBtn = document.querySelector('.version-btn');
    
    if (versionBtn && versionDropdown) {
        versionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            versionDropdown.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            versionDropdown.classList.remove('open');
        });

        // Prevent closing when clicking inside dropdown
        versionDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Smooth scrolling for all navigation links
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Update active link on scroll
    const updateActiveLink = () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // SVG icons
    const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    // Add copy buttons to code blocks
    document.querySelectorAll('pre').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = copyIcon;
        
        button.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = checkIcon;
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = copyIcon;
                    button.classList.remove('copied');
                }, 2000);
            });
        });
        
        block.appendChild(button);
    });
});
