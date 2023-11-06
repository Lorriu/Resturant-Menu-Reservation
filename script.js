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
          <h2> Would you like to try ${meal.title}? </h2>
          <img class="ran" src="${meal.img}" alt="${meal.title}">
      `;
}

// DOM event listener when 1. confirm details is clicked in form, saves in local storage and shows info
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitReservation");
  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const guestsInput = document.getElementById("guests");

  submitButton.addEventListener("click", function () {
    event.preventDefault(); 
    const name = nameInput.value;
    const selectedDate = dateInput.value;
    const numberOfGuests = parseInt(guestsInput.value);

    if (!name || !selectedDate || isNaN(numberOfGuests)) {
      alert("Please fill out all required fields.");
    } else {
      const menuSelection = document.getElementById("menu").value;
      alert(
        `Thank you ${name}, for your reservation on ${selectedDate} for ${numberOfGuests} guests. Looking forward to enjoying ${menuSelection} with you!! 🍲`
      );

  // Store the reservation details in local storage
      const reservationDetails = {
        name,
        selectedDate,
        numberOfGuests,
        menuSelection,
      };
      localStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationDetails)
      );

  // Reload the page in case you want to change
      location.reload();

  // Display the button to send reservation details
      document.getElementById("sendReservationButton").style.display = "block";
    }
  });

  // Event listener for the "2. Send me the deets" aka Send Reservation button
  document
    .getElementById("sendReservationButton")
    .addEventListener("click", function () {
      // Get the reservation details from local storage
      const storedReservationDetails =
        localStorage.getItem("reservationDetails");

      if (storedReservationDetails) {
        const reservationDetails = JSON.parse(storedReservationDetails);
        // const phoneNumber = prompt('Please enter the phone number for sending the reservation details via text:');

        const message = `Hey there! Here's my reservation for your dinner party! \n Name: ${reservationDetails.name}\n Date: ${reservationDetails.selectedDate}\n Guests: ${reservationDetails.numberOfGuests}\n Preference: ${reservationDetails.menuSelection}`;

        if (confirm("Do you want to send the reservation details via text?")) {
          // Open the SMS app with the message and phone number
          window.open(`sms:$?&body=${message}`);
        }
      } else {
        alert("No reservation details found.");
      }
    });
});
