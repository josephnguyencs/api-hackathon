class NumberOfResults {
  constructor(formElement, returnId) {
    this.formElement = formElement
    this.returnId = returnId
    this.arrId = this.returnId()
    this.formElement.addEventListener('submit', this.handleSubmit)
  }
  return() {
    var returnButton = document.getElementById("number-of-results-return")
    returnButton.addEventListener('click', function () {
      var numberOfResults = document.getElementById("number-of-results")
      var whereToGo = document.getElementById("where-to-go")
      numberOfResults.classList.add("d-none")
      whereToGo.classList.remove("d-none")
    })
  }
}
