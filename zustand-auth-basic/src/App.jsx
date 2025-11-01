import { useAuthStore } from './store/useAuthStore'

function App() {
  const { user, login, logout } = useAuthStore()

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Zustand Auth</h2>

      {user ? (
        <>
          <p>Welcome, <b>{user.name}</b> 👋</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>No user logged in.</p>
          <button onClick={() => login({ name: 'Anuj', email: 'anuj@example.com' })}>
            Login
          </button>
        </>
      )}
    </div>
  )
}

export default App
