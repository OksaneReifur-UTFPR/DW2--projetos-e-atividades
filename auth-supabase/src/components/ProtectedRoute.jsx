import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  // Enquanto verifica a sessão: não mostra conteúdo restrito nem redireciona.
  if (loading) {
    return <p className="loading" role="status">Verificando sessão...</p>
  }

  // Sem sessão: encaminha ao login (replace evita voltar para a rota protegida).
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
