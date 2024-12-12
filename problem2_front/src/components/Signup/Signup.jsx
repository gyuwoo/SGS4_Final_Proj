import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (id.length < 1) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (password.length < 1) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/signup', { id, password });
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || '회원가입 실패');
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">회원가입</h2>
            <input
                className="signup-input"
                type="text"
                placeholder="아이디 입력"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="signup-input"
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="signup-input"
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="signup-button" onClick={handleSignup}>회원가입</button>
        </div>
    );
}

export default Signup;