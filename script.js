const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
    },
    {
        question: "Which flies a green, white, and orange (in that order) tricolor flag? ",
        options: ["Ireland", "Ivory Coast", "Italy", "India"],
        correctAnswer: "Ireland",
    },
    {
        question: "Who is generally considered the inventor of the motor car? ",
        options: ["Henry Ford", "Karl Benz", "Henry M. Leland", "Wright Brothers"],
        correctAnswer: "Karl Benz",
    },
    {
        question: "Which of the following languages has the longest alphabet?",
        options: ["Greek ", "Russian", "Arabic", "Hindi"],
        correctAnswer: "Russian",
    }
];

let currentQuestion = 0;
let score = 0;
const questionTime = 15;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");

function displayQuestion() {
    clearTimeout(timer); // Clear previous timer

    const current = questions[currentQuestion];
    questionElement.textContent = current.question;

    questionElement.parentElement.classList.add("show");
    optionsElement.innerHTML = "";
    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    });

    scoreElement.textContent = `Score: ${score}`;
    feedbackElement.textContent = "";

    // Start the timer
    let timeLeft = questionTime;
    const timerElement = document.createElement("p");
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    optionsElement.appendChild(timerElement);

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(""); // Automatically check the answer when time is up
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    const current = questions[currentQuestion];

    if (selectedAnswer === current.correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
    }
     else {
        feedbackElement.textContent = "Incorrect!";
    }

    nextButton.disabled = false;
    document.querySelectorAll(".option").forEach((button) => {
        button.disabled = true;
    });
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        nextButton.disabled = true;
        document.querySelectorAll(".option").forEach((button) => {
            button.disabled = false;
        });
    } else {
        questionElement.textContent = "Quiz Completed!";
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        feedbackElement.textContent = `Final Score: ${score} out of ${questions.length}`;
        scoreElement.textContent = `Score: ${score}`;

        // Show the "Restart" button after completing the quiz
        const restartButton = document.getElementById("restart-button");
        restartButton.style.display = "inline-block";
    }
});

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    nextButton.style.display = "inline-block";
    restartButton.style.display = "none"; // Show the restart button after completing the quiz
});

// Automatically move to the next question when the timer reaches 0
function startNextQuestionTimer() {
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
            startNextQuestionTimer(); // Start the timer for the next question
        } else {
            questionElement.textContent = "Quiz Completed!";
            optionsElement.innerHTML = "";
            nextButton.style.display = "none";
            feedbackElement.textContent = `Final Score: ${score} out of ${questions.length}`;
            scoreElement.textContent = `Score: ${score}`;

            // Show the "Restart" button after completing the quiz
            restartButton.style.display = "inline-block";
        }
    }, (questionTime + 1) * 1000); // Add 1 second to account for the last second display
}

displayQuestion();
startNextQuestionTimer();
