var time = 0
function makeProgress() {
  if (time < 100) {
    time = time + 1
    $(".progress-bar").css("width", time + "%").text(time + " %")
  }
  setTimeout("makeProgress()", 275)
}
makeProgress()
