document.addEventListener('DOMContentLoaded', () => {

    // --- PROTEÇÃO DE ROTA (SIMULAÇÃO) ---
    // Verifica se o admin logou. Se não, expulsa para o login.
    if (localStorage.getItem('adminAuth') !== 'true') {
        window.location.href = 'login.html';
        return; // Para execução do resto do script
    }

    // --- LÓGICA DE LOGOUT ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminAuth'); // Remove autenticação
            window.location.href = 'login.html'; // Redireciona
        });
    }

    // --- LÓGICA DE INTERFACE ---
    const menuToggle = document.getElementById('menuToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    const adminMain = document.querySelector('.admin-main');

    // Sidebar Toggle Logic
    if (menuToggle && adminSidebar && adminMain) {
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
    }

    // Close sidebar if clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (adminSidebar && menuToggle) {
                if (!adminSidebar.contains(e.target) && !menuToggle.contains(e.target) && adminSidebar.classList.contains('active')) {
                    adminSidebar.classList.remove('active');
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            if (adminSidebar) adminSidebar.classList.remove('active');
        } else {
            if (adminSidebar) adminSidebar.classList.remove('collapsed');
            if (adminMain) adminMain.classList.remove('expanded');
        }
    });

    // --- INTERAÇÕES DA TABELA (Pedidos) ---
    const statusBadges = document.querySelectorAll('.status-badge');

    // Simulação: Ao clicar num status de pedido, ele avança para o próximo estágio.
    statusBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.title = "Clique para avançar o status do pedido";

        badge.addEventListener('click', function () {
            if (this.classList.contains('status-pending')) {
                // Pendente -> Preparando
                this.classList.remove('status-pending');
                this.classList.add('status-processing');
                this.textContent = 'Preparando';
            } else if (this.classList.contains('status-processing')) {
                // Preparando -> Concluído
                this.classList.remove('status-processing');
                this.classList.add('status-completed');
                this.textContent = 'Concluído';
            }
        });
    });

    // Simulação: Botões de ação (Olho)
    const viewButtons = document.querySelectorAll('.admin-table .btn-icon');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Simulação: Abrindo detalhes completos do pedido na tela...');
        });
    });
});
