// initialise local storage
let ls = window.localStorage

const deafaultScores = {
    "categories":[
        {
            "general-knowledge":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "animals":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "books":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "celebrities":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "computers":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "geography":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "film":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "history":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "music":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "politics":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "sports":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "television":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "vehicles":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "video-games":{
                "easy":0,
                "medium":0,
                "hard":0
            }
        }
    ]
};


if (!ls.hasOwnProperty("highscores")) {
    ls.setItem("highscores", JSON.stringify(deafaultScores))
} else {
    console.log("Local Storage already initialized")
}
