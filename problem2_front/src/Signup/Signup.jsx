// import React, { useState } from 'react';
// import './Signup.css';

// const Signup = () => {
//     const [id, setId] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordCheck, setPasswordCheck] = useState('');
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [idMessage, setIdMessage] = useState('');
//     const [passwordMessage, setPasswordMessage] = useState('');
//     const [nameMessage, setNameMessage] = useState('');
//     const [ageMessage, setAgeMessage] = useState('');

//     // ID 중복 체크 함수
//     const handleIdCheck = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/idcheck/${id}`);
//             const data = await response.json();
//             if (data.ok) {
//             setIdMessage('사용가능한 아이디입니다.');
//             } else {
//             setIdMessage('존재하는 아이디 입니다.');
//             }
//         } catch (error) {
//             console.error('ID 중복 체크 오류:', error);
//         }
//     };

//     // 비밀번호 일치 확인 함수
//     const handlePassword = (e) => {
//         setPassword(e.target.value);
//         if (e.target.value !== passwordCheck) {
//             setPasswordMessage('비밀번호가 일치하지 않습니다.');
//         } else {
//             setPasswordMessage('비밀번호가 일치합니다.');
//         }
//     };

//     const handlePasswordCheck = (e) => {
//         setPasswordCheck(e.target.value);
//         if (password !== e.target.value) {
//             setPasswordMessage('비밀번호가 일치하지 않습니다.');
//         } else {
//             setPasswordMessage('비밀번호가 일치합니다.');
//         }
//     };

//     // 회원가입 함수
//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         // 이름 검사
//         if (name.length < 3) {
//             setNameMessage('3글자 이상으로 입력해주세요.');
//         } else {
//             setNameMessage('3글자 이상입니다.');
//         }

//         // 나이 검사
//         if (age < 20 || age > 130) {
//             setAgeMessage('20살 이상 130살 미만으로 입력해주세요.');
//         } else {
//             setAgeMessage('적정 나이');
//         }

//         // 모든 조건이 충족되면 서버로 회원가입 요청 보내기
//         if (name.length >= 3 && age >= 20 && age < 130 && password === passwordCheck) {
//             try {
//             const response = await fetch(`http://localhost:8080/signup/${id}/${password}/${name}/${age}`);
//             const data = await response.json();
//             if (data.ok) {
//                 alert('회원가입 성공!');
//                 window.location.reload();
//             } else {
//                 alert('회원가입 실패: 이미 존재하는 아이디입니다.');
//             }
//             } catch (error) {
//             console.error('회원가입 오류:', error);
//             }
//         }
//     };

//     return (
//         <div className="container">
//             <h1>회원가입</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>ID</label>
//                 <input
//                     type="text"
//                     value={id}
//                     onChange={(e) => {
//                         setId(e.target.value)
//                     }}
//                 />
//                 <button onClick={handleIdCheck}>
//                     중복체크
//                 </button>
//                 <p>{idMessage}</p>

//                 <label>PassWord</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={handlePassword}
//                 />

//                 <label>PassWord Check</label>
//                 <input
//                     type="password"
//                     value={passwordCheck}
//                     onChange={handlePasswordCheck}
//                 />
//                 <p>{passwordMessage}</p>

//                 <label>이름</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => {
//                         setName(e.target.value)
//                     }}
//                 />
//                 <p>{nameMessage}</p>

//                 <label>나이</label>
//                 <input
//                     type="number"
//                     value={age}
//                     onChange={(e) => {
//                         setAge(e.target.value)
//                     }}
//                 />
//                 <p>{ageMessage}</p>
//                 <button type="submit">회원가입</button>
//             </form>
//         </div>
//     );
// }

// export default Signup;