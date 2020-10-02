class Place {
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
    var returnButton = document.getElementById("name-of-place-return")
    returnButton.addEventListener('click', function () {
      var nameOfPlace = document.getElementById("name-of-place")
      var whereToGo = document.getElementById("where-to-go")
      nameOfPlace.classList.add("d-none")
      whereToGo.classList.remove("d-none")
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    var formData = new FormData(e.target)
    var newPlace = formData.get("name-of-place")
    if (newPlace === "") {
      return
    }
    for (var i = 0; i < this.arrId.length; i++) {
      if (this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.textContent.toUpperCase().includes(newPlace.toUpperCase())) {
        this.skiAreaIdArr.push(this.arrId[i])
      }
    }
    document.getElementById("name-of-place").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.skiAreaIdArr, this.xml) // eslint-disable-line
    this.numberOfResults.getIdOfSkiArea()
    this.skiAreaIdArr = []
    e.target.reset()
  }
}
