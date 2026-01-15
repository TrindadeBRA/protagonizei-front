// =================================================================
// CONFIGURAÇÕES DO LIVRO DIGITAL
// =================================================================
// Este arquivo contém todas as configurações relacionadas ao tamanho
// e posicionamento do livro na tela

// -----------------------------------------------------------------
// CONFIGURAÇÕES DE VIEWPORT
// -----------------------------------------------------------------
// Controlam quanto espaço o livro ocupa na tela
// OTIMIZADO: Livro maior para melhor legibilidade (sem zoom)

/** Porcentagem da largura da viewport que o livro pode ocupar (0.0 a 1.0) */
export const HORIZONTAL_VIEWPORT_USAGE = 0.90;

/** Porcentagem da altura da viewport que o livro pode ocupar (0.0 a 1.0) */
export const VERTICAL_VIEWPORT_USAGE = 0.90;

/** Espaço mínimo em pixels ao redor do livro */
export const VIEWPORT_PADDING = 20;

// -----------------------------------------------------------------
// DIMENSÕES DO LIVRO
// -----------------------------------------------------------------
// IMPORTANTE: O FlipBook mostra DUAS páginas lado a lado no modo landscape
// Cada imagem contém 2 páginas completas do livro físico (1076px total)
// Mas configuramos apenas UMA página aqui (538px) e a biblioteca duplica

/** Largura de UMA página individual */
export const DEFAULT_BOOK_WIDTH = 538;

/** Altura de UMA página */
export const DEFAULT_BOOK_HEIGHT = 600;

/** Proporção width/height de UMA página */
export const BOOK_ASPECT_RATIO = DEFAULT_BOOK_WIDTH / DEFAULT_BOOK_HEIGHT; // ~0.897

// -----------------------------------------------------------------
// CONFIGURAÇÕES DE ZOOM (REMOVIDO)
// -----------------------------------------------------------------
// Decisão: Zoom removido para garantir que todos os comandos
// (clique, arrastar, swipe) funcionem perfeitamente.
// O livro já ocupa 90% da tela, proporcionando boa legibilidade.

// -----------------------------------------------------------------
// CONFIGURAÇÕES DE ANIMAÇÃO
// -----------------------------------------------------------------

/** Duração da animação de virar página (em milissegundos) */
export const PAGE_FLIP_DURATION = 800;

/** Distância mínima de swipe para reconhecer como virada de página (em pixels) */
export const SWIPE_DISTANCE = 50;

// -----------------------------------------------------------------
// LISTA DE PÁGINAS DO LIVRO
// -----------------------------------------------------------------
// Cada entrada representa uma imagem que contém 2 páginas

export const BOOK_PAGES = [
	{ id: 'cover', src: '/assets/images/book/cover-1.webp', priority: true },
	{ id: 'page1', src: '/assets/images/book/page1-1.webp', priority: true },
	{ id: 'page2', src: '/assets/images/book/page2-1.webp', priority: true },
	{ id: 'page3', src: '/assets/images/book/page3-1.webp', priority: true },
	{ id: 'page4', src: '/assets/images/book/page4-1.webp', priority: false },
	{ id: 'page5', src: '/assets/images/book/page5-1.webp', priority: false },
	{ id: 'page6', src: '/assets/images/book/page6-1.webp', priority: false },
] as const;
