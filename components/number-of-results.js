class NumberOfResults {
  constructor(formElement, returnId, returnMatchArr) {
    this.checkArr = []
    this.formElement = formElement
    this.returnId = returnId
    this.returnMatchArr = returnMatchArr
    this.arrId = this.returnId()
    this.matchArr = this.returnMatchArr()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.check = this.check.bind(this)
    this.newResult = null
    this.newLat = ""
    this.newLng = ""
  }
  return() {
    var returnButton = document.getElementById("number-of-results-return")
    returnButton.addEventListener('click', function () {
      // var numberOfResults = document.getElementById("number-of-results")
      // var whereToGo = document.getElementById("where-to-go")
      // numberOfResults.classList.add("d-none")
      // whereToGo.classList.remove("d-none")
      location.reload()
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
          option.value = xmlDoc.getElementsByTagName("skiArea")[j].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lat") + "&" + xmlDoc.getElementsByTagName("skiArea")[j].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lng") + "&" + xmlDoc.getElementsByTagName("skiArea")[j].firstChild.nextSibling.textContent
          select.appendChild(option)
        }
      }
    }
    document.getElementById("number-of-results-loading").classList.add("d-none")
    document.getElementById("number-of-results-submit").classList.remove("d-none")
    document.getElementById("number-of-results-select").setAttribute("aria-readonly", "false")
  }
  handleSubmit(e) {
    e.preventDefault()
    var formData = new FormData(e.target)
    var results = formData.get("number-of-results")
    var select = document.getElementById("number-of-results-select")
    var selectValue = select.value
    var newValue = null
    var newVal = null
    for (var i=0; i<select.value.length; i++) {
      if (select.value[i] !== "&") {
        this.newLat += selectValue[i]
        newValue = selectValue.slice(i+1)
      } else {
        newValue = selectValue.slice(i+1)
        break
      }
    }
    for (var j=0; j<newValue.length; j++) {
      if (newValue[j] !== "&") {
        this.newLng += newValue[j]
        newVal = newValue.slice(j+1)
      } else {
        newVal = newValue.slice(j+1)
        break
      }
    }
    document.getElementById("number-of-results").classList.add("d-none")
    document.getElementById("results").classList.remove("d-none")
    this.newResult = newVal
    this.result = new Result(this.newResult, this.newLat, this.newLng) // eslint-disable-line
    this.result.returnToStart()
    this.result.generateMap()
    e.target.reset()
  }
}