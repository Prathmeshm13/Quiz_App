import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (!formData.email || !formData.password) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        axios.post('http://localhost:8000/user/login', formData, {
            withCredentials: false
        })
        .then((response) => {
            setLoading(false);
            navigate('/quiz/create-quiz');
        })
        .catch((error) => {
            setLoading(false);
            setError('An error occurred. Please check the console for details.');
            console.log(error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="maincont">
            <div className="heading">Sign In</div>
            <div className="sub">Enter your details to proceed further</div>
            <div className="sign-up-container">
                <form onSubmit={handleSubmit}>
                    <label className="label">
                        <div>Email Id:</div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Zapatlela@marathi.com"
                            className="email-input"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <div className="label">Password</div>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="email-input"
                            onChange={handleChange}
                        />
                    </label>
                    {error && <div className="error">{error}</div>}
                    <button className="sign-up-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
