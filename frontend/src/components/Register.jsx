import { useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Attempting registration...');
            const response = await api.post('/auth/register', { username, password });
            console.log('Registration response:', response.data);
            setSuccess(true);
            setError('');
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                setError(error.response.data?.message || `Server error: ${error.response.status}`);
            } else if (error.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError(`Error: ${error.message}`);
            }
        }
    };

    if (success) {
        return (
            <div className="register-container">
                <h2>Registration Successful!</h2>
                <p>You can now <Link to="/">login</Link> with your credentials.</p>
            </div>
        );
    }

    return (
        <div className="register-container">
            <h2>Create Admin Account</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
};

export default Register;