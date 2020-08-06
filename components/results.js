class Result {
  constructor(newResult, lat, lng) {
    this.newResult = newResult
    this.lat = lat
    this.lng = lng
  }
  returnToStart() {
    console.log(this.lat)
    console.log(this.lng)
    var backToStartButton = document.getElementById("results-back-to-start")
    backToStartButton.addEventListener('click', function() {
      var startScreen = document.getElementById("start-screen")
      var results = document.getElementById("results")
      startScreen.classList.remove("d-none")
      results.classList.add("d-none")
      location.reload()
    })
  }
  generateMap() {
    var resultsTitle = document.getElementById('results-title')
    var numLat = parseInt(this.lat)
    var numLng = parseInt(this.lng)
    resultsTitle.textContent = this.newResult
    var options = {
      zoom: 8,
      center: {lat: numLat, lng: numLng}
    }
    var map = new google.maps.Map(document.getElementById("map"), options) // eslint-disable-line
  }
}
