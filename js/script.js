//measurementId: "G-PB9KL9PWM2"
// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyCbXge62H9ofOGzuqITi3193_q0-icaQHo",
    authDomain: "new-chatbot-a7c80.firebaseapp.com",
    projectId: "new-chatbot-a7c80",
    storageBucket: "new-chatbot-a7c80.firebasestorage.app",
    messagingSenderId: "659916039324",
    appId: "1:659916039324:web:2e99a268493e79ffbb7959"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 메시지 전송 함수
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    
    if (message) {
        db.collection("messages").add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = ""; // 입력창 비우기
    }
}

// 실시간 데이터 업데이트
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const messagesList = document.getElementById("messagesList");
    messagesList.innerHTML = ""; // 기존 리스트 초기화

    snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        messagesList.appendChild(li);
    });
});
