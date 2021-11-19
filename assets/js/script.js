//display current date at the top of the scheduler
const displayCurrentDate = () => {
       $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

displayCurrentDate();