//let api_url = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
let jsondata = {
	"categories": {
		"general knowledge": 9,
		"animals": 27,
		"books": 10,
		"celebrities": 26,
		"computers": 18,
		"geography": 22,
		"film": 11,
		"history": 23,
		"music": 12,
		"politics": 24,
		"sports": 21,
		"television": 14,
		"vehicles": 28,
		"video games": 15
	}
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let api_url = test()
window.onload = sendApiRequest(api_url) // change to find url when more category implemented

let score = 0;
let q_num = 1;

var correctSound = new Audio('correct.mp3');
var incorrectSound = new Audio('wrong.mp3');

async function getCategoryID(categoryName) {
    const response = await fetch("https://raw.githubusercontent.com/adbraun45/webtech/main/catagory_IDs.json");
    const json = await response.json();
    console.log(json["categories"])
    return json["categories"][categoryName]
}

function test() {
    categoryName = urlSearchParams.get("category");
    category = getCategoryID(categoryName)
    //category = jsondata["categories"][urlSearchParams.get("category")];
    diffculty = urlSearchParams.get("difficulty");
    url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${diffculty}&type=multiple`;
    console.log(url)
    return url;
}

async function sendApiRequest(request) {
    let response = await fetch(api_url);
    //console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

function useApiData(data) {
    document.querySelector("#question").innerHTML = `Question ${q_num}: ${data.results[0].question}`

    const mySentence = params["category"];
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    words.join(" ");
    

    document.querySelector(".category").innerHTML = `Category: ${words.join(" ")}`
    q_num++
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

    sendApiRequest()
}
