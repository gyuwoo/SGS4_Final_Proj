// import React, { useState } from "react";
// import './Login.css'

// const Login = () => {

//     const [id, setId] = useState('');
//     const [pw, setPw] = useState('');
//     const [checkPw, setCheckPw] = useState('');
//     const [newPw, setNewPw] = useState('');
//     const [loginMessage, setLoginMessage] = useState("");
//     const [pwMessage, setPwMessage] = useState("");
//     const [userInfo, setUserInfo] = useState("");
    

//     // 로그인 함수
//     const handleLogin = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/login/${id}/${pw}`);
//             const data = await response.json();
//             if (data.ok) {
//                 alert("로그인 성공");
//                 setUserInfo(data.user);
//                 setLoginMessage("로그인에 성공하셨습니다.");
//             } else {
//                 alert("로그인 실패");
//                 setLoginMessage("로그인에 실패하셨습니다.");
//                 setUserInfo("");
//             }
//         } catch (error) {
//             console.error('로그인 실패 오류:', error);
//         }
//     };

//     // 비밀번호 변경 함수
//     const handleChangePw = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/changepw/${id}/${newPw}`);
//             const data = await response.json();
//             if (data.ok && userInfo.pw === pw) {
//                 setPwMessage("비밀번호 변경 성공.");
//                 alert("비밀번호 변경 성공.");
//                 window.location.reload();
//             } else {
//                 setPwMessage("비밀번호 변경 실패.");
//                 alert("비밀번호 변경 실패.");
//                 setNewPw('');
//             }
//         } catch (error) {
//             console.error('비밀번호 변경 오류:', error);
//         }
//     };

//     // 로그아웃 함수
//     const handleLogout = () => {
//         alert("로그아웃 되었습니다.");
//         setUserInfo("");
//         setId('');
//         setPw('');
//         setCheckPw('');
//         setNewPw('');
//         setLoginMessage("");
//         setPwMessage("");
//     };

//     return (
//         <div className="container">
//             <h1>로그인 및 정보 확인</h1>
//             <label>ID</label>
//             <input
//                 type="text"
//                 value={id}
//                 onChange={(e) => { setId(e.target.value); }}
//             />

//             <label>PW</label>
//             <input
//                 type="password"
//                 value={pw}
//                 onChange={(e) => { setPw(e.target.value); }}
//             />
//             <button onClick={handleLogin}>로그인</button>
//             <p>{loginMessage}</p>

//             <h1>개인정보</h1>
//                     <h2>이름: {userInfo.name}</h2>
//                     <h2>나이: {userInfo.age}</h2>

//             {/* 로그인 성공 시 로그아웃 버튼 표시 */}
//             {userInfo && (
//                 <>
//                     {/* 로그아웃 버튼 */}
//                     <button onClick={handleLogout}>로그아웃</button>
                    
//                 </>
//             )}

//             <label>1차 비밀번호</label>
//             <input
//                 type="password"
//                 value={checkPw}
//                 onChange={(e) => { setCheckPw(e.target.value); }}
//             />

//             {userInfo.pw === checkPw ? (
//                 <p>비밀번호가 일치합니다.</p>
//             ) : (
//                 <p>비밀번호가 일치하지 않습니다.</p>
//             )}

//             <label>2차 비밀번호</label>
//             <input
//                 type="password"
//                 value={newPw}
//                 onChange={(e) => { setNewPw(e.target.value); }}
//             />
//             <button onClick={handleChangePw}>비밀번호 변경</button>
//             <p>{pwMessage}</p>
//         </div>
//     );
// };

// export default Login;