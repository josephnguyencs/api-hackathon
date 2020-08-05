class NumberOfResults {
  constructor(formElement, returnId, returnMatchArr) {
    this.checkArr = []
    this.formElement = formElement
    this.returnId = returnId
    this.returnMatchArr = returnMatchArr
    this.arrId = this.returnId()
    this.matchArr = this.returnMatchArr()
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.check = this.check.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  getIdOfSkiArea() {
    $.ajax({
      url: "https://skimap.org/SkiAreas/index.xml",
      method: "GET",
      success: this.check
    })
  }
  check(info) {
    var title = document.getElementById("number-of-results-title")
    title.textContent = "There are " + this.matchArr.length + " results"
    var xmlText = new XMLSerializer().serializeToString(info)
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlText, "text/xml")
    for (var i=0; i<this.matchArr.length; i++) {
      this.checkArr.push(this.arrId[this.matchArr[i]])
      for (var j = 0; j < xmlDoc.getElementsByTagName("skiArea").length; j++) {
        if (xmlDoc.getElementsByTagName("skiArea")[j].id === this.checkArr[i]) {
          var select = document.getElementById("number-of-results-select")
          var option = document.createElement("option")
          option.textContent = xmlDoc.getElementsByTagName("skiArea")[j].firstChild.nextSibling.textContent
          select.appendChild(option)
        }
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    var formData = new FormData(e.target)
    var results = formData.get("number-of-results")
    console.log(results)
    document.getElementById("number-of-results").classList.add("d-none")
    document.getElementById("results").classList.remove("d-none")
    e.target.reset()
  }
}
