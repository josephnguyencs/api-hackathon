class Result {
  constructor(newResult, lat, lng, website) {
    this.newResult = newResult
    this.lat = lat
    this.lng = lng
    this.website = website
    this.generateMap = this.generateMap.bind(this)
  }
  returnToStart() {
    var backToStartButton = document.getElementById("results-back-to-start")
    backToStartButton.addEventListener('click', function() {
      var startScreen = document.getElementById("start-screen")
      var results = document.getElementById("results")
      startScreen.classList.remove("d-none")
      results.classList.add("d-none")
      var resultsTitle = document.getElementById('results-title')
      resultsTitle.innerHTML = ""
    })
  }
  generateMap() {
    console.log(this.website)
    var resultsTitle = document.getElementById('results-title')
    resultsTitle.textContent = this.newResult
    if (this.lat === "null") {
      document.getElementById("map").innerHTML = ""
      document.getElementById("results-title").textContent = "Map is unavailable for this place"
    } else {
      var numLat = parseInt(this.lat)
      var numLng = parseInt(this.lng)
      var options = {
        zoom: 8,
        center: {lat: numLat, lng: numLng}
      }
      var map = new google.maps.Map(document.getElementById("map"), options) // eslint-disable-line
      var website = document.getElementById("website")
      if (this.website === '' ) {
        website.textContent = 'Not Available'
      } else {
        website.setAttribute('href', this.website)
        website.textContent = this.website
      }
    }
  }
}
