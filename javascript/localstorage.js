let ls = window.localStorage

// all default scores are 0
const defaultScores = {
    "categories":[
        {
            "9":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "27":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "10":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "26":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "18":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "22":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "11":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "23":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "12":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "24":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "21":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "14":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "28":{
                "easy":0,
                "medium":0,
                "hard":0
            },
            "15":{
                "easy":0,
                "medium":0,
                "hard":0
            }
        }
    ]
};

// create local storage entry if one does not exist
if (!ls.hasOwnProperty("highscores")) {
    ls.setItem("highscores", JSON.stringify(defaultScores))
}
