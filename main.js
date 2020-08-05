var nameOfPlaceForm = document.getElementById("name-of-place-form")
var nameOfLocationForm = document.getElementById("name-of-location-form")
var skiAreaIdForm = document.getElementById("number-of-results-form")
var whereToGo = new WhereToGo() // eslint-disable-line
var app = new App(whereToGo, nameOfPlaceForm, nameOfLocationForm, skiAreaIdForm) // eslint-disable-line
app.start()
