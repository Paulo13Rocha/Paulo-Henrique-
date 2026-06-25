/**
 * PORTFÓLIO – PAULO HENRIQUE SILVA ROCHA
 * Arquivo: script.js
 *
 * Funcionalidades implementadas:
 *  1. Alternância de tema claro/escuro (com persistência no localStorage)
 *  2. Menu hamburguer responsivo (mobile)
 *  3. Destaque do link de navegação ativo durante o scroll
 *  4. Validação completa do formulário de contato
 *  5. Simulação de envio com modal de confirmação
 */

/* ============================================================
   AGUARDA O CARREGAMENTO COMPLETO DO DOM ANTES DE EXECUTAR
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. ALTERNÂNCIA DE TEMA CLARO / ESCURO
     ----------------------------------------------------------
     - Lê a preferência salva no localStorage ao carregar a página
     - O botão troca a classe .light-mode / .dark-mode no <body>
     - Salva a escolha no localStorage para persistir entre sessões
  ---------------------------------------------------------- */

  const body        = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');

  /**
   * Aplica o tema escolhido ao body e atualiza o ícone do botão.
   * @param {string} theme - 'dark' ou 'light'
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      themeIcon.textContent = '☀️';   /* Ícone de sol indica: clique para clarear */
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      themeIcon.textContent = '🌙';   /* Ícone de lua indica: clique para escurecer */
    }
  }

  /* Lê a preferência salva; padrão é 'light' se não houver nada */
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  /* Evento de clique no botão de tema */
  themeToggle.addEventListener('click', function () {
    const isDark = body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);  /* Salva a preferência */
  });


  /* ----------------------------------------------------------
     2. MENU HAMBURGUER (MOBILE)
     ----------------------------------------------------------
     - Exibe / oculta o menu lateral em telas pequenas
     - O overlay escuro fecha o menu ao clicar fora
     - Os links do menu também fecham o menu ao serem clicados
  ---------------------------------------------------------- */

  const menuToggle = document.getElementById('menu-toggle');
  const mainNav    = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  /** Abre o menu lateral mobile */
  function openMenu() {
    mainNav.classList.add('open');
    navOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  /** Fecha o menu lateral mobile */
  function closeMenu() {
    mainNav.classList.remove('open');
    navOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  /* Clique no botão hamburguer: alterna aberto/fechado */
  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Clique no overlay fecha o menu */
  navOverlay.addEventListener('click', closeMenu);

  /* Clique em qualquer link do menu também fecha o menu */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });


  /* ----------------------------------------------------------
     3. DESTAQUE DO LINK ATIVO DURANTE O SCROLL
     ----------------------------------------------------------
     - Usa IntersectionObserver para detectar qual seção está
       visível na viewport e marca o link correspondente como ativo
  ---------------------------------------------------------- */

  const sections  = document.querySelectorAll('.section');
  const navLinks  = document.querySelectorAll('.nav-link');

  /* Mapeia cada id de seção para o link de navegação correspondente */
  const linkMap = {};
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href').replace('#', '');
    linkMap[href] = link;
  });

  /* Observer: dispara quando pelo menos 40% da seção entra na tela */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          /* Remove a classe ativa de todos os links */
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          /* Adiciona no link da seção visível */
          const activeLink = linkMap[entry.target.id];
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function (section) { observer.observe(section); });


  /* ----------------------------------------------------------
     4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     ----------------------------------------------------------
     - Verifica se todos os campos estão preenchidos
     - Valida o formato do e-mail com expressão regular
     - Exibe mensagens de erro inline em cada campo
     - Se válido, chama a função de simulação de envio
  ---------------------------------------------------------- */

  const contactForm = document.getElementById('contact-form');

  /* Referências aos campos do formulário */
  const campoNome     = document.getElementById('nome');
  const campoEmail    = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');

  /* Referências às spans de erro */
  const erroNome     = document.getElementById('erro-nome');
  const erroEmail    = document.getElementById('erro-email');
  const erroMensagem = document.getElementById('erro-mensagem');

  /**
   * Expressão regular para validação de formato de e-mail.
   * Formato esperado: usuario@dominio.com
   */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Exibe uma mensagem de erro e marca o campo como inválido.
   * @param {HTMLElement} campo  - O input ou textarea
   * @param {HTMLElement} span   - O span onde a mensagem será exibida
   * @param {string}      msg    - Texto da mensagem de erro
   */
  function mostrarErro(campo, span, msg) {
    span.textContent = msg;
    campo.classList.add('invalid');
  }

  /**
   * Limpa a mensagem de erro e remove o estado inválido do campo.
   * @param {HTMLElement} campo - O input ou textarea
   * @param {HTMLElement} span  - O span de erro
   */
  function limparErro(campo, span) {
    span.textContent = '';
    campo.classList.remove('invalid');
  }

  /* Remove o erro em tempo real conforme o usuário digita */
  campoNome.addEventListener('input', function () {
    if (campoNome.value.trim()) limparErro(campoNome, erroNome);
  });

  campoEmail.addEventListener('input', function () {
    if (emailRegex.test(campoEmail.value.trim())) limparErro(campoEmail, erroEmail);
  });

  campoMensagem.addEventListener('input', function () {
    if (campoMensagem.value.trim()) limparErro(campoMensagem, erroMensagem);
  });

  /**
   * Valida todos os campos do formulário.
   * @returns {boolean} true se todos os campos são válidos, false caso contrário
   */
  function validarFormulario() {
    let valido = true;

    /* Valida o nome: não pode estar vazio */
    if (!campoNome.value.trim()) {
      mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
      valido = false;
    } else {
      limparErro(campoNome, erroNome);
    }

    /* Valida o e-mail: deve ter formato válido */
    if (!campoEmail.value.trim()) {
      mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
      valido = false;
    } else if (!emailRegex.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      valido = false;
    } else {
      limparErro(campoEmail, erroEmail);
    }

    /* Valida a mensagem: não pode estar vazia */
    if (!campoMensagem.value.trim()) {
      mostrarErro(campoMensagem, erroMensagem, 'Por favor, escreva uma mensagem.');
      valido = false;
    } else {
      limparErro(campoMensagem, erroMensagem);
    }

    return valido;
  }

  /* Captura o evento de submit do formulário */
  contactForm.addEventListener('submit', function (evento) {
    evento.preventDefault();   /* Impede o envio padrão do browser */

    if (validarFormulario()) {
      simularEnvio();
    }
  });


  /* ----------------------------------------------------------
     5. SIMULAÇÃO DE ENVIO E MODAL DE CONFIRMAÇÃO
     ----------------------------------------------------------
     - Após validação bem-sucedida, limpa os campos do formulário
     - Exibe um modal de confirmação com animação
     - O botão "Fechar" do modal, ou clicar fora, fecha o modal
  ---------------------------------------------------------- */

  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose   = document.getElementById('modal-close');

  /** Simula o envio do formulário: limpa os campos e exibe o modal */
  function simularEnvio() {
    /* Limpa todos os campos após o "envio" */
    contactForm.reset();

    /* Exibe o modal de confirmação */
    modalOverlay.classList.add('visible');

    /* Foco no botão de fechar para acessibilidade */
    modalClose.focus();
  }

  /** Fecha o modal de confirmação */
  function fecharModal() {
    modalOverlay.classList.remove('visible');
  }

  /* Clique no botão "Fechar" do modal */
  modalClose.addEventListener('click', fecharModal);

  /* Clique fora da caixa do modal (no overlay) também fecha */
  modalOverlay.addEventListener('click', function (evento) {
    if (evento.target === modalOverlay) {
      fecharModal();
    }
  });

  /* Tecla Escape fecha o modal */
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && modalOverlay.classList.contains('visible')) {
      fecharModal();
    }
  });

}); /* Fim do DOMContentLoaded */
