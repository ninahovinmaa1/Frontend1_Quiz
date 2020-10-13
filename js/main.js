
//------Functions------------//

function buildQuiz() {     // will run immediately

    const output = [];              // variable to store the HTML output
    
    myQuestions.forEach((currentQuestion, questionNumber) => {           //for each question...The forEach() method calls a function once for each element in an array, in order.
    
       const answers =[];                                //variable to store the list of possible answers
       
        for(letter in currentQuestion.answers){          // and for each available answer...The for/in statement loops through the properties of an object.
                                                        // ...add an HTML checkbox/radiobutton
            answers.push(

                '<label><input type="checkbox" name="question'+ questionNumber +'"'+ ' value="'+ letter +'">'+ letter + ':' + currentQuestion.answers[letter]+'</label>'
            )
        }
        
        output.push(                                  // add this question and its answers to the output
        '<div class="question">' + currentQuestion.question + '</div>' + '<div class="answers">' + answers.join()+'</div>'
        );
     });         
    
   quizContainer.innerHTML = output.join('');  // Combine utput list into one string of HTML and put it on the page
}

 // runs when user clicks submit
function showResults() {

    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // counter of user's answers
    let numCorrectAnswers = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswers = (answerContainer.querySelectorAll(selector) ||{}); //for each question, creates a Nodelist of user's answers(object)
        const correctAnswers = currentQuestion.correct_answers;

        //Helper function. Gets correct answer by finding the key to value true. Key example: answer_b_correct, Value example: "true"
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }
        
        const correctAnswer = getKeyByValue(correctAnswers,"true"); // key: answer_i_correct, value: "true"
        
        //for each userAnswer from all userAnswers for a specific question...
        for (let userAnswer of userAnswers) {
            // if answer is correct... (checked if user answer answer_x is included in the string correctAnswer answer_x_correct)
            if(correctAnswer.includes(userAnswer.value)){ 
                // if true, increase the number of correct answers
                numCorrectAnswers.push(1);
            }
       }   
    })
    // show number of correct answers out of total
    let sumCorrectAnswers = numCorrectAnswers.reduce((acc, currentValue, currIndex, array) => { //reduces numCorrectAnswers from [1,1,1,1] to 4.
        return acc + currentValue}, 0)


    resultsContainer.innerHTML = `${sumCorrectAnswers} out of ${myQuestions.length}`; //show results in HTML
};    

function askStartANewGame() {
    //<a href="quiz.html" id="start-quiz-link">Starta quiz!</a>
    let newA = document.createElement("a");
    resultsContainer.appendChild(newA).setAttribute("id", "link");
    let refToA = document.getElementById("link");
    refToA.setAttribute("href", "index.html");
    refToA.innerHTML = "Click here to start a new quiz!"

}



//------Variables-------//

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submit_quiz = document.getElementById("btn-submit-quiz");
let myQuestions = [];

//-------MAIN QUIZ-----------//  

document.addEventListener("DOMContentLoaded", async function(){


    await fetch('https://quizapi.io/api/v1/questions?apiKey=DzqPPQrygBSBX2YJQ10caUO91MtOWmACoFhEsKYg&limit=10')
        .then(response => response.json())
        .then(data => {
            myQuestions = Array.from(data);
        });  
    
    buildQuiz(); //display quiz        

    submit_quiz.addEventListener("click", function(e) { //submit quiz, show results and provide a link to start a new game
        showResults();
        askStartANewGame();
    });
});
                     




