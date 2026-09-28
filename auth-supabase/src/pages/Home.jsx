import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Home() {
  const { session, loading } = useAuth()

  return (
    <section className="card">
      <h1>Bem-vindo(a)!</h1>
      <p>
        Esta é a página pública da aplicação. Qualquer pessoa pode vê-la. A área
        restrita exige uma conta autenticada com Supabase Auth.
      </p>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : session ? (
        <p>
          <Link className="btn" to="/area-restrita">Acessar área restrita</Link>
        </p>
      ) : (
        <p className="actions">
          <Link className="btn" to="/cadastro">Criar conta</Link>
          <Link className="btn secondary" to="/login">Entrar</Link>
        </p>
      )}
    </section>
  )
}
