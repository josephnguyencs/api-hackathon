class App {
  constructor(whereToGo, nameOfPlaceForm, nameOfLocationForm, skiAreaIdForm) {
    this.whereToGo = whereToGo
    this.placeArr = []
    this.locationArr = []
    this.skiAreaIdArr = []
    this.nameOfPlaceForm = nameOfPlaceForm
    this.nameOfLocationForm = nameOfLocationForm
    this.skiAreaIdForm = skiAreaIdForm
    this.whereToGoFunc = this.whereToGoFunc.bind(this)
    this.ifYesFunc = this.ifYesFunc.bind(this)
    this.ifNoFunc = this.ifNoFunc.bind(this)
    this.numberOfResultsFunc = this.numberOfResultsFunc.bind(this)
    this.getNameOfPlaceSuccess = this.getNameOfPlaceSuccess.bind(this)
    this.returnPlace = this.returnPlace.bind(this)
    this.getNameOfLocationSuccess = this.getNameOfLocationSuccess.bind(this)
    this.returnLocation = this.returnLocation.bind(this)
    this.getIdOfSkiAreaSuccess = this.getIdOfSkiAreaSuccess.bind(this)
    this.returnId = this.returnId.bind(this)
    this.ifYes = null
    this.ifNo = null
    this.numberOfResults = null
  }
  start() {
    this.getNameOfPlace()
    this.getNameofLocation()
    this.getIdOfSkiArea()
    var startButton = document.getElementById("start-button")
    startButton.addEventListener('click', this.whereToGoFunc)
  }
  whereToGoFunc() {
    var startScreen = document.getElementById("start-screen")
    var whereToGoFunc = document.getElementById("where-to-go")
    startScreen.classList.add("d-none")
    whereToGoFunc.classList.remove("d-none")
    this.whereToGo.return()
    this.whereToGo.ifYes()
    this.whereToGo.ifNo()
    this.ifYesFunc()
    this.ifNoFunc()
    this.numberOfResultsFunc()
  }
  ifYesFunc() {
    this.ifYes.return()
  }
  ifNoFunc() {
    this.ifNo.return()
  }
  numberOfResultsFunc() {
    this.numberOfResults.return()
  }
  getNameOfPlace() {
    $.ajax({
      url: "https://skimap.org/SkiAreas/index.xml",
      method: "GET",
      success: this.getNameOfPlaceSuccess,
    })
  }
  getNameofLocation() {
    $.ajax({
      url: "https://skimap.org/SkiAreas/index.xml",
      method: "GET",
      success: this.getNameOfLocationSuccess,
    })
  }
  getIdOfSkiArea() {
    $.ajax({
      url: "https://skimap.org/SkiAreas/index.xml",
      method: "GET",
      success: this.getIdOfSkiAreaSuccess,
    })
  }
  getNameOfPlaceSuccess(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    for (var i=0; i<xmlDoc.getElementsByTagName("name").length; i++) {
      this.placeArr.push(xmlDoc.getElementsByTagName("name")[i].textContent)
    }
    console.log(this.placeArr)
    this.ifYes = new IfYes(this.nameOfPlaceForm, this.returnPlace) // eslint-disable-line
  }
  getNameOfLocationSuccess(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    for (var i = 0; i < xmlDoc.getElementsByTagName("region").length; i++) {
      this.locationArr.push(xmlDoc.getElementsByTagName("region")[i].textContent.slice(4, -3))
    }
    console.log(this.locationArr)
    this.ifNo = new IfNo(this.nameOfLocationForm, this.returnLocation) // eslint-disable-line
  }
  getIdOfSkiAreaSuccess(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    for (var i = 0; i < xmlDoc.getElementsByTagName("skiArea").length; i++) {
      this.skiAreaIdArr.push(xmlDoc.getElementsByTagName("skiArea")[i].id)
    }
    console.log(this.skiAreaIdArr)
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.returnId) // eslint-disable-line
    document.getElementById("progress").classList.add("d-none")
    document.getElementById("start-button").classList.remove("d-none")
  }
  returnPlace() {
    return this.placeArr
  }
  returnLocation() {
    return this.locationArr
  }
  returnId() {
    return this.skiAreaIdArr
  }
}
