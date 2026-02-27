document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    const adminMain = document.querySelector('.admin-main');

    // Sidebar Toggle Logic
    menuToggle.addEventListener('click', () => {
        if (window.innerWidth > 992) {
            // Desktop behavior
            adminSidebar.classList.toggle('collapsed');
            adminMain.classList.toggle('expanded');
        } else {
            // Mobile behavior
            adminSidebar.classList.toggle('active');
        }
    });

    // Close sidebar if clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!adminSidebar.contains(e.target) && !menuToggle.contains(e.target) && adminSidebar.classList.contains('active')) {
                adminSidebar.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            adminSidebar.classList.remove('active');
            // Remove transitions temporarily when resizing across breakpoints to prevent visual glitches
        } else {
            adminSidebar.classList.remove('collapsed');
            adminMain.classList.remove('expanded');
        }
    });
});
