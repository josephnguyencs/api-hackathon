class Result {
  constructor(newResult, lat, lng) {
    this.newResult = newResult
    this.lat = lat
    this.lng = lng
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
    var numLat = parseInt(this.lat)
    var numLng = parseInt(this.lng)
    console.log(numLat)
    console.log(numLng)
    resultsTitle.textContent = this.newResult
    var options = {
      zoom: 8,
      center: {lat: numLat, lng: numLng}
    }
    var map = new google.maps.Map(document.getElementById("map"), options) // eslint-disable-line
  }
}
