const arrayQuiz = [
    {
        question:'Qual foi a primeira civilização a desenvolver um sistema de escrita?',
        answers:[
            {id:1, text: 'Egípcios', correct:false},
            {id:2, text: 'Sumérios', correct:true},
            {id:3, text: 'Fenícios', correct:false},
            {id:4, text: 'Chineses', correct:false}
        ]
    },
    {
        question:'Qual planeta do Sistema Solar possui o dia mais longo em comparação com a rotação em  torno do próprio eixo?',
        answers:[
            {id:1, text: 'Vênus', correct:true},
            {id:2, text: 'Júpiter', correct:false},
            {id:3, text: 'Marte', correct:false},
            {id:4, text: 'Terra', correct:false}
        ]
    },
    {
        question:'Qual é o país com maior extensão litorânea do mundo?',
        answers:[
            {id:1, text: 'Indonesia', correct:false},
            {id:2, text: 'Rússia', correct:false},
            {id:3, text: 'Canadá', correct:true},
            {id:4, text: 'Austrália', correct:false}
        ]  
    },
    {
        question:'Quem é o autor da obra O Nome da Rosa?',
        answers:[
            {id:1, text: 'José Saramago', correct:false},
            {id:2, text: 'Umberto Eco', correct:true},
            {id:3, text: 'Gabriel Garcia Marquez', correct:false},
            {id:4, text: 'Jorge Luis Borges', correct:false}
        ]  
    },
    {
        question:'O quadro “Guernica”, um dos mais famosos do século XX, foi pintado por qual artista?',
        answers:[
            {id:1, text: 'Salvador Dali', correct:false},
            {id:2, text: 'Pablo Picasso', correct:true},
            {id:3, text: 'Henri Matisse', correct:false},
            {id:4, text: 'Michelangelo', correct:false}
        ]  
    }

];
const question = document.querySelector('.question');
const btnContainer = document.querySelector('.answer-container');
const nxtBtn = document.querySelector('.nxt-btn');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtBtn.innerHTML = `Proxima pergunta`
    shuffleArray(arrayQuiz) 
    showQuestion()
};

function shuffleArray(arrayQuiz) {
    for (let i = arrayQuiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [arrayQuiz[i], arrayQuiz[j]] = [arrayQuiz[j], arrayQuiz[i]];   
    }
    return arrayQuiz;
}

function resetState(){
    nxtBtn.style.display = "none"
    while(btnContainer.firstChild){
        btnContainer.removeChild(btnContainer.firstChild)
    }
};

function showQuestion(){
    resetState()
    let currentQuestion = arrayQuiz[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    question.innerHTML = `${questionNumber}.${currentQuestion.question}`

    shuffleArray(currentQuestion.answers);

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.dataset.id = answer.id;
        button.classList.add('answers');
        button.addEventListener("click", selectAnswer);
        btnContainer.appendChild(button);
    })
};

function selectAnswer(event){
    answers = arrayQuiz[currentQuestionIndex].answers
    let correctAnswer = answers.filter((answer)=>{
        return answer.correct === true
    })[0];
    const selectedBtn = event.target;
    let isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++
    }else{
        selectedBtn.classList.add('incorrect')
    };

    Array.from(btnContainer.children).forEach((button)=>{
        button.disabled = true;
    });
    nxtBtn.style.display = 'block'

}

function nextQuestion(){
    currentQuestionIndex++
    if(currentQuestionIndex < arrayQuiz.length){
        showQuestion();
    }else{
        showScore()
    }
};

nxtBtn.addEventListener('click', () =>{
    if(currentQuestionIndex < arrayQuiz.length){
        nextQuestion()
    }else{
        startQuiz()
    }
});

function showScore(){
    resetState()
    question.innerHTML = `Você acertou ${score} de ${arrayQuiz.length}`
    nxtBtn.innerHTML = `Jogar outra vez`
    nxtBtn.style.display = 'block'
}









startQuiz()