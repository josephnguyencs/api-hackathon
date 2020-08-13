class App {
  constructor(whereToGo, nameOfPlaceForm, nameOfLocationForm, skiAreaIdForm) {
    this.whereToGo = whereToGo
    this.placeArr = []
    this.locationArr = []
    this.nameOfPlaceForm = nameOfPlaceForm
    this.nameOfLocationForm = nameOfLocationForm
    this.skiAreaIdForm = skiAreaIdForm
    this.whereToGoFunc = this.whereToGoFunc.bind(this)
    this.getLocationAndPlace = this.getLocationAndPlace.bind(this)
    this.returnPlace = this.returnPlace.bind(this)
    this.returnLocation = this.returnLocation.bind(this)
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
      url: 'https://cors-anywhere.herokuapp.com/http://skimap.org/SkiAreas/index.xml',
      method: "GET",
      success: this.getLocationAndPlace,
    })
  }
  getLocationAndPlace(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    this.xml = xmlDoc
    for (var i=0; i<xmlDoc.getElementsByTagName("name").length; i++) {
      this.placeArr.push(xmlDoc.getElementsByTagName("name")[i].textContent)
    }
    this.place = new Place(this.nameOfPlaceForm, this.returnPlace, this.skiAreaIdForm, this.xml) // eslint-disable-line
    this.place.return()
    for (var j = 0; j < xmlDoc.getElementsByTagName("region").length; j++) {
      this.locationArr.push(xmlDoc.getElementsByTagName("region")[j].textContent.slice(4, -3))
    }
    document.getElementById("loader").classList.add("d-none")
    document.getElementById("loader-text").classList.add("d-none")
    document.getElementById("start-button").classList.remove("d-none")
    this.location = new Location(this.nameOfLocationForm, this.returnLocation, this.skiAreaIdForm, this.xml) // eslint-disable-line
    this.location.return()
  }
  returnPlace() {
    return this.placeArr
  }
  returnLocation() {
    return this.locationArr
  }
}
