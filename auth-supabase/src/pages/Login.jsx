import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function Login() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const destination = location.state?.from?.pathname || '/area-restrita'

  if (!loading && session) return <Navigate to={destination} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setError('')

    if (!email.trim() || !password) {
      setError('Preencha o e-mail e a senha.')
      return
    }

    setSubmitting(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setSubmitting(false)

    if (signInError) {
      setError(translateError(signInError.message))
      return
    }

    navigate(destination, { replace: true })
  }

  return (
    <section className="card narrow">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-mail</label>
        <input
          id="email" type="email" autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={submitting} required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password" type="password" autoComplete="current-password" value={password}
          onChange={(e) => setPassword(e.target.value)} disabled={submitting} required
        />

        {error && <p className="msg error" role="alert">{error}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </section>
  )
}

function translateError(message) {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) return 'E-mail ou senha incorretos. Tente novamente.'
  if (m.includes('email not confirmed')) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Aguarde um pouco e tente novamente.'
  return 'Não foi possível entrar: ' + message
}
