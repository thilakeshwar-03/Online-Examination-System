
const questions = [
    {
        question: "1. Which language is used for Android development?",
        options: ["HTML", "Java", "CSS", "SQL"],
        answer: 1
    },
    {
        question: "2. Which keyword creates an object in Java?",
        options: ["class", "new", "static", "void"],
        answer: 1
    },
    {
        question: "3. What is the size of int in Java?",
        options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"],
        answer: 1
    },
    {
        question: "4. Which method is the starting point of Java?",
        options: ["start()", "run()", "main()", "init()"],
        answer: 2
    },
    {
        question: "5. Which symbol ends a Java statement?",
        options: [".", ",", ":", ";"],
        answer: 3
    }
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(-1);
let time = 120;
let timerInterval;

function login() {
    let name = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (name === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    document.getElementById("login").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("welcome").innerText = "Welcome, " + name;
}

function startExam() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("exam").classList.remove("hidden");

    showQuestion();

    timerInterval = setInterval(function() {
        time--;

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").innerText =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (time <= 0) {
            submitExam();
        }
    }, 1000);
}

function showQuestion() {
    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";

    q.options.forEach(function(option, index) {
        optionsHTML += `
            <label>
                <input type="radio" name="answer"
                value="${index}"
                ${answers[currentQuestion] === index ? "checked" : ""}
                onchange="saveAnswer(${index})">
                ${option}
            </label>
        `;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function saveAnswer(index) {
    answers[currentQuestion] = index;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function submitExam() {
    clearInterval(timerInterval);

    let score = 0;

    questions.forEach(function(q, index) {
        if (answers[index] === q.answer) {
            score++;
        }
    });

    document.getElementById("exam").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("score").innerText =
        "Your Score: " + score + " / " + questions.length;

    document.getElementById("message").innerText =
        score >= 3 ? "Congratulations! Exam completed." :
        "Keep practicing. Better luck next time!";
}
