let roomId = null;
let player = null;
let questions = [];
let opponentQuestions = [];
let currentIndex = 0;
let scoreA = 0;
let scoreB = 0;

let timer;
let timeLeft = 15;

// ------------------
// 1. CRÉATION / JOIN
// ------------------

function createRoom() {
    roomId = Math.random().toString(36).substring(2, 8);

    db.ref("rooms/" + roomId).set({
        A: { questions: [], score: 0 },
        B: { questions: [], score: 0 },
        state: "waiting"
    });

    player = "A";
    document.getElementById("home").style.display = "none";
    document.getElementById("setup").style.display = "block";
    document.getElementById("playerLabel").textContent = "Vous êtes le Joueur A";
}

function joinRoom() {
    const input = document.getElementById("roomInput").value;

    db.ref("rooms/" + input).once("value", snap => {
        if (snap.exists()) {
            roomId = input;
            player = "B";

            document.getElementById("home").style.display = "none";
            document.getElementById("setup").style.display = "block";
            document.getElementById("playerLabel").textContent = "Vous êtes le Joueur B";
        }
    });
}

// ------------------
// 2. AJOUT QUESTIONS
// ------------------

function addQuestion() {
    const q = document.getElementById("qInput").value;
    const a = document.getElementById("aInput").value;

    questions.push({ question: q, answer: a });

    document.getElementById("questionList").innerHTML += `<li>${q}</li>`;
}

function finishQuestions() {
    db.ref(`rooms/${roomId}/${player}/questions`).set(questions);

    db.ref(`rooms/${roomId}`).update({ state: "ready" });

    db.ref(`rooms/${roomId}`).on("value", snap => {
        const data = snap.val();

        if (data.A.questions && data.B.questions) {
            opponentQuestions = player === "A" ? data.B.questions : data.A.questions;
            startGame();
        }
    });
}

// ------------------
// 3. JEU
// ------------------

function startGame() {
    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    showQuestion();
}

function showQuestion() {
    if (currentIndex >= opponentQuestions.length) {
        endGame();
        return;
    }

    document.getElementById("turnLabel").textContent =
        `Question ${currentIndex + 1} / ${opponentQuestions.length}`;

    document.getElementById("question").textContent =
        opponentQuestions[currentIndex].question;

    startTimer();
}

function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").textContent = `Temps : ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Temps : ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer("");
        }
    }, 1000);
}

function submitAnswer() {
    clearInterval(timer);

    const userAnswer = document.getElementById("answerInput").value;
    const correct = opponentQuestions[currentIndex].answer;

    if (userAnswer.toLowerCase() === correct.toLowerCase()) {
        if (player === "A") scoreA++;
        else scoreB++;
    }

    currentIndex++;
    document.getElementById("answerInput").value = "";
    showQuestion();
}

// ------------------
// 4. FIN + EXPORT
// ------------------

function endGame() {
    db.ref(`rooms/${roomId}/A/score`).set(scoreA);
    db.ref(`rooms/${roomId}/B/score`).set(scoreB);

    document.getElementById("game").style.display = "none";
    document.getElementById("results").style.display = "block";

    document.getElementById("scoreA").textContent = `Score Joueur A : ${scoreA}`;
    document.getElementById("scoreB").textContent = `Score Joueur B : ${scoreB}`;
}

function exportResults() {
    const data = [
        ["Joueur", "Score"],
        ["A", scoreA],
        ["B", scoreB]
    ];

    let csv = "";
    data.forEach(row => csv += row.join(",") + "\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resultats_quiz.csv";
    a.click();
}

db.ref("test").set({
    message: "Hello Diane !"
});

