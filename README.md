# TechAssist Pro — Segunda entrega

Sistema de gestão de assistência técnica com telas em Next.js, API Node.js/Express e banco MySQL. A interface segue as cores vermelha, preta e branca da referência Auren.

O **front-end parte de `nextjs-senai.zip`**: App Router, páginas, componentes React, CSS, formulários, `useState`, `useEffect` e `fetch`. O **back-end parte de `api-produtos-3md-2026s2.zip`**: rotas → controllers → services → models, `mysql2/promise`, SQL parametrizado, validações, bcrypt, JWT, Helmet, CORS e controle de acesso. Não usa ORM nem troca de banco.

## Rodar no Windows com XAMPP

É necessário Node.js 22 ou superior e MySQL/MariaDB disponível. O Node.js executa o front-end e a API; o XAMPP fornece o MySQL. **Não coloque o projeto em `htdocs` e não tente abrir os arquivos JSX diretamente.**

1. Extraia o ZIP e abra a pasta `TechAssistPro_Entrega2` no VS Code.
2. No XAMPP, inicie **MySQL**. Para usar o phpMyAdmin, inicie também o Apache.
3. No phpMyAdmin, abra **Importar** e selecione `database/techassistpro.sql`. O arquivo cria o banco `techassistpro`, tabelas e dados fictícios. Não apaga bancos existentes. Use um banco novo para esta versão: não é uma migração de versões anteriores do projeto.
4. No terminal, na raiz do projeto:

```sh
npm run configurar
```

Esse comando cria os arquivos de configuração e uma chave JWT aleatória, sem sobrescrever configurações existentes. Em `backend/.env`, confira o MySQL. O padrão local é `127.0.0.1`, porta `3306`, usuário `root` e senha vazia. Se o XAMPP usar outra porta ou senha, ajuste esses campos.

5. Abra um terminal para a API:

```sh
cd backend
npm ci
npm run dev
```

6. Abra outro terminal para a interface:

```sh
cd frontend
npm ci
npm run dev
```

7. Acesse **http://localhost:3000**. A API fica em **http://localhost:3001/api/check**. O retorno deve indicar `api: ok` e `banco: ok`.

Depois da configuração inicial, também é possível executar `INICIAR_WINDOWS.bat`. Ele instala dependências ausentes e abre os dois terminais. O MySQL precisa estar ligado e o SQL importado.

### Criar o administrador

Não há senha administrativa padrão no código. Acrescente temporariamente estas variáveis ao `backend/.env`, usando um e-mail e uma senha escolhidos para o projeto:

```dotenv
ADMIN_NOME=Administrador
ADMIN_EMAIL=seu-email@exemplo.com
ADMIN_SENHA=coloque-aqui-uma-senha-forte
```

A senha deve ter de 8 a 72 caracteres, com maiúscula, minúscula, número e símbolo. Na pasta `backend`, execute:

```sh
npm run criar-admin
```

O comando cria uma conta de equipe com perfil `adm`; não substitui senhas de contas existentes. Remova `ADMIN_SENHA` do `.env` após concluir. Na tela **Área do cliente**, escolha **Sou da equipe** para entrar como administrador.

O cadastro público cria **clientes**, sem conceder acesso ao painel da equipe. A separação usa as duas tabelas da documentação: `clientes` e `usuarios`. Os perfis de equipe previstos são `adm`, `supervisor`, `suporte` e `funcionario`; a exclusão de cadastros exige `adm`. A criação de outros funcionários pela interface fica para uma próxima etapa; o primeiro administrador é criado pelo script acima.

## Testar a integração na apresentação

1. Abra **Contato**, preencha os dados e envie a mensagem. Ela é salva em `contatos`; o painel da equipe permite consultá-la. Não há envio automático de e-mail ou WhatsApp.
2. Em **Área do cliente**, crie uma conta, faça login como cliente e abra **Solicitar orçamento**.
3. Informe os dados do equipamento e o defeito. Ao confirmar, a API grava equipamento, ordem e histórico na mesma transação. Guarde o código de rastreio.
4. Entre como equipe e abra **Ordens de serviço → Gerenciar**. Informe o diagnóstico, altere o status para `em diagnostico` e salve.
5. Adicione peças e mão de obra e gere o orçamento. Os valores são calculados no servidor e as peças são reservadas no estoque.
6. Entre como cliente, abra a ordem e veja **Diagnóstico e peças**. Aprove ou recuse o orçamento. Também é possível consultar pelo código e e-mail em **Acompanhar reparo**. Trate o código de rastreio como informação de acesso à ordem.
7. Se aprovado, o fluxo avança para `em reparo`. Pela equipe, avance para `em teste`, descreva o reparo executado, marque `pronto para retirada` e depois `entregue`. O histórico é preservado.
8. Se recusado, as peças reservadas voltam ao estoque. A equipe pode marcar `pronto para retirada` e registrar a entrega sem reparo. O sistema não deixa iniciar reparo sem aprovação.

**Cinco telas principais:** início, contato, solicitação de orçamento, acompanhamento e área de acesso/gestão. Também inclui serviços, sobre e como funciona. O painel tem clientes, equipamentos, peças, ordens e mensagens de contato.

## Arquivos para a entrega

- `database/techassistpro.sql`: banco completo com chaves e dados fictícios.
- `docs/modelagem-banco.svg`: diagrama das entidades, atributos e relacionamentos.
- `docs/MODELAGEM.md`: justificativas e ajustes da modelagem.
- `docs/API.md`: rotas, exemplos e permissões.
- `docs/SEGUNDA_ENTREGA.md`: relação com os itens solicitados pelo professor.
- `docs/KANBAN.md`: quadro de tarefas para a equipe atualizar no Trello.
- `docs/VALIDACAO.md`: verificações realizadas e limitações de teste.

Os arquivos `.env`, senhas de teste, `node_modules` e `.next` não acompanham o ZIP. As dependências são reinstaladas com `npm ci`.

## GitHub e Coolify

A versão foi preparada para copiar para o repositório do grupo. Não foi enviada para `Filips-source/TechAssistPro` nem atualizou o deploy anterior.

Crie uma branch para revisar a integração, substitua os arquivos do projeto por esta versão e teste antes de fazer merge. Preserve os arquivos `.env` somente no ambiente local/servidor. A equipe deve registrar suas próprias contribuições e tarefas; os nomes na documentação não representam commits feitos por essas pessoas.

O `docker-compose.yml` é uma opção de execução com MySQL, API e Next.js. Depois de `npm run configurar`, execute `docker compose up --build`. Ele usa volume persistente e senhas aleatórias criadas no `.env` da raiz. Não exponha o MySQL. No Coolify, configure o serviço `frontend` na porta `3000`; a API é acessada pelo Next em `/api`. O destino interno da API é configurado na compilação por `API_INTERNAL_URL`. O Compose foi preparado, mas não foi executado neste ambiente.

## Testes automatizados

Na pasta `frontend`: `npm run build`.

Na pasta `backend`, copie `.env.test.example` para `.env.test`, configure MySQL e uma chave JWT e mantenha **DB_NAME terminado em `_test`**. Esse banco é exclusivo de testes e recebe dados fictícios. Execute `npm run test:integracao`. O teste recusa nomes sem o sufixo de proteção. Não use o banco da aplicação.

A prévia online é uma demonstração visual com dados locais; o funcionamento real da API e do MySQL está neste projeto, ao executá-lo pelas instruções acima.
