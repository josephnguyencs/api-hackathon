class NumberOfResults {
  constructor(formElement, returnId, returnMatchArr, xml) {
    this.return = this.return.bind(this)
    this.checkArr = []
    this.formElement = formElement
    this.returnId = returnId
    this.returnMatchArr = returnMatchArr
    this.xml = xml
    this.arrId = this.returnId()
    this.matchArr = this.returnMatchArr()
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.newResult = null
    this.newLat = ""
    this.newLng = ""
    this.restartButton = document.getElementById("number-of-results-return")
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
    if (this.matchArr.length === 0) {
      title.textContent = "No results found, please press Restart and try again"
      document.getElementById("number-of-results-select").classList.add("d-none")
      document.getElementById("number-of-results-submit").classList.add("d-none")
      document.getElementById("number-of-results-label").classList.add("d-none")
    } else {
      title.textContent = "There are " + this.matchArr.length + " results"
      document.getElementById("number-of-results-select").classList.remove("d-none")
      document.getElementById("number-of-results-submit").classList.remove("d-none")
      document.getElementById("number-of-results-label").classList.remove("d-none")
    }
    for (var i = 0; i < this.matchArr.length; i++) {
      this.checkArr.push(this.arrId[this.matchArr[i]])
      for (var j = 0; j < this.xml.getElementsByTagName("skiArea").length; j++) {
        if (this.xml.getElementsByTagName("skiArea")[j].id === this.checkArr[i]) {
          var select = document.getElementById("number-of-results-select")
          var option = document.createElement("option")
          option.textContent = this.xml.getElementsByTagName("skiArea")[j].firstChild.nextSibling.textContent
          option.value = this.xml.getElementsByTagName("skiArea")[j].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lat") + "&" + this.xml.getElementsByTagName("skiArea")[j].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("lng") + "&" + this.xml.getElementsByTagName("skiArea")[j].firstChild.nextSibling.textContent
          select.appendChild(option)
        }
      }
    }
    this.return()
  }
  handleSubmit(e) {
    e.preventDefault()
    this.newLat = ""
    this.newLng = ""
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
    for (var j=0; j<select.value.length; j++) {
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
    select.innerHTML = ""
    e.target.reset()
  }
}
