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

var correctSound = new Audio('correct.mp3');
var incorrectSound = new Audio('wrong.mp3');


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

    document.querySelector("#score").innerHTML = `Score: ${score}`
    document.querySelector("#highscore").innerHTML = `Highscore: ${highscore}`

    // remove extra info from category
    categoryFull = data.results[0].category
    categorySplit = categoryFull.split(": ")
    categoryName = categorySplit.at(-1)
    document.querySelector(".category").innerHTML = `Category: ${categoryName}`
    questionNumber++
    elems = document.getElementsByClassName("answer")
    var button_array = Array.from(elems);

    for (let i = 0; i < 3; i++) {
        incorrect_button = button_array[Math.floor(Math.random()*button_array.length)];
        incorrect_button.innerHTML = data.results[0].incorrect_answers[i]
        index = button_array.indexOf(incorrect_button)
        button_array.splice(index, 1)

        incorrect_button.addEventListener("click", () => {
            wrongClicked()
        }, {once: true});
    }

    item = button_array[Math.floor(Math.random()*button_array.length)];
    item.innerHTML = data.results[0].correct_answer

    let correct_button = item
    correct_button.setAttribute('id', 'correct')
    console.log(correct_button)

    correct_button.addEventListener("click", () => {
        correctClicked()
    }, { once: true});
}

function wrongClicked() {
    incorrectSound.play();
    document.getElementById('correct').style.backgroundColor = "green"

    setTimeout(() => {window.location = "index.html";}, 1000);
}

function correctClicked() {
    score++
    compareHighscores()
    correctSound.play();
    document.getElementById("correct").removeAttribute("id", "correct")

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
        window.localStorage.setItem("highscores", JSON.stringify(highscores))
    }
}
