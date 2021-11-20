/*
Functions needed for Scheduler features
-current date
-time block state (colorize time blocks to represent blocks that are in the past, present, and future)
-capture event entries from the UI, and store them to localstorage
-persist event entries on the page (events stay in the input fields, even upon page-refresh)
*/

//enable bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//display current date at the top of the scheduler
function displayCurrentDate(currentMoment) {
       $("#currentDay").text(moment(currentMoment).format("dddd, MMM Do YYYY, h:mm a"));
}

//capture entered user text in the <textarea> elements for each time block, and allow user to save the entered event to localstorage when the adjacent save button is pressed
function captureUserEvents() {
       //capture click events on the save buttons
       $("#save-group").on("click", function(event) {
              event.preventDefault();
              console.log($(event.target).attr("id"));
              const idString = $(event.target).attr("id");
              let buttonElId = idString.slice(4);
              console.log(buttonElId);
              //console.log($("#panelsStayOpen-collapseOne").find("input").val());

              console.log($(`#in${buttonElId}`).val());
              
       });
}

//execute userEventPersistance 'onload', grabs the user's entered events and adds them to their respective time blocks
function userEventPersistance() {

}

//colorize time blocks to visualize blocks that are in the past, present, and future
window.onload = function timeBlockState() {    
       //get the current moment
       const now = moment();
       //test the time-block functionality
       /*
       const now = moment().add(10, 'h');
       */

       for(let i = 9; i < 17 ; i++){
              //re-initialize switch variable
              let blockState = '';
              //grab each time string from the time block button innertext and compare it to the current moment
              const buttonEl = `#${i}`;
              const timeBlockValue = moment($(buttonEl).text(), "LT");
              console.log(timeBlockValue.format("dddd, MMMM Do YYYY, h:mm a"));
              console.log(now.format("dddd, MMMM Do YYYY, h:mm a"));

              let timeDiff = timeBlockValue.diff(now, 'h', true);

              console.log(timeDiff);

              if (timeDiff >= -1 && timeDiff <= 0) {
                     blockState = 'isNow';
              } else if (timeDiff < -1) {
                     blockState = true;
              } else if (timeDiff > 0 ) {
                     blockState = false;
              }

              console.log(blockState);

              switch(blockState){
                     case true:
                            //colorize 'past' time-blocks
                            console.log('past');
                            originalTimeValue = timeBlockValue.format("h:mm");
                            valuePlusHour = timeBlockValue.add(1, "h");
                            $(buttonEl).addClass("accordion-button collapsed bg-secondary text-white");
                            $(buttonEl).html(`${originalTimeValue + ' - ' + valuePlusHour.format("h:mm a")}`);
                            break;
                     case false:
                            //colorize 'future' time-blocks
                            console.log('future');
                            originalTimeValue = timeBlockValue.format("h:mm");
                            valuePlusHour = timeBlockValue.add(1, "h");
                            $(buttonEl).addClass("accordion-button collapsed bg-success text-dark");
                            $(buttonEl).html(`${originalTimeValue + ' - ' + valuePlusHour.format("h:mm a")}`);
                            break;
                     case 'isNow':
                            //colorize and style 'now' time-block
                            originalTimeValue = timeBlockValue.format("h:mm");
                            valuePlusHour = timeBlockValue.add(1, "h");
                            console.log('now');
                            $(buttonEl).addClass("accordion-button collapsed btn-primary text-warning active rounded-pill fst-italic");
                            $(buttonEl).html(`Now <svg xmlns='http://www.w3.org/2000/svg' style='margin-left: 10px; margin-right: 10px;' width='20' height='20' fill='currentColor' class='bi bi-clock-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z'/></svg>
                            ${originalTimeValue + ' - ' + valuePlusHour.format("h:mm a")}`);
                            break;
              }
       }

       displayCurrentDate(now);
       captureUserEvents();
}