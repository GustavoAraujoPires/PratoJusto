// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Remover tela de loading
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1000);

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('.nav-link, .footer-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href') || '';
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animar elementos ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop <= window.innerHeight - 100) && (elementBottom >= 0);

            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos os elementos com data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Contador animado para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateNumbers() {
        if (counted) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });

        counted = true;
    }

    // Observar seção de estatísticas
    const statsSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Botões de doação: redirecionar para cadastro
    const donateButtons = document.querySelectorAll('.btn-primary, .donate-btn');
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'cadastro_perfil.html';
        });
    });

    // Botão menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Efeito de hover nas cards
    const cards = document.querySelectorAll('.card, .feature, .step, .impact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Função de notificação
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animação de entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Adicionar estilos para notificação
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 10000;
            border-left: 4px solid #3B82F6;
        }

        .notification-success {
            border-left-color: #10B981;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .notification-icon {
            font-size: 1.2rem;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);

    // Inicializar animações
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Efeito de digitação no título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }

    console.log('Prato Justo - Site carregado com sucesso! 🍽️');

    // Tabs de busca na home
    const searchTabs = document.querySelectorAll('.tab-btn');
    const searchContents = document.querySelectorAll('.tab-content');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active de todas as tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            searchContents.forEach(c => c.classList.remove('active'));
            
            // Ativa a tab clicada
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Busca de doações na home
    const homeBtnBuscar = document.getElementById('homeBtnBuscar');
    const homeBtnPerto = document.getElementById('homeBtnPerto');
    const homeBtnCep = document.getElementById('homeBtnCep');
    const homeResultados = document.getElementById('homeResultados');
    
    if (homeBtnBuscar) {
        homeBtnBuscar.addEventListener('click', async () => {
            const tipo = document.getElementById('homeSearchTipo').value;
            const cidade = document.getElementById('homeSearchCidade').value;
            const params = new URLSearchParams({ tipo, cidade });
            const res = await fetch(window.location.origin + '/doacoes?' + params.toString());
            const itens = await res.json();
            renderHomeResultados(itens);
        });
    }

    if (homeBtnPerto) {
        homeBtnPerto.addEventListener('click', () => {
            if (!navigator.geolocation) return alert('Geolocalização não suportada');
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const res = await fetch(`${window.location.origin}/doacoes/proximas?lat=${lat}&lng=${lng}&raio_km=10`);
                const itens = await res.json();
                renderHomeResultados(itens);
            }, () => alert('Não foi possível obter localização'));
        });
    }

    if (homeBtnCep) {
        homeBtnCep.addEventListener('click', async () => {
            const cep = document.getElementById('homeSearchCep').value.replace(/\D/g, '');
            if (cep.length !== 8) return alert('CEP deve ter 8 dígitos');
            
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    const res = await fetch(`${window.location.origin}/doacoes?cidade=${data.localidade}`);
                    const itens = await res.json();
                    renderHomeResultados(itens);
                } else {
                    alert('CEP não encontrado');
                }
            } catch (error) {
                alert('Erro ao buscar CEP');
            }
        });
    }

    function renderHomeResultados(itens) {
        const ul = document.getElementById('homeResultados');
        if (!ul) return;
        ul.innerHTML = '';
        if (!Array.isArray(itens) || itens.length === 0) {
            ul.innerHTML = '<li>Nenhuma doação encontrada.</li>';
            return;
        }
        itens.forEach(i => {
            const li = document.createElement('li');
            li.style.padding = '6px 0';
            li.textContent = `${i.titulo || 'Doação'} • ${i.tipoAlimento || ''} • ${i.cidade || ''}`;
            ul.appendChild(li);
        });
    }
});

// Adicionar classe de animação para elementos
document.querySelectorAll('.feature, .step, .impact-card').forEach(el => {
    el.setAttribute('data-animate', 'true');
});
// Adição: Suporte para menu mobile com login
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    });
    // Fechar menu ao rolar a página no mobile
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}