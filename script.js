// Firebase SDK 모듈 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } 
    from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase 설정 정보
const firebaseConfig = {
    apiKey: "AIzaSyCbXge62H9ofOGzuqITi3193_q0-icaQHo",
    authDomain: "new-chatbot-a7c80.firebaseapp.com",
    projectId: "new-chatbot-a7c80",
    storageBucket: "new-chatbot-a7c80.firebasestorage.app",
    messagingSenderId: "659916039324",
    appId: "1:659916039324:web:2e99a268493e79ffbb7959",
    measurementId: "G-PB9KL9PWM2"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 메시지 전송 함수
window.sendMessage = async function () {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message) {
        try {
            await addDoc(collection(db, "messages"), {
                text: message,
                timestamp: serverTimestamp()
            });
            messageInput.value = ""; // 입력창 비우기
        } catch (error) {
            console.error("메시지 전송 오류:", error);
        }
    }
};

// 실시간 데이터 업데이트
const messagesList = document.getElementById("messagesList");
const q = query(collection(db, "messages"), orderBy("timestamp"));

onSnapshot(q, (snapshot) => {
    messagesList.innerHTML = ""; // 기존 리스트 초기화

    snapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        messagesList.appendChild(li);
    });
});
