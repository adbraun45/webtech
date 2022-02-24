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
    elems = document.getElementsByClassName("answer")
    var button_array = Array.from(elems);

    for (let i = 0; i < 3; i++) {
        item = button_array[Math.floor(Math.random()*button_array.length)];
        item.innerHTML = data.results[0].incorrect_answers[i]
        index = button_array.indexOf(item)
        button_array.splice(index, 1)
    }

    item = button_array[Math.floor(Math.random()*button_array.length)];
    item.innerHTML = data.results[0].correct_answer

    let correct_button = item
    console.log(correct_button)

    correct_button.addEventListener("click", (e) => {
        answerClicked()
    }, { once: true});
}


function answerClicked(e) {
    console.log("Correct Answer Clicked")
    sendApiRequest()
}
