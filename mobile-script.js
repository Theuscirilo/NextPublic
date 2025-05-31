// Função para scroll suave entre seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para toggle dos detalhes dos benefícios
function toggleBenefitDetails(card) {
    const details = card.querySelector('.benefit-details');
    if (details) {
        const isVisible = details.style.display === 'block';
        
        // Fechar todos os outros cards
        document.querySelectorAll('.benefit-details').forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Toggle do card atual
        if (!isVisible) {
            details.style.display = 'block';
            details.style.animation = 'fadeInUp 0.3s ease-out';
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.2)';
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
    }
}

// Função para observar elementos e adicionar animações
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    // Observar elementos que devem aparecer com scroll
    const elementsToAnimate = document.querySelectorAll(
        '.achievement-card, .benefit-card, .contact-form, .contact-info, .footer-section'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função de validação do formulário
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    // Validação específica para email
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    return isValid;
}

// Função para mostrar notificações
function showNotification(message, type = 'success') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Função para enviar formulário de contato
async function submitContactForm(formData) {
    // Simular envio (aqui você integraria com seu backend)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

// Função para abrir WhatsApp com mensagem personalizada
function openWhatsApp(section) {
    const phoneNumber = '5543996825923';
    let message = '';
    
    switch(section) {
        case 'aposentadoria':
            message = encodeURIComponent('Olá! Gostaria de saber mais sobre aposentadoria. Preciso de ajuda para entender meus direitos e como posso dar entrada no processo.');
            break;
        case 'pensao':
            message = encodeURIComponent('Olá! Preciso de informações sobre pensão por morte. Gostaria de uma consulta para entender o processo e a documentação necessária.');
            break;
        case 'auxilio':
            message = encodeURIComponent('Olá! Preciso de ajuda com auxílio por incapacidade (antigo auxílio-doença). Gostaria de uma orientação sobre meu caso.');
            break;
        case 'outros':
            message = encodeURIComponent('Olá! Gostaria de saber mais sobre outros auxílios previdenciários. Preciso de uma consulta para avaliar meus direitos.');
            break;
        default:
            message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da NextPublic e agendar uma consulta gratuita.');
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Otimizações para dispositivos móveis
function optimizeForMobile() {
    // Prevenir zoom em inputs no iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        });
        
        input.addEventListener('blur', () => {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
        });
    });
    
    // Melhorar performance de scroll
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Adicionar lógica de scroll aqui se necessário
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    
    // Otimizar touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
}

// Adicionar animações CSS necessárias
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Melhorias para performance */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Otimização de scroll */
        html {
            -webkit-overflow-scrolling: touch;
        }
        
        /* Remover highlight de tap no mobile */
        * {
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Melhorar performance de transformações */
        .benefit-card,
        .achievement-card,
        .cta-button,
        .benefit-btn,
        .submit-btn,
        .whatsapp-btn,
        .cta-btn {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilos de animação
    addAnimationStyles();
    
    // Configurar otimizações mobile
    optimizeForMobile();
    
    // Configurar observer para animações
    setupIntersectionObserver();
    
    // Event listeners para cards de benefícios
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Não executar se clicou no botão
            if (!e.target.closest('.benefit-btn')) {
                toggleBenefitDetails(card);
            }
        });
    });
    
    // Event listener para formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(contactForm)) {
                showNotification('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Mostrar loading
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            try {
                const formData = new FormData(contactForm);
                const result = await submitContactForm(formData);
                
                if (result.success) {
                    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Melhorar experiência de clique em botões
    document.querySelectorAll('button, .cta-button, .cta-btn, .benefit-btn, .whatsapp-btn').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Lazy loading para imagens (se houver)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('NextPublic - Site otimizado para mobile carregado com sucesso!');
});

// Função global para exposição no HTML
window.scrollToSection = scrollToSection;
window.openWhatsApp = openWhatsApp;

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}