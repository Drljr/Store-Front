import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import api from '../../api/axios.js';
import './Login.css';

interface LoginFormState {
    email: string;
    password: string;
}

function Login() {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false); // New state for loading success
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await api.post('/user/login', { email, password });
            const { name, email: userEmail } = response.data;
    
            setSuccess('Login successful');
            setLoadingSuccess(true);

            // Optionally save email in localStorage
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('name', name);
    
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (err: any) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
        }
    };
    

    useEffect(() => {
        const errorTimer = setTimeout(() => {
            setError('');
        }, 1000);

        const successTimer = setTimeout(() => {
            setSuccess('');
        }, 1000);

        return () => {
            clearTimeout(errorTimer);
            clearTimeout(successTimer);
        };
    }, [error, success]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = formData;
        handleLogin(email, password);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                {loadingSuccess && ( // Render loader on login success
                    <div className="loading-screen">
                        <svg className="loader" viewBox="0 0 48 30" width="48px" height="30px">
                            {/* Loader SVG code */}
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                                <g transform="translate(9.5,19)">
                                    <circle className="loader_tire" r="9" strokeDasharray="56.549 56.549"></circle>
                                    <g className="loader_spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
                                        <circle className="loader_spokes" r="5"></circle>
                                        <circle className="loader_spokes" r="5" transform="rotate(180,0,0)"></circle>
                                    </g>
                                </g>
                                <g transform="translate(24,19)">
                                    <g className="loader_pedals-spin" strokeDasharray="25.133 25.133" strokeDashoffset="-21.991" transform="rotate(67.5,0,0)">
                                        <circle className="loader_pedals" r="4"></circle>
                                        <circle className="loader_pedals" r="4" transform="rotate(180,0,0)"></circle>
                                    </g>
                                </g>
                                <g transform="translate(38.5,19)">
                                    <circle className="loader_tire" r="9" strokeDasharray="56.549 56.549"></circle>
                                    <g className="loader_spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
                                        <circle className="loader_spokes" r="5"></circle>
                                        <circle className="loader_spokes" r="5" transform="rotate(180,0,0)"></circle>
                                    </g>
                                </g>
                                <polyline className="loader_seat" points="14 3,18 3" strokeDasharray="5 5"></polyline>
                                <polyline className="loader_body" points="16 3,24 19,9.5 19,18 8,34 7,24 19" strokeDasharray="79 79"></polyline>
                                <path className="loader_handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" strokeDasharray="10 10"></path>
                                <polyline className="loader_front" points="32.5 2,38.5 19" strokeDasharray="19 19"></polyline>
                            </g>
                        </svg>
                    </div>
                )}
                <div className='logo1'>
                    <img src={logo} alt="Company Logo" />
                </div>
                <div>
                    <div className='Login-text1'>
                        Log in to your account
                    </div>
                    <div className='Login-text2'>
                        Welcome back! Please enter your details.
                    </div>
                </div>
                <div className='input-section'>
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </div>
            <button className='btn' type="submit">Login</button>
        </form>
    );
}

export default Login;