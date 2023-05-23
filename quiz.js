const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "< Js >", correct: false},
            {text: "< JavaScript >", correct: false},
            {text: "< Script >", correct: true},
            {text: "< Scripting >", correct: false},
        ]
    },
    {
        question: "How do you write <b>Hello World</b> in an alert box?",
        answers: [
            {text: "alertbox('Hello World);", correct: false},
            {text: "alert('Hello World');", correct: true},
            {text: "smsBox('Hello + World');", correct: false},
            {text: "smsalert('Hello world');", correct: false},
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "myFunc()", correct: false},
            {text: "function:myFunction()", correct: false},
            {text: "function myfunc()", correct: true},
            {text: "function myFunction", correct: false},
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            {text: "myFunction()", correct: true},
            {text: "callMyFunction", correct: false},
            {text: "myFunction", correct: false},
            {text: "call = myFunction()", correct: false},
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            {text: "if i = 5", correct: false},
            {text: "if i = 5 then", correct: false},
            {text: "if (i == 5)", correct: true},
            {text: "if i == 5 then", correct: false},
        ]
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [
            {text: "if (i < > 5)", correct: false},
            {text: "if (i != 5)", correct: true},
            {text: "if (i not 5)", correct: false},
            {text: "if i =! 5 then", correct: false},
        ]
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: [
            {text: "Math(7.25)", correct: false},
            {text: "Round(7.25)", correct: false},
            {text: "Math.round(7.25)", correct: true},
            {text: "Math.rnd(7.25)", correct: false},
        ]
    },
    {
        question: "JavaScript case is sensitive",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},
        ]
    },{
        question: "JavaScript is same as Java",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            {text: "The < body > section", correct: false},
            {text: "The < head > section", correct: false},
            {text: "Both are correct", correct: true},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions()

}

function showQuestions(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAns);
    })
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAns(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add ("correct");
        score++;
    }else{
        selectBtn.classList.add ("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        };
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetstate();
    if(score >= 6){
        questionElement.innerHTML = `Congratulation ! <br> You Scored ${score} Out Of ${questions.length} !`;
    }else{
        questionElement.innerHTML = `Oops ! <br> You Scored ${score} Out Of ${questions.length} !`;
    }
    
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
