import React, { useState } from "react";
import "./signup.css";
import axios from 'axios';

function Details() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [passingYear, setPassingYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Simple form validation
        if (!name || !username || !email || !password || !confirmPassword || !instituteName || !passingYear) {
            setError('Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const data = {
            name,
            email,
            username,
            password,
            instituteName,
            passingYear
        };

        setLoading(true);
        setError('');
        axios
            .post('http://localhost:8000/user/signup', data)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError('An error occurred. Please check the console for details.');
                console.log(error);
            });
    };

    return (
        <div className="maincont">
            <div className="heading">Enter your details</div>
            <div className="sub">
                Enter your details to finish creating your account
            </div>
            <div className="sign-up-container">
                <form onSubmit={handleSignUp}>
                    <label className="label">
                        <div>Name</div>
                        <input
                            name="name"
                            type="text"
                            placeholder="Tatya Vinchu"
                            className="email-input"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Username</div>
                        <input
                            name="username"
                            type="text"
                            placeholder="zapatlela"
                            className="email-input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        <div>Email Id:</div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Zapatlela@marathi.com"
                            className="email-input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Password</div>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="email-input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Confirm Password</div>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="password"
                            className="email-input"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Institute Name</div>
                        <input
                            name="instituteName"
                            type="text"
                            placeholder="NIT, Trichy"
                            className="email-input"
                            onChange={(e) => setInstituteName(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Passing Year</div>
                        <input
                            name="passingYear"
                            type="number"
                            placeholder="2025"
                            className="email-input"
                            onChange={(e) => setPassingYear(e.target.value)}
                        />
                    </label>
                    <button className="sign-up-button" type="submit">Finish</button>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Details;
