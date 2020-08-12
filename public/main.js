// var iframe = document.createElement("iframe")
// iframe.setAttribute("src", "http://skimap.org/SkiAreas/index.xml")
// iframe.classList.add("d-none")
// document.getElementsByTagName("body")[0].appendChild(iframe)
var nameOfPlaceForm = document.getElementById("name-of-place-form")
var nameOfLocationForm = document.getElementById("name-of-location-form")
var skiAreaIdForm = document.getElementById("number-of-results-form")
var whereToGo = new WhereToGo() // eslint-disable-line
var app = new App(whereToGo, nameOfPlaceForm, nameOfLocationForm, skiAreaIdForm) // eslint-disable-line
app.start()
