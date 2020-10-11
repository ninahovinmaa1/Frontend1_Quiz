
//------Functions------------//

function buildQuiz() {     // will run immediately

    const output = [];              // variable to store the HTML output
    
    myQuestions.forEach((currentQuestion, questionNumber) => {           //for each question...The forEach() method calls a function once for each element in an array, in order.
    
       const answers =[];                                //variable to store the list of possible answers
       
        for(letter in currentQuestion.answers){          // and for each available answer...The for/in statement loops through the properties of an object.
                                                        // ...add an HTML checkbox/radiobutton
            answers.push(

                '<label><input type="checkbox" name="question'+ questionNumber +'"'+ ' value="'+ letter +'"><br>'+ letter + ':' + currentQuestion.answers[letter]+'</label>'
            )
        }
        
        output.push(                                  // add this question and its answers to the output
        '<div class="question">' + currentQuestion.question + '<div>' + '<div class="answers">' + answers.join()+'</div>'
        );
     });         
    
   quizContainer.innerHTML = output.join('');  // Combine utput list into one string of HTML and put it on the page
}

 // runs when user clicks submit
function showResults() {

    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // counter of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswers = (answerContainer.querySelectorAll(selector) ||{});  //  Trying to get multiple correct answers with querySelectorAll->Nodelist-array, undefined. Check use of .value for arrayen. Expected answer_a TODO
        const correctAnswers = currentQuestion.correct_answers;

        //Helper function. Gets correct answer by finding the key to value true. Key example: answer_b_correct, Value example: "true"
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }
          const correctAnswer = getKeyByValue(correctAnswers,"true");
          console.log(correctAnswer)  //answer_i_correct
          
        //for (let userAnswer of userAnswers) {
            // if answer is correct
          //  if(userAnswer.value === currentQuestion.correctAnswer){  //answer_c === "answer_c_correct":"true" //str.includes(answer_"letter etc + true)
                // add to the number of correct answers
          //      numCorrect++;
           // }
       // }   
    })
};              



//------Variables-------//

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const start_quiz = document.getElementById("btn_start_quiz");
const submit_quiz = document.getElementById("btn-submit-quiz");
let myQuestions = [];

//-------main-----------//  

document.addEventListener("DOMContentLoaded", function(){

    start_quiz.addEventListener("click", async function(e) {

        await fetch('https://quizapi.io/api/v1/questions?apiKey=DzqPPQrygBSBX2YJQ10caUO91MtOWmACoFhEsKYg&limit=10')
            .then(response => response.json())
            .then(data => {myQuestions = Array.from(data)});  
        
            buildQuiz(); //display quiz    
    });    

    submit_quiz.addEventListener("click", function(e) {
        showResults();

    })
});
                     




