class Location {
  constructor(formElement, returnLocation, skiAreaIdForm, xml) {
    this.skiAreaIdArr = []
    this.skiAreaIdForm = skiAreaIdForm
    this.xml = xml
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnLocation = returnLocation
    this.arrLocation = this.returnLocation()
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.matchArrLocation = []
    this.returnId = this.returnId.bind(this)
    this.numberOfResults = null
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
    var newLocation = formData.get("name-of-location")
    if (newLocation === "") {
      return
    }
    for (var i = 0; i < this.arrLocation.length; i++) {
      if (this.arrLocation[i] === newLocation) {
        this.matchArrLocation.push(i)
      }
    }
    document.getElementById("name-of-location").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    this.getIdOfSkiArea()
    this.skiAreaIdArr = []
    this.matchArrLocation = []
    e.target.reset()
  }
  getIdOfSkiArea() {
    for (var i = 0; i < this.xml.getElementsByTagName("skiArea").length; i++) {
      this.skiAreaIdArr.push(this.xml.getElementsByTagName("skiArea")[i].id)
    }
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.returnId, this.returnMatchArrLocation, this.xml) // eslint-disable-line
    this.numberOfResults.getIdOfSkiArea()
  }
  returnId() {
    return this.skiAreaIdArr
  }
  returnMatchArrLocation() {
    return this.matchArrLocation
  }
}
