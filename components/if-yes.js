class IfYes {
  constructor(formElement, returnPlace, skiAreaIdForm) {
    this.skiAreaIdArr = []
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnPlace = returnPlace
    this.arrPlace = this.returnPlace()
    this.formElement = formElement
    this.skiAreaIdForm = skiAreaIdForm
    this.getIdOfSkiAreaSuccess = this.getIdOfSkiAreaSuccess.bind(this)
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.matchArrPlace = []
    this.returnMatchArrPlace = this.returnMatchArrPlace.bind(this)
    this.returnId = this.returnId.bind(this)
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
    this.numberOfResults = new NumberOfResults(this.skiAreaIdForm, this.returnId, this.returnMatchArrPlace) // eslint-disable-line
    this.numberofResults.getIdOfSkiArea()
    this.numberOfResults.return()
  }
  returnId() {
    return this.skiAreaIdArr
  }
  returnMatchArrPlace() {
    return this.matchArrPlace
  }
}
