import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event) {

        event.preventDefault();

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        if (password === "") {
            alert("Please enter your password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        alert("Login successful!");
    }

    return (
        <div className="auth-page">

            <div className="brand">
                <h2>Edu-Tech</h2>
                <p>Learn. Grow. Succeed.</p>
            </div>


            <div className="register-container">

                <h1>Welcome Back!</h1>

                <p className="subtitle">
                    Login to continue learning
                </p>


                <form onSubmit={handleLogin}>

                    <div className="input-group">

                        <label htmlFor="loginEmail">
                            Email
                        </label>

                        <input
                            type="email"
                            id="loginEmail"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                    </div>


                    <div className="input-group">

                        <label htmlFor="loginPassword">
                            Password
                        </label>

                        <input
                            type="password"
                            id="loginPassword"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Login
                    </button>

                </form>


                <p className="switch-page">

                    Don't have an account?

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;