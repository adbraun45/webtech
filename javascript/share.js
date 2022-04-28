function shareHighscore(category, element) {
    category = category.replace(/\s/g,"%20")
    let score = element.textContent
    let difficulty = element.classList[1]
    let shareLink = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fadbraun45.github.io%2Fwebtech%2Fquiz.html&text=On%20${difficulty}%20difficulty%20I%20scored%20${score}%20doing%20a%20quiz%20on%20${category}`
    
    window.open(shareLink)
}