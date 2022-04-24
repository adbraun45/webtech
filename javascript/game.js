//get the url search parameters
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const apiURL = generateQuestion()
sendApiRequest(apiURL)

let score = 0;
let questionNumber = 1;

var correctSound = new Audio('correct.mp3');
var incorrectSound = new Audio('wrong.mp3');


function generateQuestion() {
    // use url search parameters to get desired category and difficulty
    category = urlSearchParams.get("category");
    diffculty = urlSearchParams.get("difficulty");
    url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${diffculty}&type=multiple`;
    return url
}

async function getCategoryID(categoryName) {
    const response = await fetch("https://raw.githubusercontent.com/adbraun45/webtech/main/category_IDs.json");
    const json = await response.json();
    let categoryID = json["categories"][categoryName];
    return categoryID
}

async function sendApiRequest(apiURL) {
    let response = await fetch(apiURL);
    let data = await response.json()
    useApiData(data)
}

function useApiData(data) {
    document.querySelector("#question").innerHTML = `Question ${questionNumber}: ${data.results[0].question}`
    document.querySelector(".category").innerHTML = `Category: ${data.results[0].category}`
    questionNumber++
    elems = document.getElementsByClassName("answer")
    var button_array = Array.from(elems);

    for (let i = 0; i < 3; i++) {
        incorrect_button = button_array[Math.floor(Math.random()*button_array.length)];
        incorrect_button.setAttribute('id', 'incorrect_answer')
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
    correct_button.setAttribute('id', 'correct_answer')
    console.log(correct_button)

    correct_button.addEventListener("click", () => {
        correctClicked()
    }, { once: true});
}

function wrongClicked() {
    console.log("wrong Answer Clicked");
    incorrectSound.play();
    document.getElementById('correct_answer').style.backgroundColor = "lightgreen"
    //document.getElementsByClassName("incorrect_answer").style.backgroundcolor = "red"
    elements = document.getElementsByClassName('incorrect_answer');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor="red";
    }

    setTimeout(() => {window.location = "index.html";}, 1000);
}

function correctClicked() {
    console.log("Correct Answer Clicked");
    correctSound.play();

    butns = document.getElementsByClassName("answer")
    for (let i = 0; i < butns.length; i++) {
        item = butns[i]
        console.log(item)
        item.replaceWith(item.cloneNode(true));
    }

    sendApiRequest(apiURL)
}
