import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const [error, setError] = useState('')

  async function handleLogout() {
    setLeaving(true)
    setError('')
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError('Não foi possível sair: ' + signOutError.message)
      setLeaving(false)
      return
    }
    // replace: o botão "voltar" não retorna à página restrita.
    navigate('/login', { replace: true })
  }

  return (
    <section className="card">
      <h1>Área restrita</h1>
      <p>Você está conectado como: <strong>{user?.email}</strong></p>
      {error && <p className="msg error" role="alert">{error}</p>}
      <button className="btn" onClick={handleLogout} disabled={leaving}>
        {leaving ? 'Saindo...' : 'Sair'}
      </button>
    </section>
  )
}
