const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// 사용자 및 거래 내역 데이터를 저장할 배열
let users = [];
let transactions = [];

app.use(express.json());
app.use(cors());
app.listen(8080 ,function(){
    console.log("8080포트 실행");
});

// 회원가입 API
app.post('/signup', (req, res) => {
    const { id, password } = req.body;
    console.log("회원가입 완료! 아이디:", id, "비밀번호:", password);
    const userExists = users.find(user => user.id === id);

    if (userExists) {
        return res.status(400).json({ message: '이미 존재하는 아이디입니다다' });
    }



    users.push({ id, password });
    res.status(201).json({ message: '회원가입 완료' });
});

// 로그인 API
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const user = users.find(user => user.id === id && user.password === password);

    if (!user) {
        return res.status(401).json({ message: '없는 유저입니다' });
    }

    console.log("로그인 완료! 아이디:", id, "비밀번호:", password);
    res.status(200).json({ message: '로그인 성공', id });
});

// 거래 기록 조회 API
app.get('/transactions', (req, res) => {
    res.status(200).json(transactions);
    console.log("현재 거래 기록", transactions);
});

// 거래 기록 추가 API
app.post('/transactions', (req, res) => {
    const transaction = { ...req.body, id: transactions.length + 1 };
    transactions.push(transaction);
    console.log("거래 기록 추가 완료", transaction)
    res.status(201).json({ message: '거래 추가 성공' });
});

// 거래 기록 삭제 API
app.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = transactions.length;
    transactions = transactions.filter((_, index) => index !== Number(id));

    if (transactions.length === initialLength) {
        return res.status(404).json({ message: '삭제할 거래를 찾을 수 없습니다.' });
    }
    
    console.log("기록 삭제 완료")
    res.status(200).json({ message: '거래 삭제 성공' });
});
