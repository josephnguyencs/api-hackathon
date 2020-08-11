class Place {
  constructor(formElement, returnPlace, skiAreaIdForm, xml) {
    this.skiAreaIdArr = []
    this.skiAreaIdForm = skiAreaIdForm
    this.xml = xml
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnPlace = returnPlace
    this.arrPlace = this.returnPlace()
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.matchArrPlace = []
    this.returnId = this.returnId.bind(this)
    this.returnMatchArrPlace = this.returnMatchArrPlace.bind(this)
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
    var place = formData.get("name-of-place")
    for (var i=0; i<this.arrPlace.length; i++) {
      if (this.arrPlace[i] === place) {
        this.matchArrPlace.push(i)
      }
    }
    document.getElementById("name-of-place").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    this.getIdOfSkiArea()
    this.skiAreaIdArr = []
    this.matchArrPlace = []
    e.target.reset()
  }
  getIdOfSkiArea() {
    for (var i = 0; i < this.xml.getElementsByTagName("skiArea").length; i++) {
      this.skiAreaIdArr.push(this.xml.getElementsByTagName("skiArea")[i].id)
    }
      this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.returnId, this.returnMatchArrPlace, this.xml) // eslint-disable-line
      this.numberOfResults.getIdOfSkiArea()
  }
  returnId() {
    return this.skiAreaIdArr
  }
  returnMatchArrPlace() {
    return this.matchArrPlace
  }
}
