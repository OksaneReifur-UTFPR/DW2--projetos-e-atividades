import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Layout() {
  const { session, loading } = useAuth()

  return (
    <>
      <header className="header">
        <Link to="/" className="brand">Trabalho Autenticação</Link>
        <nav>
          <Link to="/">Início</Link>
          {!loading && session && <Link to="/area-restrita">Área restrita</Link>}
          {!loading && !session && (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/cadastro">Cadastrar</Link>
            </>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
