class IfNo {
  constructor(formElement, returnLocation) {
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnLocation = returnLocation
    this.arrLocation = this.returnLocation()
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.matchArrLocation = []
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
    console.log(this.matchArrLocation)
    document.getElementById("name-of-location").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    e.target.reset()
  }
  returnMatchArrLocation() {
    return this.matchArrLocation
  }
}
