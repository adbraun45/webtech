//get the url search parameters
const urlSearchParams = new URLSearchParams(window.location.search);
let categoryID = urlSearchParams.get("category");
let categoryName
let diffculty = urlSearchParams.get("difficulty");

let questionNumber = 1;
let score = 0;

let highscores = JSON.parse(window.localStorage.getItem("highscores"))
    
let highscore = highscores["categories"][0][categoryID][diffculty]

const apiURL = generateQuestion();
let currentCategory = sendApiRequest(apiURL);

var correctSound = new Audio('sounds/correct.mp3');
var incorrectSound = new Audio('sounds/wrong.mp3');


function generateQuestion() {
    // use url search parameters to get desired category and difficulty
    url = `https://opentdb.com/api.php?amount=1&category=${categoryID}&difficulty=${diffculty}&type=multiple`;
    return url
}

async function sendApiRequest(apiURL) {
    let response = await fetch(apiURL);
    let data = await response.json()
    useApiData(data)
}

function useApiData(data) {
    document.querySelector("#question").innerHTML = `Question ${questionNumber}: ${data.results[0].question}`
    questionNumber++

    document.querySelector("#score").innerHTML = `Score: ${score}`
    document.querySelector("#highscore").innerHTML = `Highscore: ${highscore}`

    // remove extra info from category
    categoryFull = data.results[0].category
    categorySplit = categoryFull.split(": ")
    categoryName = categorySplit.at(-1)

    document.querySelector(".category").innerHTML = `Category: ${categoryName}`


    answersButton = document.getElementsByClassName("answer")
    var answers = Array.from(answersButton);

    // randomize which button has each incorrect answer
    for (let i = 0; i < 3; i++) {
        // pick random button
        incorrect_button = answers[Math.floor(Math.random()*answers.length)];
        incorrect_button.innerHTML = data.results[0].incorrect_answers[i]

        // remove button from array
        index = answers.indexOf(incorrect_button)
        answers.splice(index, 1)

        incorrect_button.addEventListener("click", () => {
            // function ends game when wrong button is clicked
            wrongClicked()
        }, {once: true});
    }

    // remaining button gets the correct answer
    correct_button = answers[0];
    correct_button.innerHTML = data.results[0].correct_answer

    correct_button.setAttribute('id', 'correct')
    //used in testing to see which button was correct
    //console.log(correct_button)

    correct_button.addEventListener("click", () => {
        // function to increment score and check if highscore was achieved
        correctClicked()
    }, { once: true});
}

function wrongClicked() {
    incorrectSound.play();
    // change correct answer to green colour
    document.getElementById('correct').style.backgroundColor = "green"

    // returns to homepage after incorrect answer is given
    setTimeout(() => {window.location = "https://adbraun45.github.io/webtech/";}, 1000);
}

function correctClicked() {
    score++
    compareHighscores()
    correctSound.play();
    document.getElementById("correct").removeAttribute("id", "correct")

    // reset buttons for next question
    butns = document.getElementsByClassName("answer")
    for (let i = 0; i < butns.length; i++) {
        item = butns[i]
        item.replaceWith(item.cloneNode(true));
    }

    sendApiRequest(apiURL)
}

function compareHighscores() {
    if (score > highscore) {
        highscore = score;
        highscores["categories"][0][categoryID][diffculty] = score

        // update record of highscore in local storage
        window.localStorage.setItem("highscores", JSON.stringify(highscores))
    }
}
