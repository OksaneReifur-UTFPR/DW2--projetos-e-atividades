# Trabalho Autenticação – React + Supabase Auth

Aplicação React (Vite) com cadastro, login, página pública e página restrita usando **Supabase Auth**.

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo de exemplo e preencha com os dados do seu projeto Supabase:
   ```bash
   cp .env.example .env
   ```
3. Inicie o projeto:
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `VITE_SUPABASE_URL` | URL do projeto (Project Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Chave pública `anon`/`publishable` (Project Settings → API) |

Nunca use a chave `service_role` no front-end. O `.env` está no `.gitignore`.

## Configurações do Supabase

1. Crie um projeto em https://supabase.com.
2. **Authentication → Providers → Email**: habilitado.
3. **Confirmação de e-mail: DESATIVADA** (Authentication → Sign In / Providers → Email → desligar "Confirm email"). Decisão tomada para simplificar a demonstração: o usuário entra logo após o cadastro.
   - Se você mantiver a confirmação ativada, a aplicação também funciona: após o cadastro ela informa que é preciso confirmar o e-mail e o login só é aceito depois da confirmação. Nesse caso configure **Authentication → URL Configuration → Site URL** como `http://localhost:5173`.
4. Não é necessário criar tabelas.

## Como a sessão é controlada

- O `supabase-js` guarda a sessão (JWT + refresh token) no `localStorage` e a renova automaticamente.
- O `AuthProvider` (`src/AuthContext.jsx`) chama `supabase.auth.getSession()` ao carregar a aplicação e escuta `onAuthStateChange` para reagir a login/logout. Enquanto isso, `loading = true`.
- Por isso, ao recarregar a página com sessão válida, o usuário continua autenticado.

## Como a autorização é aplicada

O componente `ProtectedRoute` envolve a rota `/area-restrita`:
- `loading` → mostra "Verificando sessão..." (não exibe o conteúdo nem redireciona antes da hora);
- sem sessão → `<Navigate to="/login" replace />`;
- com sessão → renderiza a página.

No logout, `supabase.auth.signOut()` limpa a sessão e o usuário é levado a `/login` com `replace`. Como o estado de sessão passa a ser nulo, o botão "voltar", o recarregamento e a digitação direta da URL não exibem o conteúdo restrito.

**Observação:** o controle de rotas protege a interface. Como a página restrita só mostra o e-mail do próprio usuário e não há API/tabelas privadas, isso basta aqui. Se houvesse dados protegidos, seria necessário aplicar regras no servidor/banco (ex.: Row Level Security do Supabase).

## Autenticação x Autorização

- **Autenticação**: verificar *quem* é a pessoa. Aqui é feita pelo Supabase Auth com e-mail e senha (`signUp` e `signInWithPassword`), que resulta em uma sessão.
- **Autorização**: decidir *o que* a pessoa pode acessar. Aqui a regra é: a página pública é livre; a restrita exige sessão válida, aplicada pelo `ProtectedRoute`. Todos os usuários autenticados têm a mesma permissão.

## Estrutura

```
src/
  AuthContext.jsx         # sessão global + loading
  supabaseClient.js       # cliente Supabase
  App.jsx                 # rotas
  components/             # Layout e ProtectedRoute
  pages/                  # Home, Register, Login, Dashboard
```

## Referências

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase JS – signUp / signInWithPassword / getSession / onAuthStateChange: https://supabase.com/docs/reference/javascript/auth-signup
- React Router (rotas e `Navigate`): https://reactrouter.com
- Vite – variáveis de ambiente: https://vite.dev/guide/env-and-mode
- React: https://react.dev
