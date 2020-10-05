
//------Functions------------//

function buildQuiz() { 
                                                                             // will run immediately
    const output = [];              // variable to store the HTML output
    
    myQuestions.forEach((currentQuestion, questionNumber) => {           //for each question...The forEach() method calls a function once for each element in an array, in order.
    
       const answers =[];                                //variable to store the list of possible answers

       
        for(letter in currentQuestion.answers){          // and for each available answer...The for/in statement loops through the properties of an object.
                                                        // ...add an HTML checkbox/radiobutton
            answers.push(
                '<label>'+
                '<input type="checkbox" name="question"'+ questionNumber + 'value=' + letter + letter + ':' + currentQuestion
                .answers[letter]+'</label>'
            )
        }
        
        output.push(                                  // add this question and its answers to the output
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
        );
     });         
    
   quizContainer.innerHTML = output.join('');                                             // finally combine our output list into one string of HTML and put it on the page
}


function showResults() {}               // runs when user clicks submit



//------Variables-------//

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
let myQuestions = [];

//-------main-----------//  

document.addEventListener("DOMContentLoaded", function(){

    let start_quiz = document.getElementById("btn_start_quiz");
    start_quiz.addEventListener("click", async function(e) {

        await fetch('https://quizapi.io/api/v1/questions?apiKey=DzqPPQrygBSBX2YJQ10caUO91MtOWmACoFhEsKYg&limit=5')
            .then(response => response.json())
            .then(data => {myQuestions = Array.from(data)});  
    
            buildQuiz(); //display quiz
        
    
    });

    
});
                     
//on submit, show results
submitButton.addEventListener("click", showResults);


