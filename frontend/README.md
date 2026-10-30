# Interface TechAssist Pro

Adaptação do projeto `nextjs-senai.zip`, com App Router e componentes React. Consulte `../README.md` para iniciar a API, importar o MySQL e configurar o ambiente.

- `src/app`: páginas Next.js.
- `src/components/techassist/TechAssist.jsx`: componentes de apresentação, contato, solicitação, acompanhamento, cabeçalho e rodapé.
- `src/components/techassist/LiveArea.jsx`: acesso de clientes/equipe e painel de gestão.
- `src/components/techassist/api.js`: `fetch`, token JWT, rotas e conversão das respostas da API.
- `src/app/globals.css`: cores, tipografia e responsividade.

`NEXT_PUBLIC_DEMO_MODE=false` usa a API real. O modo `true` serve somente para a prévia visual sem servidor, com dados locais e avisos explícitos. Nunca use o modo de demonstração para apresentar persistência no MySQL.

A imagem ilustrativa de reparo foi obtida em Unsplash: https://images.unsplash.com/photo-1581092921461-eab62e97a780. Não representa a equipe ou as instalações do projeto.
