class NumberOfResults {
  constructor(formElement, returnId, returnMatchArr, xml) {
    this.checkArr = []
    this.formElement = formElement
    this.returnId = returnId
    this.returnMatchArr = returnMatchArr
    this.xml = xml
    this.arrId = this.returnId()
    this.matchArr = this.returnMatchArr()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.newResult = null
    this.newLat = ""
    this.newLng = ""
  }
  return() {
    var returnButton = document.getElementById("number-of-results-return")
    returnButton.addEventListener('click', function () {
      var numberOfResults = document.getElementById("number-of-results")
      var startScreen = document.getElementById("start-screen")
      numberOfResults.classList.add("d-none")
      startScreen.classList.remove("d-none")
      document.getElementById("number-of-results-loading").classList.remove("d-none")
      document.getElementById("number-of-results-submit").classList.add("d-none")
      document.getElementById("number-of-results-select").setAttribute("aria-readonly", "true")
      var select = document.getElementById("number-of-results-select")
      this.newLat = ""
      this.newLng = ""
      this.checkArr = []
      select.innerHTML = ""
      var title = document.getElementById("number-of-results-title")
      title.textContent = ""
      this.arrId = null
      this.matchArr = null
    })
  }
  getIdOfSkiArea() {
    var title = document.getElementById("number-of-results-title")
    title.textContent = "There are " + this.matchArr.length + " results"
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
    this.checkArr = []
    select.innerHTML = ""
    var title = document.getElementById("number-of-results-title")
    title.textContent = ""
    this.arrId = null
    this.matchArr = null
    this.formElement.removeEventListener('submit', this.handleSubmit)
    e.target.reset()
  }
}
