// Crush Combat Agency — shared mobile nav toggle. Referenced from every page.
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('flex');
        navLinks.classList.toggle('hidden');
        navToggle.setAttribute('aria-expanded', isOpen);
    });
});
