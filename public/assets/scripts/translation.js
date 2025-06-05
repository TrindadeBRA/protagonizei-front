function TranslateInit() {
  // Verifica se existe cookie de tradução
  const googtrans = document.cookie.match(/(^|;)\s*googtrans\s*=\s*([^;]+)/);
  
  // Verifica se o parâmetro de URL 'lang' está presente
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  
  // Protege o metadata da tradução
  protectMetadata();
  
  if (urlLang && urlLang !== 'pt') {
    // Se tem idioma na URL e não é português, força a tradução
    try {
      if (typeof google !== 'undefined' && google.translate) {
        new google.translate.TranslateElement();
      }
    } catch (error) {
      // Silently handle error
    }
    return;
  }
  
  // Se não existir cookie ou o idioma for português, não inicializa o tradutor
  if (!googtrans || googtrans[2] === '/auto/pt') {
    return;
  }
  
  try {
    if (typeof google !== 'undefined' && google.translate) {
      new google.translate.TranslateElement();
    }
  } catch (error) {
    // Silently handle error
  }
}

function protectMetadata() {
  const title = document.querySelector('title');
  if (title) {
    title.classList.add('notranslate');
  }
}