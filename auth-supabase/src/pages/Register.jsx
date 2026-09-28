import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function Register() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  if (!loading && session) return <Navigate to="/area-restrita" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setError('')
    setInfo('')

    if (!email.trim() || !password) {
      setError('Preencha o e-mail e a senha.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setSubmitting(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })
    setSubmitting(false)

    if (signUpError) {
      setError(translateError(signUpError.message))
      return
    }

    // E-mail já cadastrado (com confirmação ativa, o Supabase retorna "identities" vazio).
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('Este e-mail já está cadastrado. Tente entrar.')
      return
    }

    if (data.session) {
      // Confirmação de e-mail desativada: já entra autenticado.
      navigate('/area-restrita', { replace: true })
    } else {
      // Confirmação de e-mail ativada.
      setInfo('Conta criada! Enviamos um link de confirmação para o seu e-mail. Confirme e depois faça login.')
      setPassword('')
    }
  }

  return (
    <section className="card narrow">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-mail</label>
        <input
          id="email" type="email" autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={submitting} required
        />

        <label htmlFor="password">Senha (mín. 6 caracteres)</label>
        <input
          id="password" type="password" autoComplete="new-password" value={password}
          onChange={(e) => setPassword(e.target.value)} disabled={submitting} required
        />

        {error && <p className="msg error" role="alert">{error}</p>}
        {info && <p className="msg success" role="status">{info}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p>Já tem conta? <Link to="/login">Entrar</Link></p>
    </section>
  )
}

function translateError(message) {
  const m = message.toLowerCase()
  if (m.includes('already registered')) return 'Este e-mail já está cadastrado.'
  if (m.includes('invalid') && m.includes('email')) return 'E-mail inválido.'
  if (m.includes('password')) return 'Senha inválida. Use pelo menos 6 caracteres.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Aguarde um pouco e tente novamente.'
  return 'Não foi possível criar a conta: ' + message
}
