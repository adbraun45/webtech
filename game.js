window.onload = sendApiRequest
let q_num = 1

async function sendApiRequest() {
    let response = await fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple");
    //console.log(response)
    let data = await response.json()
    //console.log(data)
    useApiData(data)
}

function useApiData(data) {
    document.querySelector("#question").innerHTML = `Question ${q_num}: ${data.results[0].question}`
    q_num++
    elems = document.getElementsByClassName("answer")
    var button_array = Array.from(elems);

    for (let i = 0; i < 3; i++) {
        item = button_array[Math.floor(Math.random()*button_array.length)];
        item.innerText = data.results[0].incorrect_answers[i]
        index = button_array.indexOf(item)
        button_array.splice(index, 1)

        item.addEventListener("click", () => {
            wrongClicked()
        }, {once: true});
    }

    item = button_array[Math.floor(Math.random()*button_array.length)];
    item.innerText = data.results[0].correct_answer

    let correct_button = item
    console.log(correct_button)

    correct_button.addEventListener("click", () => {
        correctClicked()
    }, { once: true});
}

function wrongClicked() {
    console.log("wrong Answer Clicked");
    var audio = new Audio('wrong.mp3');
    audio.play();
    setTimeout(() => {window.location = "index.html";}, 1000);
}

function correctClicked() {
    console.log("Correct Answer Clicked");
    var audio = new Audio('correct.mp3');
    audio.play();

    butns = document.getElementsByClassName("answer")
    //var button_array = Array.from(butns);
    for (let i = 0; i < butns.length; i++) {
        item = butns[i]
        console.log(item)
        item.replaceWith(item.cloneNode(true));
    }

    sendApiRequest()
}
