// list of category IDs
const categories = ["9", "27", "10", "26", "18", "22", "11", "23", "12", "24", "21", "14", "28", "15"];
const difficulties = ["easy", "medium", "hard"];

let highscores = JSON.parse(window.localStorage.getItem("highscores"));

categories.forEach(categoryID => {

    categoryScore = document.getElementsByClassName(categoryID);

    for (const diffculty of difficulties) {
        i = difficulties.indexOf(diffculty)
        if (categoryScore[i].classList.contains(diffculty)) {
            categoryScore[i].innerHTML = highscores["categories"][0][categoryID][diffculty]
        }
    }
})
