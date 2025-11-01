import React, {useState} from "react";
import useAuthStore from "../store/useAuthStore";

export const LoginForm = () => {
    const {user, login, logout, loading, error} = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(user) {
        return (
            <div>
                <h2>Welcome, {user.email}!</h2>
                <button onClick={logout} disabled={loading}>
                    {loading ? "Logging out..." : "Logout"}
                </button>
                {error && <p style={{color: 'red'}}>Error: {error}</p>}
            </div>
        );
    }
    return (
        <div>
            <h3>Login</h3>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
                onClick={() => login(email, password)}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
        </div>
    )
}