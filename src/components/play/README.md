# Componentes da Página Play

Esta pasta contém os componentes e configurações relacionados à página de visualização interativa do livro (`/play`).

## 📁 Estrutura de Arquivos

```
play/
├── BookPage.tsx           # Componente individual de página do livro
├── FlipBookWrapper.tsx    # Wrapper tipado do react-pageflip
├── FullscreenWidget.tsx   # Widget flutuante de tela cheia
├── MockBookPages.tsx      # Páginas mockadas para demonstração
├── bookConfig.ts          # Configurações de dimensões e espaçamento
├── index.ts              # Barrel export para facilitar importações
└── README.md             # Este arquivo
```

## 🧩 Componentes

### `BookPage`
Componente individual que representa uma única página do livro.

**Props:**
- `src`: Caminho da imagem da página
- `alt`: Texto alternativo para acessibilidade
- `side`: 'left' ou 'right' - define o alinhamento da imagem
- `priority`: Boolean - se deve carregar a imagem com prioridade

### `FlipBookWrapper`
Wrapper tipado para o componente `react-pageflip`, facilitando o uso com TypeScript.

**Props:**
- `width`: Largura do livro
- `height`: Altura do livro
- Todas as props do `react-pageflip`

### `FullscreenWidget`
Widget flutuante que permite entrar/sair do modo tela cheia.

**Funcionalidades:**
- Detecta automaticamente se é mobile ou desktop
- Tenta múltiplas APIs de fullscreen para compatibilidade
- Mostra instruções caso a API não funcione (iOS Safari)
- Ícone dinâmico baseado no estado

### `MockBookPages`
Componente que contém as páginas mockadas do livro para demonstração.

**Estrutura:**
- Capa
- 6 páginas internas (com prioridade de carregamento nas primeiras)
- Contracapa

## ⚙️ Configurações

### `bookConfig.ts`
Contém todas as configurações de dimensões e espaçamento do livro:

- `HORIZONTAL_VIEWPORT_USAGE`: Porcentagem da largura da viewport (0.0 a 1.0)
- `VERTICAL_VIEWPORT_USAGE`: Porcentagem da altura da viewport (0.0 a 1.0)
- `VIEWPORT_PADDING`: Padding fixo em pixels
- `BOOK_ASPECT_RATIO`: Proporção do livro (largura/altura)
- `DEFAULT_BOOK_WIDTH`: Largura padrão
- `DEFAULT_BOOK_HEIGHT`: Altura padrão

## 🎣 Hooks Relacionados

### `useBookDimensions` (`/src/hooks/useBookDimensions.ts`)
Hook personalizado que calcula as dimensões responsivas do livro baseado nas configurações.

**Retorna:**
```typescript
{
  width: number;
  height: number;
}
```

**Funcionalidades:**
- Calcula dimensões baseado na viewport
- Mantém proporção do livro
- Recalcula automaticamente no resize
- Respeita as configurações de `bookConfig.ts`

## 📦 Como Usar

### Importação Simplificada
```typescript
import { 
  BookPage, 
  FlipBookWrapper, 
  FullscreenWidget, 
  MockBookPages 
} from '@/src/components/play';
```

### Exemplo de Uso
```typescript
import { FlipBookWrapper, MockBookPages } from '@/src/components/play';
import { useBookDimensions } from '@/src/hooks/useBookDimensions';

function MyBookPage() {
  const dimensions = useBookDimensions();
  
  return (
    <FlipBookWrapper
      width={dimensions.width}
      height={dimensions.height}
      showCover={true}
    >
      <MockBookPages />
    </FlipBookWrapper>
  );
}
```

## 🔄 Substituindo Dados Mockados

Para usar dados reais ao invés dos mockados:

1. Crie seu próprio componente de páginas (similar ao `MockBookPages`)
2. Busque os dados da API
3. Mapeie os dados para componentes `BookPage`
4. Substitua `<MockBookPages />` pelo seu componente

Exemplo:
```typescript
function RealBookPages({ bookData }) {
  return (
    <>
      {bookData.pages.map((page, index) => (
        <BookPage
          key={index}
          src={page.imageUrl}
          alt={page.title}
          side={page.side}
          priority={index < 6}
        />
      ))}
    </>
  );
}
```

## 🎨 Customização

### Ajustando Tamanho do Livro
Edite as constantes em `bookConfig.ts`:

```typescript
// Livro maior (ocupa mais espaço)
export const HORIZONTAL_VIEWPORT_USAGE = 0.90; // 90%
export const VERTICAL_VIEWPORT_USAGE = 0.90;   // 90%

// Livro menor (mais espaço ao redor)
export const HORIZONTAL_VIEWPORT_USAGE = 0.50; // 50%
export const VERTICAL_VIEWPORT_USAGE = 0.50;   // 50%
```

### Customizando Widget de Tela Cheia
O componente `FullscreenWidget` pode ser facilmente estilizado alterando as classes Tailwind ou movido para outra posição.

## 📱 Compatibilidade Mobile

Os componentes são otimizados para funcionar em dispositivos móveis:

- ✅ Detecção automática de mobile
- ✅ Suporte a múltiplas APIs de fullscreen
- ✅ Fallback com instruções para iOS Safari
- ✅ Dimensões responsivas automáticas
- ✅ Suporte a scroll no mobile

## 🎮 Navegação e Interatividade

### Biblioteca de Zoom

O sistema de zoom utiliza a biblioteca **`react-zoom-pan-pinch`** - uma solução profissional e robusta para gerenciamento de zoom/pan/pinch em React.

**Benefícios:**
- ✅ Zoom suave e performático
- ✅ Suporte nativo a gestos (pinch-to-zoom)
- ✅ Não interfere com eventos do FlipBook
- ✅ API simples e configurável

### Métodos de Navegação

O livro sempre responde aos toques/cliques para virar páginas, independente do nível de zoom:

#### **Navegação de Páginas** (Sempre Ativo)

1. **Clique e Arrastar (Desktop)**
   - Clique e arraste as páginas para virar
   - Funciona em qualquer nível de zoom

2. **Swipe/Deslizar (Mobile)**
   - Deslize as páginas para navegar
   - Responde naturalmente aos toques
   - Distância mínima configurável

3. **Setas de Navegação**
   - Botões laterais fixos
   - Sempre visíveis e acessíveis
   - Não afetados pelo zoom

#### **Controles de Zoom**

1. **Ctrl + Scroll (Desktop)**
   - Zoom in: Ctrl + Scroll Up
   - Zoom out: Ctrl + Scroll Down

2. **Pinch-to-Zoom (Mobile)**
   - Gesto nativo de dois dedos
   - Zoom suave e natural

3. **Botões no Menu**
   - Botão "+" para zoom in
   - Botão "-" para zoom out
   - Indicador visual do nível (%)
   - Minimizável para melhor visualização

### Como Funciona a Integração

```typescript
// BookControls.tsx - Usando react-zoom-pan-pinch
<TransformWrapper
  initialScale={0.5}
  minScale={0.25}
  maxScale={3}
  panning={{ disabled: true }}  // 🔑 Chave: Pan desabilitado!
>
  <TransformComponent>
    <FlipBookWrapper
      useMouseEvents={true}       // ✅ Sempre habilitado
      mobileScrollSupport={true}  // ✅ Sempre habilitado
    />
  </TransformComponent>
</TransformWrapper>
```

### Por Que Funciona?

1. **Pan Desabilitado:** Com `panning.disabled = true`, a biblioteca não intercepta eventos de arrastar
2. **Eventos Livres:** Cliques e arrastes passam direto para o FlipBook
3. **Zoom Isolado:** O zoom é aplicado via transform, sem afetar os event listeners
4. **Gestos Nativos:** Pinch e wheel funcionam normalmente

### Configuração de Zoom

```typescript
const zoomConfig = {
  initialScale: 0.5,    // Escala inicial (50%)
  minScale: 0.25,       // Zoom mínimo (25%)
  maxScale: 3,          // Zoom máximo (300%)
  wheel: {
    step: 0.1,          // Incremento por scroll
  },
  pinch: {
    step: 5,            // Sensibilidade do pinch
  },
  panning: {
    disabled: true,     // ⚠️ Crítico para não conflitar
  },
};
```

### Benefícios da Implementação

✅ **Zero Conflitos:** Zoom e navegação funcionam independentemente  
✅ **Performance:** Biblioteca otimizada com animações suaves  
✅ **Mobile-First:** Gestos nativos funcionam perfeitamente  
✅ **Simples:** Configuração mínima e manutenção fácil  
✅ **Profissional:** Solução battle-tested usada por milhares de projetos

