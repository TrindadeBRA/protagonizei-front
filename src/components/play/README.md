# 📚 Componentes da Página Play

> Sistema completo de visualização interativa de livro digital com zoom profissional

## 📁 Estrutura de Arquivos

```
play/
├── BookPage.tsx          # Componente individual de página
├── BookControls.tsx      # Sistema de zoom e controles
├── NavButton.tsx         # Botão de navegação reutilizável
├── FlipBookWrapper.tsx   # Wrapper tipado do react-pageflip
├── bookConfig.ts         # Configurações centralizadas
├── index.ts              # Barrel export
└── README.md             # Esta documentação
```

## 🎯 Visão Geral

Sistema completo para visualização de livros digitais com:
- ✅ Navegação por clique/arrastar
- ✅ Navegação por setas laterais
- ✅ Swipe no mobile
- ✅ Zoom profissional (Ctrl+Scroll, pinch, botões)
- ✅ Menu de controles minimizável
- ✅ Performance otimizada com React.memo e useMemo
- ✅ Código limpo e bem documentado

## 🧩 Componentes

### `BookPage`
Componente individual que representa uma página do livro.

**Props:**
```typescript
interface BookPageProps {
  src: string;           // Caminho da imagem
  alt: string;           // Texto alternativo
  side: 'left' | 'right'; // Lado da imagem a mostrar
  priority?: boolean;     // Se deve carregar com prioridade
}
```

**Características:**
- Usa `object-cover` com `object-left`/`object-right` para mostrar metades
- Cada imagem contém 2 páginas completas do livro físico
- Suporta lazy loading para melhor performance

### `BookControls`
Sistema de zoom e controles do livro.

**Props:**
```typescript
interface BookControlsProps {
  children: React.ReactNode;    // Conteúdo (FlipBook)
  isMinimized: boolean;          // Estado dos controles
  onToggleMinimize: () => void;  // Toggle minimizar/expandir
}
```

**Funcionalidades:**
- Zoom com `react-zoom-pan-pinch` (profissional)
- Ctrl + Scroll para zoom
- Pinch-to-zoom no mobile
- Botões +/- com estados visuais
- Indicador de % do zoom
- Pan desabilitado (não interfere com FlipBook)
- Otimizado com React.memo

### `NavButton`
Botão de navegação reutilizável.

**Props:**
```typescript
interface NavButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: LucideIcon;
  label: string;
  position: 'left' | 'right';
  isMinimized?: boolean;
}
```

**Características:**
- Estados visuais otimizados (hover, active, disabled)
- Adapta opacidade baseado em `isMinimized`
- Reutilizável para qualquer navegação

### `FlipBookWrapper`
Wrapper tipado para `react-pageflip`.

**Características:**
- Tipagem TypeScript completa
- Dynamic import para SSR
- Props simplificadas

## ⚙️ Configurações (bookConfig.ts)

### Viewport
```typescript
HORIZONTAL_VIEWPORT_USAGE = 0.85;  // 85% da largura
VERTICAL_VIEWPORT_USAGE = 0.85;    // 85% da altura
VIEWPORT_PADDING = 40;              // 40px de margem
```

### Dimensões do Livro
```typescript
DEFAULT_BOOK_WIDTH = 538;   // UMA página
DEFAULT_BOOK_HEIGHT = 600;
BOOK_ASPECT_RATIO = 0.897;  // 538/600
```

### Zoom
```typescript
INITIAL_ZOOM_SCALE = 1;     // 100%
MIN_ZOOM_SCALE = 0.5;       // 50%
MAX_ZOOM_SCALE = 3;         // 300%
ZOOM_WHEEL_STEP = 0.1;      // 10% por scroll
ZOOM_PINCH_STEP = 5;        // Sensibilidade pinch
```

### Animação
```typescript
PAGE_FLIP_DURATION = 800;   // 800ms
SWIPE_DISTANCE = 50;        // 50px mínimo
```

### Lista de Páginas
```typescript
BOOK_PAGES = [
  { id: 'cover', src: '/assets/images/book/cover-1.webp', priority: true },
  { id: 'page1', src: '/assets/images/book/page1-1.webp', priority: true },
  // ...
];
```

## 🎮 Como Funciona

### Estrutura das Imagens

Cada arquivo de imagem (ex: `page1-1.webp`) contém **2 páginas completas** do livro físico:

```
┌─────────────────────────────┐
│  Página     │     Página    │
│  Esquerda   │     Direita   │
│  (538px)    │     (538px)   │
└─────────────────────────────┘
      Total: 1076px
```

### Renderização

O FlipBook mostra cada imagem duas vezes (left/right):

```typescript
// Cada imagem aparece 2x
<BookPage src="page1-1.webp" side="left" />   // Mostra lado esquerdo
<BookPage src="page1-1.webp" side="right" />  // Mostra lado direito
```

Através do CSS `object-cover` com `object-left`/`object-right`, mostramos apenas a metade correspondente.

### Resultado Final

```
Capa
┌───────────┐
│   CAPA    │
└───────────┘

Abrir livro → Páginas 1-2
┌─────────┬─────────┐
│ Pág 1   │ Pág 2   │  ← Mesma imagem, lados diferentes!
│ (left)  │ (right) │
└─────────┴─────────┘

Virar → Páginas 3-4
┌─────────┬─────────┐
│ Pág 3   │ Pág 4   │
│ (left)  │ (right) │
└─────────┴─────────┘
```

## 📦 Uso

### Importação
```typescript
import { 
  BookPage, 
  BookControls, 
  FlipBookWrapper, 
  NavButton 
} from '@/src/components/play';
```

### Exemplo Completo
```typescript
import { BookControls, FlipBookWrapper, BookPage } from '@/src/components/play';
import { useBookDimensions } from '@/src/hooks/useBookDimensions';
import { BOOK_PAGES } from '@/src/components/play/bookConfig';

function MyBookPage() {
  const dimensions = useBookDimensions();
  const [isMinimized, setIsMinimized] = useState(false);
  
  return (
    <BookControls
      isMinimized={isMinimized}
      onToggleMinimize={() => setIsMinimized(!isMinimized)}
    >
    <FlipBookWrapper
      width={dimensions.width}
      height={dimensions.height}
      showCover={true}
        usePortrait={false}
      >
        {BOOK_PAGES.map(page => (
        <BookPage
            key={page.id}
            src={page.src}
            alt={page.id}
            side="left"
            priority={page.priority}
        />
      ))}
      </FlipBookWrapper>
    </BookControls>
  );
}
```

## 🚀 Performance

### Otimizações Implementadas

1. **React.memo** - Evita re-renders desnecessários
2. **useMemo** - Memoiza lista de páginas
3. **useCallback** - Memoiza handlers
4. **Priority Loading** - Primeiras páginas com prioridade
5. **Lazy Loading** - Páginas posteriores carregam sob demanda

## 🔧 Customização

### Ajustar Tamanho do Livro

Edite `bookConfig.ts`:
```typescript
export const HORIZONTAL_VIEWPORT_USAGE = 0.90; // 90%
export const VERTICAL_VIEWPORT_USAGE = 0.90;   // 90%
```

### Adicionar Mais Páginas

Edite `BOOK_PAGES` em `bookConfig.ts`:
```typescript
export const BOOK_PAGES = [
  // ... páginas existentes
  { id: 'page7', src: '/assets/images/book/page7-1.webp', priority: false },
];
```

### Personalizar Zoom

Ajuste limites em `bookConfig.ts`:
```typescript
export const MIN_ZOOM_SCALE = 0.3;  // 30% mínimo
export const MAX_ZOOM_SCALE = 5;    // 500% máximo
```

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile, Samsung Internet)
- ✅ Tablets
- ✅ Touch devices
- ✅ Teclado (Tab, Enter, Arrows)
- ✅ Screen readers

## 🎨 Estética

O design mantém:
- Gradiente de fundo: pink-100 → purple-100 → blue-100
- Controles em roxo com glassmorphism
- Animações suaves e transições
- Efeitos hover/active responsivos
- Shadow e backdrop-blur profissionais

## 📝 Manutenção

### Adicionar Nova Funcionalidade

1. Adicione configurações em `bookConfig.ts`
2. Crie componente auxiliar se necessário
3. Integre no componente principal
4. Adicione testes
5. Atualize documentação

### Debugging

Console logs removidos em produção. Para debug:
```typescript
// Adicione temporariamente:
console.log('Current page:', currentPage);
console.log('Total pages:', totalPages);
console.log('Current scale:', currentScale);
```

## 🏆 Arquitetura

- **Separação de responsabilidades** - Cada componente tem uma função
- **DRY (Don't Repeat Yourself)** - NavButton e ZoomButton reutilizáveis
- **Configuração centralizada** - bookConfig.ts
- **Tipagem forte** - TypeScript em todos os componentes
- **Performance** - React.memo, useMemo, useCallback
- **Manutenibilidade** - Comentários e documentação clara

---

**Desenvolvido com ❤️ para Protagonizei**
