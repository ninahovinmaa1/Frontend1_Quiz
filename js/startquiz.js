
//---------MAIN START QUIZ-------------//

document.addEventListener("DOMContentLoaded", () => {

  let startQuizLink = document.getElementById("start-quiz-link");

  startQuizLink.addEventListener("click", () => {

    let playerName = document.getElementById("player-name-input").value;
    let player1 = new Player(playerName);
    player1.showMessage();

  });
})
