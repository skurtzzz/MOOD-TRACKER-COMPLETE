const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  eventFeelingDropdown = document.getElementById("eventFeeling"),
  addEventSubmit = document.querySelector(".add-event-btn ");
  
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const eventsArr = [];
getEvents();
console.log(eventsArr);


//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  document.getElementById('event-date').value = date + " " + months[month] + " " + year;
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Mood Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
eventFeelingDropdown.addEventListener("input", (e) => {
  eventFeelingDropdown.value = eventFeelingDropdown.value.slice(0, 60);
});

eventFeelingDropdown.addEventListener("change", function () {
  const selectedMood = eventFeelingDropdown.value;
  // Do something with the selected mood, for example, display it
  const selectedMoodInfo = document.getElementById("moodInfoContainer");
  selectedMoodInfo.innerHTML = `Selected Mood: ${selectedMood}`;
  console.log("Selected Mood: ", selectedMood);
});

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.innerHTML =
    
  
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const eventFeelingDropdown = document.getElementById("eventFeeling");
  const selectedMood = eventFeelingDropdown.value;

  console.log("Selected Mood:", selectedMood); // Add this line for debugging

  // Rest of your code...
});
defineProperty();

document.querySelector(".add-event-btn").addEventListener("click", function (e) {
  e.preventDefault();

  // Get the selected date and format it as YYYY-MM-DD
  const selectedDateElement = document.getElementById("event-date");
  const formattedDate = formatDate(selectedDateElement ? selectedDateElement.value : '');
  
  const selectedMoodElement = document.getElementById("eventFeeling");
  const selectedMood = selectedMoodElement ? selectedMoodElement.value : '';


  // Get the selected time values and format them as HH:MM:SS
  const eventTimeFrom = convertTime(addEventFrom.value);
  const eventTimeTo = convertTime(addEventTo.value);

  // Your existing code for fetching mood and other data...

  const formData = new FormData(document.forms.myForm);
  formData.set("event-date", formattedDate); // Set the formatted date back to the form data
  formData.set("event-feeling", selectedMood);  // Use selectedMood here
  console.log("Form Data:", formData);

  fetch("moodtracker.php", {
      method: "POST",
      body: formData,
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      // Handle the response as needed
  })
  .catch(error => {
      console.error("Error:", error);
  });
});

function formatDate(selectedDate) {
  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}



//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const selectedMood = eventFeelingDropdown.value;
  console.log(selectedMood);
  const eventTimeFrom = convertTime(addEventFrom.value);
  const eventTimeTo = convertTime(addEventTo.value);
  if (selectedMood === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = addEventFrom.value.split(":");
  const timeToArr = addEventTo.value.split(":");
  
  // Check correct time format 24 hour
  if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      isNaN(timeFromArr[0]) || isNaN(timeFromArr[1]) ||
      isNaN(timeToArr[0]) || isNaN(timeToArr[1]) ||
      timeFromArr[0] < 0 || timeFromArr[0] > 23 ||
      timeFromArr[1] < 0 || timeFromArr[1] > 59 ||
      timeToArr[0] < 0 || timeToArr[0] > 23 ||
      timeToArr[1] < 0 || timeToArr[1] > 59
  ) {
      alert("Invalid Time Format");
      return;
  }

  const timeFrom = convertTime(addEventFrom.value);
  const timeTo = convertTime(addEventTo.value);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === selectedMood) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: selectedMood,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  selectedMood.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const selectedMood = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === selectedMood) {
              event.events.splice(index, 1);
            }
          });
          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  // Convert time to 24-hour format
  let timeArr = time.split(":");
  let timeHour = parseInt(timeArr[0], 10);
  let timeMin = timeArr[1];

  // Ensure the time is in the correct range
  if (timeHour < 0 || timeHour > 23 || timeMin < 0 || timeMin > 59) {
    alert("Invalid Time Format");
    return "";
  }

  // Convert to 12-hour format
  let formattedHour = timeHour % 12 || 12;

  // Determine whether it's AM or PM
  const period = timeHour >= 12 ? "PM" : "AM";

  // Pad single-digit hours with a leading zero
  formattedHour = formattedHour.toString().padStart(2, "0");

  // Combine hours and minutes
  return `${formattedHour}:${timeMin} ${period}`;
}
function submitForm() {
  // Get form data
  const selectedMoodDropdown = document.getElementById("eventFeeling");
  const selectedMood = selectedMoodDropdown.options[selectedMoodDropdown.selectedIndex].value;
  const eventTimeFrom = document.querySelector(".event-time-from").value;
  const eventTimeTo = document.querySelector(".event-time-to").value;

  // Validate form data
  if (!selectedMood || !eventTimeFrom || !eventTimeTo) {
      alert("Please fill in all the fields");
      return;
  }

  // Get the selected date and format it as YYYY-MM-DD
  const selectedDate = document.getElementById("event-date").value;
  const formattedDate = formatDate(selectedDate);

  // Prepare data to be sent to the server
  const formData = new FormData();
  console.log(selectedMood);
  formData.append("event-date", formattedDate);
  formData.append("event-feeling", selectedMood);
  formData.append("event-time-from", eventTimeFrom);
  formData.append("event-time-to", eventTimeTo);

  // Send data to the server using fetch
  fetch("moodtracker.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      // Handle the response as needed
  })
  .catch(error => {
      console.error("Error:", error);
  });
}

// Function to format the date as YYYY-MM-DD
function formatDate(selectedDate) {
  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
console.log("Selected Mood:", selectedMood);
console.log("Event Time From:", eventTimeFrom);
console.log("Event Time To:", eventTimeTo);
console.log("Formatted Date:", formattedDate);