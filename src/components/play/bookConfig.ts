// ========================================
// CONFIGURAÇÕES DE ESPAÇAMENTO DO LIVRO
// ========================================
// Ajuste estas constantes para controlar o espaço livre ao redor do livro
// Valores menores = livro maior, menos espaço livre
// Valores maiores = livro menor, mais espaço livre

// Porcentagem da largura da viewport que o livro pode ocupar (0.0 a 1.0)
export const HORIZONTAL_VIEWPORT_USAGE = 0.85; // 85% da largura disponível

// Porcentagem da altura da viewport que o livro pode ocupar (0.0 a 1.0)
export const VERTICAL_VIEWPORT_USAGE = 0.85; // 85% da altura disponível

// Padding fixo em pixels (margem de segurança adicional)
export const VIEWPORT_PADDING = 40; // pixels

// Dimensões de UMA página (a biblioteca mostra 2 lado a lado)
// IMPORTANTE: Cada imagem contém 2 páginas completas do livro físico
export const BOOK_ASPECT_RATIO = 538 / 600; // ~0.897 (proporção de uma página)
export const DEFAULT_BOOK_WIDTH = 538; // Largura de UMA página
export const DEFAULT_BOOK_HEIGHT = 600;

