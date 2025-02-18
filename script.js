// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
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
const db = getFirestore(app);  // Firestore 가져오기

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
            console.log("메시지 전송 성공!");
            messageInput.value = ""; // 입력창 비우기
        } catch (error) {
            console.error("메시지 전송 오류:", error);
        }
    }
};
