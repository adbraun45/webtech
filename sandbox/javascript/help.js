function toggleHelp() {
    helpPopup = document.getElementById("help-popup");
    if (helpPopup.classList.contains("visible")) {
        closeHelp();
    } else {
        helpPopup.classList.add("visible")
        document.getElementById("help-popup").style.display = "block";
    }
}

function closeHelp() {
    helpPopup = document.getElementById("help-popup");
    helpPopup.classList.remove("visible")
    document.getElementById("help-popup").style.display = "none";
}