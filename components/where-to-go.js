class WhereToGo {
  return() {
    var returnButton = document.getElementById("where-to-go-return")
    returnButton.addEventListener('click', function() {
      var whereToGo = document.getElementById("where-to-go")
      var startScreen = document.getElementById("start-screen")
      whereToGo.classList.add("d-none")
      startScreen.classList.remove("d-none")
    })
  }
  ifYes() {
    var yesButton = document.getElementById("yes")
    yesButton.addEventListener('click', function() {
      var nameOfPlace = document.getElementById("name-of-place")
      var whereToGo = document.getElementById("where-to-go")
      nameOfPlace.classList.remove("d-none")
      whereToGo.classList.add("d-none")
    })
  }
  ifNo() {
    var noButton = document.getElementById("no")
    noButton.addEventListener('click', function () {
      var nameOfLocation = document.getElementById("name-of-location")
      var whereToGo = document.getElementById("where-to-go")
      nameOfLocation.classList.remove("d-none")
      whereToGo.classList.add("d-none")
    })
  }
}
