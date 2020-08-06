class Location {
  constructor(formElement, returnLocation, skiAreaIdForm) {
    this.skiAreaIdArr = []
    this.skiAreaIdForm = skiAreaIdForm
    this.getIdOfSkiAreaSuccess = this.getIdOfSkiAreaSuccess.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnLocation = returnLocation
    this.arrLocation = this.returnLocation()
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.matchArrLocation = []
    this.returnId = this.returnId.bind(this)
    this.returnMatchArrLocation = this.returnMatchArrLocation.bind(this)
  }
  return() {
    var returnButton = document.getElementById("name-of-location-return")
    returnButton.addEventListener('click', function () {
      var nameOfLocation = document.getElementById("name-of-location")
      var whereToGo = document.getElementById("where-to-go")
      nameOfLocation.classList.add("d-none")
      whereToGo.classList.remove("d-none")
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    var formData = new FormData(e.target)
    var location = formData.get("name-of-location")
    for (var i = 0; i < this.arrLocation.length; i++) {
      if (this.arrLocation[i] === location) {
        this.matchArrLocation.push(i)
      }
    }
    document.getElementById("name-of-location").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    this.getIdOfSkiArea()
    e.target.reset()
  }
  getIdOfSkiArea() {
    $.ajax({
      url: "https://skimap.org/SkiAreas/index.xml",
      method: "GET",
      success: this.getIdOfSkiAreaSuccess
    })
  }
  getIdOfSkiAreaSuccess(info) {
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    for (var i = 0; i < xmlDoc.getElementsByTagName("skiArea").length; i++) {
      this.skiAreaIdArr.push(xmlDoc.getElementsByTagName("skiArea")[i].id)
    }
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.returnId, this.returnMatchArrLocation) // eslint-disable-line
    this.numberOfResults.getIdOfSkiArea()
    this.numberOfResults.return()
  }
  returnId() {
    return this.skiAreaIdArr
  }
  returnMatchArrLocation() {
    return this.matchArrLocation
  }
}
