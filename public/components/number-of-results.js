class NumberOfResults {
  constructor(formElement, skiAreaIdArr, xml) {
    this.return = this.return.bind(this)
    this.formElement = formElement
    this.skiAreaIdArr = skiAreaIdArr
    this.xml = xml
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.newResult = ""
    this.newLat = ""
    this.newLng = ""
    this.restartButton = document.getElementById("number-of-results-return")
    this.website = ""
  }
  return() {
    this.restartButton.removeEventListener('click', this.returnButtonAction)
    this.restartButton.addEventListener('click', this.returnButtonAction)
  }
  returnButtonAction() {
    var numberOfResults = document.getElementById("number-of-results")
    var startScreen = document.getElementById("start-screen")
    numberOfResults.classList.add("d-none")
    startScreen.classList.remove("d-none")
    var select = document.getElementById("number-of-results-select")
    select.innerHTML = ""
  }
  getIdOfSkiArea() {
    var title = document.getElementById("number-of-results-title")
    if (this.skiAreaIdArr.length === 0) {
      title.textContent = "No results found, please press Restart and try again"
      document.getElementById("number-of-results-select").classList.add("d-none")
      document.getElementById("number-of-results-submit").classList.add("d-none")
      document.getElementById("number-of-results-label").classList.add("d-none")
    } else {
      title.textContent = "There are " + this.skiAreaIdArr.length + " results"
      document.getElementById("number-of-results-select").classList.remove("d-none")
      document.getElementById("number-of-results-submit").classList.remove("d-none")
      document.getElementById("number-of-results-label").classList.remove("d-none")
    }
    for (var i = 0; i < this.xml.getElementsByTagName("skiArea").length; i++) {
      for (var j=0; j<this.skiAreaIdArr.length; j++) {
        if (this.xml.getElementsByTagName("skiArea")[i].id === this.skiAreaIdArr[j]) {
          var select = document.getElementById("number-of-results-select")
          var option = document.createElement("option")
          option.textContent = this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.textContent
          if (this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling && this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling && this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.textContent + "&" + this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.textContent) {
            option.value = this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lat") + "&" + this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lng") + "&" + this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.textContent + "&" + this.xml.getElementsByTagName("skiArea")[i].firstChild.nextSibling.nextSibling.nextSibling.textContent
            select.appendChild(option)
          }
        }
      }
    }
    this.return()
  }
  handleSubmit(e) {
    e.preventDefault()
    this.newLat = ""
    this.newLng = ""
    this.newResult = ""
    var formData = new FormData(e.target)
    var results = formData.get("number-of-results")
    var select = document.getElementById("number-of-results-select")
    var selectValue = select.value
    var newValue = null
    var newVal = null
    var newestVal = null
    for (var i=0; i<select.value.length; i++) {
      if (select.value[i] !== "&") {
        this.newLat += selectValue[i]
        newValue = selectValue.slice(i+1)
      } else {
        newValue = selectValue.slice(i+1)
        break
      }
    }
    for (var j=0; j<select.value.length; j++) {
      if (newValue[j] !== "&") {
        this.newLng += newValue[j]
        newVal = newValue.slice(j+1)
      } else {
        newVal = newValue.slice(j+1)
        break
      }
    }
    for (var k=0; k<select.value.length; k++) {
      if (newVal[k] !== "&") {
        this.newResult += newVal[k]
        newestVal = newVal.slice(k+1)
      } else {
        newestVal = newVal.slice(k+1)
        break
      }
    }
    this.website = newestVal
    document.getElementById("number-of-results").classList.add("d-none")
    document.getElementById("results").classList.remove("d-none")
    this.result = new Result(this.newResult, this.newLat, this.newLng, this.website) // eslint-disable-line
    this.result.returnToStart()
    this.result.generateMap()
    select.innerHTML = ""
    e.target.reset()
  }
}
