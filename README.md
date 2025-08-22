# 📚 Protagonizei - Livros Personalizados com IA

<div align="center">
  <img src="public/assets/images/logo-black.svg" alt="Protagonizei Logo" width="200"/>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 🎯 Sobre o Projeto

O **Protagonizei** é uma plataforma inovadora que transforma crianças em protagonistas de suas próprias histórias através de inteligência artificial. Criamos livros infantis digitais personalizados onde cada criança aparece com seu nome, rosto e características únicas, gerando uma experiência mágica e educativa.

### ✨ Principais Funcionalidades

- **Personalização Total**: Nome, rosto e características da criança na história
- **Geração por IA**: Narrativas únicas criadas por inteligência artificial
- **Entrega Digital**: PDF personalizado enviado por e-mail
- **Interface Multilíngue**: Suporte para Português, Inglês e Espanhol
- **Processo Simplificado**: Sem necessidade de login ou cadastro complexo
- **Responsivo**: Funciona perfeitamente em todos os dispositivos

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário

### UI/UX
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes
- **AOS** - Animações de scroll
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

### Funcionalidades Especiais
- **Three.js** - Gráficos 3D para o livro interativo
- **React Pageflip** - Efeito de virar páginas
- **React Easy Crop** - Recorte e edição de imagens
- **Toastify** - Notificações elegantes

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Orval** - Geração automática de tipos da API
- **Next Sitemap** - Geração automática de sitemap

## 📁 Estrutura do Projeto

```
protagonizei.com/
├── app/                    # App Router do Next.js
│   ├── blog/              # Sistema de blog
│   ├── trabalhe-conosco/  # Página de carreiras
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── src/
│   ├── components/        # Componentes React
│   │   ├── FormSection/   # Formulário principal
│   │   ├── HeroSection/   # Seção hero
│   │   ├── ui/            # Componentes base
│   │   └── ...            # Outros componentes
│   ├── hooks/             # Hooks customizados
│   ├── lib/               # Utilitários
│   ├── services/          # Serviços e API
│   └── types/             # Definições de tipos
├── public/                # Arquivos estáticos
│   ├── assets/            # Imagens e recursos
│   └── manifest.json      # PWA manifest
└── package.json           # Dependências e scripts
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- Yarn ou npm
- Git

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/protagonizei.com.git
   cd protagonizei.com
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas configurações:
   ```env
   NEXT_PUBLIC_API_URL=sua_url_da_api
   GOOGLE_ANALYTICS_ID=seu_id_ga
   GOOGLE_TAG_MANAGER_ID=seu_id_gtm
   ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

5. **Acesse o projeto**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📜 Scripts Disponíveis

```json
{
  "dev": "next dev --turbopack",     // Desenvolvimento com Turbopack
  "build": "next build",             // Build de produção
  "start": "next start",             // Servidor de produção
  "lint": "next lint",               // Verificação de código
  "orval": "orval",                  // Geração de tipos da API
  "postbuild": "next-sitemap"        // Geração automática de sitemap
}
```

## 🌐 Funcionalidades Principais

### 1. Formulário de Pedido
- **Step 1**: Informações da criança
- **Step 2**: Upload e recorte de foto
- **Step 3**: Validação e processamento
- **Step 4**: Dados de contato
- **Step 5**: Pagamento via PIX
- **Step 6**: Confirmação de sucesso

### 2. Sistema de Blog
- Listagem de posts com paginação
- Visualização individual de posts
- Sidebar com posts recentes
- Suporte a preview para administradores

### 3. Multilinguismo
- Tradução automática via Google Translate
- Suporte para PT-BR, EN e ES
- Interface adaptativa por idioma

### 4. Componentes Interativos
- Livro 3D com efeito de virar páginas
- Timer de ofertas especiais
- Sistema de cupons de desconto
- Chat flutuante do WhatsApp

## 🔧 Configurações

### Next.js
- **Output**: Export estático para hospedagem
- **Images**: Domínios permitidos configurados
- **Redirects**: Redirecionamentos automáticos
- **Environment**: Configurações de idiomas

### Tailwind CSS
- Sistema de design tokens
- Componentes base customizados
- Responsividade mobile-first
- Animações e transições

### SEO e Performance
- Metadados estruturados (JSON-LD)
- Sitemap automático
- Otimização de imagens
- PWA com manifest

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops
- 📺 Telas grandes

## 🚀 Deploy

### Build de Produção
```bash
yarn build
```

### Export Estático
```bash
yarn build
# Os arquivos serão gerados na pasta 'out'
```

### Hospedagem
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **GitHub Pages**
- **Qualquer servidor estático**

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Website**: [protagonizei.com](https://protagonizei.com)
- **Email**: contato@protagonizei.com
- **WhatsApp**: [Link do WhatsApp](https://wa.me/seu-numero)

## 🙏 Agradecimentos

- Equipe de desenvolvimento
- Comunidade Next.js
- Contribuidores open source
- Usuários e clientes

---

<div align="center">
  <p>Feito com ❤️ pela equipe Protagonizei</p>
  <p>Transformando sonhos em histórias desde 2024</p>
</div>
