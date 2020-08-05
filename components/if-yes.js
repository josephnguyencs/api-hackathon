class IfYes {
  constructor(formElement, returnPlace) {
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnPlace = returnPlace
    this.arrPlace = this.returnPlace()
    this.formElement = formElement
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.returnMatchArrPlace = this.returnMatchArrPlace.bind(this)
    this.matchArrPlace = []
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
    console.log(this.matchArrPlace)
    document.getElementById("name-of-place").classList.add("d-none")
    document.getElementById("number-of-results").classList.remove("d-none")
    e.target.reset()
  }
  returnMatchArrPlace() {
    return this.matchArrPlace
  }
}
