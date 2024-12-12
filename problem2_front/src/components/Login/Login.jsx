import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', { id, password });
            alert(response.data.message);
            localStorage.setItem('session', response.data.id);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || '로그인 실패');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">로그인 후 이용해주세요</h2>
            <input
                className="login-input"
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>로그인</button>
            <button className="login-button" onClick={() => navigate('/signup')}>회원가입</button>
        </div>
    );
};

export default Login;