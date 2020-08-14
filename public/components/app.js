class App {
  constructor(whereToGo, nameOfPlaceForm, nameOfLocationForm, skiAreaIdForm) {
    this.whereToGo = whereToGo
    this.arrId = []
    this.nameOfPlaceForm = nameOfPlaceForm
    this.nameOfLocationForm = nameOfLocationForm
    this.skiAreaIdForm = skiAreaIdForm
    this.whereToGoFunc = this.whereToGoFunc.bind(this)
    this.getLocationAndPlace = this.getLocationAndPlace.bind(this)
    this.place = null
    this.location = null
    this.xml = null
  }
  start() {
    this.getData()
    var startButton = document.getElementById("start-button")
    startButton.addEventListener('click', this.whereToGoFunc)
  }
  whereToGoFunc() {
    var startScreen = document.getElementById("start-screen")
    var whereToGoFunc = document.getElementById("where-to-go")
    startScreen.classList.add("d-none")
    whereToGoFunc.classList.remove("d-none")
    this.whereToGo.return()
    this.whereToGo.place()
    this.whereToGo.location()
  }
  getData() {
    $.ajax({
      url: '/api',
      method: "GET",
      success: this.getLocationAndPlace,
    })
  }
  getLocationAndPlace(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    this.xml = xmlDoc
    for (var i = 0; i < xmlDoc.getElementsByTagName("skiArea").length; i++) {
      this.arrId.push(xmlDoc.getElementsByTagName("skiArea")[i].id)
    }
    document.getElementById("loader").classList.add("d-none")
    document.getElementById("loader-text").classList.add("d-none")
    document.getElementById("start-button").classList.remove("d-none")
    var location = new Location(this.nameOfLocationForm, this.arrId, this.skiAreaIdForm, this.xml) // eslint-disable-line
    location.return()
    var place = new Place(this.nameOfPlaceForm, this.arrId, this.skiAreaIdForm, this.xml) // eslint-disable-line
    place.return()
  }
}
