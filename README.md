# Tiken Website

Este é o repositório do website da Tiken, desenvolvido com Next.js 15 e React 19.


## 🎥 Tutoriais

Para ajudar no desenvolvimento e manutenção do sistema, criamos uma playlist de tutoriais no YouTube que cobre os principais aspectos do projeto:

- [Playlist de Tutoriais do Sistema](https://www.youtube.com/playlist?list=PLivqx8LbCRd-FbkXOP-KhPE3mQEW7n845)

## 🚀 Tecnologias Principais

- Next.js 15.2.1
- React 19
- TypeScript
- TailwindCSS 4

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd tiken-website
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json/trinitykitcms-api/v1
WORDPRESS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

O projeto segue a estrutura de diretórios do Next.js 15 com App Router:

```
app/
├── blog/              # Página do blog
├── linha-de-produtos/ # Página de linha de produtos
├── produtos/         # Página de produtos
├── quem-somos/       # Página institucional
├── trabalhe-conosco/ # Página de carreiras
├── politica-de-privacidade/ # Política de privacidade
├── globals.css       # Estilos globais
├── layout.tsx        # Layout principal
└── page.tsx          # Página inicial
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run serve` - Serve a build estática
- `npm run lint` - Executa o linter
- `npm run orval` - Executa o gerador de código Orval

## 🔄 CI/CD

O projeto utiliza GitHub Actions para CI/CD, com deploy automático configurado através do arquivo `workflow-trigger.txt`. O timestamp do último deploy é mantido neste arquivo para controle de versão.

## 📚 Principais Dependências

### UI e Componentes
- @headlessui/react - Componentes UI acessíveis
- @heroicons/react - Ícones
- lucide-react - Biblioteca de ícones
- react-icons - Ícones adicionais
- TailwindPlus - Componentes visuais

### Formulários e Validação
- react-hook-form - Gerenciamento de formulários
- zod - Validação de esquemas
- @hookform/resolvers - Resolvedores para react-hook-form

### Animações e Efeitos
- aos - Animações de scroll

### Utilitários
- date-fns - Manipulação de datas
- nookies - Gerenciamento de cookies
- vanilla-cookieconsent - Gerenciamento de consentimento de cookies
- toastify-js - Notificações toast

## 🔒 Variáveis de Ambiente

Para executar o build e deploy projeto, você precisará configurar as seguintes variáveis de ambiente:

```env
WORDPRESS_URL=meucms.wp.com
FTP_HOST=ftp.tiken.com.br
FTP_LOGIN=tiken
FTP_PASSWORD=tiken
```

## 📝 Licença

Este projeto é privado e proprietário da Tiken.

## 👥 Contribuição

Para contribuir com o projeto, siga as diretrizes de contribuição e o processo de code review estabelecido pela equipe.
# protagonizei-front
