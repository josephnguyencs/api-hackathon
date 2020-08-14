class Location {
  constructor(formElement, arrId, skiAreaIdForm, xml) {
    this.skiAreaIdArr = []
    this.skiAreaIdForm = skiAreaIdForm
    this.xml = xml
    this.handleSubmit = this.handleSubmit.bind(this)
    this.arrId = arrId
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.numberOfResults = null
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
    for (var i = 0; i < this.arrId.length; i++) {
      if (this.xml.getElementsByTagName("skiArea")[i].lastChild.previousSibling.textContent.trim() === newLocation) {
        this.skiAreaIdArr.push(this.arrId[i])
      }
    }
    document.getElementById("name-of-location").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.skiAreaIdArr, this.xml) // eslint-disable-line
    this.numberOfResults.getIdOfSkiArea()
    this.skiAreaIdArr = []
    e.target.reset()
  }
}
