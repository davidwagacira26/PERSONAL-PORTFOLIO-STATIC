const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const body = document.body;
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
        }

        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });