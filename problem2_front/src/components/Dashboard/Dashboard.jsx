// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState(0);
    const [reBudget, setReBudget] = useState(0);
    const [transaction, setTransaction] = useState({ 
        date: '', 
        amount: '', 
        category: '', 
        memo: '', 
        type: 'income' 
    });
    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (!session) navigate('/');
        else fetchTransactions();
    }, [navigate]);

    useEffect(() => {
        const totalExpenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
        setReBudget(budget - totalExpenses);
    }, [transactions, budget]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/transactions');
            setTransactions(response.data);
        } catch (error) {
            alert('거래 데이터를 불러오는 데 실패했습니다.');
        }
    };

    const handleAddTransaction = async () => {
        if (!transaction.date || !transaction.amount || !transaction.category || !transaction.memo) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/transactions', transaction);
            setTransaction({ date: '', amount: '', category: '', memo: '', type: 'income' });
            fetchTransactions();
        } catch (error) {
            alert('거래 추가에 실패했습니다.');
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8080/transactions/${id}`);
                fetchTransactions();
            } catch (error) {
                alert('거래 삭제에 실패했습니다.');
            }
        }
    };

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const incomeTotal = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const pieData = {
        labels: ['수입', '수출'],
        datasets: [
            {
                data: [incomeTotal, totalExpense],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const barData = {
        labels: ['수입', '수출'],
        datasets: [
            {
                label: '금액',
                data: [incomeTotal, totalExpense],
                backgroundColor: ['#4BC0C0', '#FF6384'],
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="budget-section">
                <input
                    className="budget-input"
                    type="number"
                    placeholder="월별 예산"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                />
                <h2>남은 월별 예산: {reBudget}원</h2>
                <p className="budget-warning">
                    {totalExpense > budget && budget > 0 ? '예산이 초과되었습니다!!' : ''}
                </p>
            </div>

            <div className="transaction-form">
                <input
                    className="transaction-input"
                    type="date"
                    value={transaction.date}
                    onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
                />
                <input
                    className="transaction-input"
                    type="number"
                    placeholder="금액"
                    value={transaction.amount}
                    onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                />
                <input
                    className="transaction-input"
                    type="text"
                    placeholder="카테고리"
                    value={transaction.category}
                    onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                />
                <input
                    className="transaction-input"
                    type="text"
                    placeholder="메모"
                    value={transaction.memo}
                    onChange={(e) => setTransaction({ ...transaction, memo: e.target.value })}
                />
                <select
                    className="transaction-select"
                    value={transaction.type}
                    onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
                >
                    <option value="income">수입</option>
                    <option value="expense">지출</option>
                </select>
                <button className="transaction-button" onClick={handleAddTransaction}>추가</button>
            </div>

            <div className="transaction-list">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((t, index) => (
                        <li key={index} className="transaction-item">
                            <span>{t.date} - {t.category} - {t.type} - {t.amount}원 - {t.memo}</span>
                            <button className="transaction-delete" onClick={() => handleDeleteTransaction(t.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chart-section">
                <h3>거래 내역</h3>
                <div className="chart-container">
                    <div className="pie-chart">
                        <Pie data={pieData} />
                    </div>
                    <div className="bar-chart">
                        <Bar data={barData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;