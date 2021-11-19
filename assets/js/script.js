//enable bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//display current date at the top of the scheduler
const displayCurrentDate = () => {
       $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

displayCurrentDate();