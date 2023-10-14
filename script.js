//array to populate the menu

const menu = [
  {
    id: 1,
    title: "Chicken Drumsticks",
    img: "https://images.unsplash.com/photo-1567529854970-ce2c4207e242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    description: "Chicken drumsticks marinated overnight, with a herb sauce served with rice.",
  },
  {
    id: 2,
    title: "Salmon",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    description: "Roasted Salmon on a bed of Steamed Vegetables.",
  },
  {
    id: 3,
    title: "Noodles",
    img: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    description: "Creamy Ramen Noodles Paired with Sliced Chicken Breast",
  },
  {
    id: 4,
    title: "Beef Burger",
    img: "https://images.unsplash.com/photo-1607013401178-f9c15ab575bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=2670&q=80",
    description: "Angus Beef Burger, paired with hand-cut French Fries",
  },
];

// function to display the menu

const menuContainer = document.getElementById("menu-container");

menu.forEach((item) => {
  const menuItem = document.createElement("div");
  menuItem.className = "menu-item";
  menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="menu-item-title">${item.title}</div>
            <div class="menu-item-description">${item.description}</div>
        `;
  menuContainer.appendChild(menuItem);
});

// function to randomize a meal

function randomizeMeal() {
  const randomIndex = Math.floor(Math.random() * menu.length);
  const meal = menu[randomIndex];
  const randomMealDiv = document.getElementById("random-meal");
  randomMealDiv.innerHTML = `
          <h2>${meal.title}</h2>
          <img class="ran" src="${meal.img}" alt="${meal.title}">
      `;
}

document.addEventListener("DOMContentLoaded", function () {
  let availabilityInfo = document.getElementById("availabilityInfo");
  let checkAvailabilityButton = document.getElementById("checkAvailability");
  let viewFilledSpotsButton = document.getElementById("viewFilledSpots");
  let submitReservationButton = document.getElementById("submitReservation");
  let filledSpotsList = document.getElementById("filledSpotsList");
  let availableDatesList = document.getElementById("availableDatesList");
  let maxCapacity = 10;
  let reservations = [];
  let availableDates = generateAvailableDates(reservations);

  // Function to generate the first and last Friday of each month for the rest of 2023
  function generateAvailableDates(reservations) {
    let availableDatesx = reservations;
    if ((reservations.length = 0)) {
      for (let month = 10; month <= 12; month++) {
        const firstDay = new Date(2023, month - 1, 1);
        const lastDay = new Date(2023, month, 0);

        const firstSaturday = new Date(firstDay);
        const lastSaturday = new Date(lastDay);

        while (firstSaturday.getDay() !== 6) {
          firstSaturday.setDate(firstSaturday.getDate() + 1);
        }
        while (lastSaturday.getDay() !== 6) {
          lastSaturday.setDate(lastSaturday.getDate() - 1);
        }

        availableDatesx.push(firstSaturday.toISOString().slice(0, 10), lastSaturday.toISOString().slice(0, 10));
      }
    }

    return availableDatesx;
  }

  // Populate the list of available dates with capacity
  availableDates.forEach((date) => {
    let formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
    // Create a div element for the date and capacity
    let dateDiv = document.createElement("div");
    dateDiv.textContent = `${formattedDate} Capacity: ${maxCapacity}`;
    availableDatesList.appendChild(dateDiv);
  });

  checkAvailabilityButton.addEventListener("click", function () {
    // Get user input
    const name = document.getElementById("name").value;
    const selectedDate = document.getElementById("date").value;
    const guestsInput = document.getElementById("guests").value;
    const numberOfGuests = parseInt(guestsInput);

    // Check if all required fields (name, selectedDate, numberOfGuests) are filled
    if (!name || !selectedDate || isNaN(numberOfGuests)) {
      console.log("Please fill out all required fields.");
      return;
    }

    const dietaryRestrictions = document.getElementById("dietary").value;

    // Loading data
    if (availableDates.includes(selectedDate)) {
      const seatsAvailable = maxCapacity - numberOfGuests;
      if (seatsAvailable >= 0) {
        reservations.push({
          name: name,
          date: selectedDate,
          guests: numberOfGuests,
          dietary: dietaryRestrictions,
        });
        availabilityInfo.textContent = `Reservation for ${numberOfGuests} guests on ${selectedDate} is confirmed for ${name}.`;

        const confirmViewFilledSpots = confirm("Reservation submitted successfully. Do you want to view filled spots?");
        if (confirmViewFilledSpots) {
          viewFilledSpotsButton.click();
        }
      } else {
        availabilityInfo.textContent = `Sorry, there are not enough seats available for ${numberOfGuests} guests on ${selectedDate}. Please choose a different date or reduce the number of guests.`;
      }
    }
  });

  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const confirmation = document.getElementById("reservation-confirmation");
    const name = document.getElementById("name").value;
    const guests = document.getElementById("guests").value;
    const menu = document.getElementById("menu").value;
    const date = document.getElementById("date").value;
    const dietaryRestrictions = document.getElementById("dietary").value;

    confirmation.innerHTML = `Thank you ${name}, for your reservation on ${date} for ${guests} guests. Enjoy your ${menu}!`;

    return alert(`Thank you ${name}, for your reservation on ${date} for ${guests} guests. Enjoy your ${menu} meal! 🍲`);
  });
});

//function takes in and pops returns an array
// if someone clicks on the button it will push the reservation to the array, and remove the

const confirmation = document.getElementById("reservation-confirmation");

// (function(){
//   var d = document,
//   accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
//   setAria,
//   setAccordionAria,
//   switchAccordion,
//   touchSupported = ('ontouchstart' in window),
//   pointerSupported = ('pointerdown' in window);

//   skipClickDelay = function(e){
//     e.preventDefault();
//     e.target.click();
//   }

//     setAriaAttr = function(el, ariaType, newProperty){
//     el.setAttribute(ariaType, newProperty);
//   };
//   setAccordionAria = function(el1, el2, expanded){
//     switch(expanded) {
//       case "true":
//         setAriaAttr(el1, 'aria-expanded', 'true');
//         setAriaAttr(el2, 'aria-hidden', 'false');
//         break;
//       case "false":
//         setAriaAttr(el1, 'aria-expanded', 'false');
//         setAriaAttr(el2, 'aria-hidden', 'true');
//         break;
//       default:
//         break;
//     }
//   };
// //function
// switchAccordion = function(e) {
//   console.log("triggered");
//   e.preventDefault();
//   var thisAnswer = e.target.parentNode.nextElementSibling;
//   var thisQuestion = e.target;
//   if(thisAnswer.classList.contains('is-collapsed')) {
//     setAccordionAria(thisQuestion, thisAnswer, 'true');
//   } else {
//     setAccordionAria(thisQuestion, thisAnswer, 'false');
//   }
//     thisQuestion.classList.toggle('is-collapsed');
//     thisQuestion.classList.toggle('is-expanded');
//     thisAnswer.classList.toggle('is-collapsed');
//     thisAnswer.classList.toggle('is-expanded');

//     thisAnswer.classList.toggle('animateIn');
//   };
//   for (var i=0,len=accordionToggles.length; i<len; i++) {
//     if(touchSupported) {
//       accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
//     }
//     if(pointerSupported){
//       accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
//     }
//     accordionToggles[i].addEventListener('click', switchAccordion, false);
//   }
// })();
