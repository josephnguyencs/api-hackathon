class Result {
  constructor(newResult, lat, lng) {
    this.newResult = newResult
    this.lat = lat
    this.lng = lng
    this.generateMap = this.generateMap.bind(this)
  }
  returnToStart() {
    var backToStartButton = document.getElementById("results-back-to-start")
    backToStartButton.addEventListener('click', function() {
      var startScreen = document.getElementById("start-screen")
      var results = document.getElementById("results")
      startScreen.classList.remove("d-none")
      results.classList.add("d-none")
    })
  }
  generateMap() {
    var resultsTitle = document.getElementById('results-title')
    resultsTitle.textContent = this.newResult
    console.log(this.lat)
    console.log(typeof(this.lat))
    if (this.lat === "null") {
      document.getElementById("results-title").textContent = "Map is unavailable for this place"
    } else {
      var numLat = parseInt(this.lat)
      var numLng = parseInt(this.lng)
      var options = {
        zoom: 8,
        center: {lat: numLat, lng: numLng}
      }
      var map = new google.maps.Map(document.getElementById("map"), options) // eslint-disable-line
    }
  }
}
