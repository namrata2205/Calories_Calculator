// ===== CALORIE CALCULATOR =====
function calculateCalories(event) {
  event.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = parseFloat(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = document.getElementById("activity").value;
  const resultBox = document.getElementById("resultBox");

  if (!gender || !age || !height || !weight || activity.includes("Select")) {
    resultBox.classList.remove("alert-success");
    resultBox.classList.add("alert-danger");
    resultBox.textContent = "⚠️ Please fill in all fields properly!";
    resultBox.classList.remove("d-none");
    return;
  }

  // Determine activity multiplier
  let multiplier = 1.2;
  if (activity.includes("Light")) multiplier = 1.375;
  else if (activity.includes("Moderately")) multiplier = 1.55;
  else if (activity.includes("Very")) multiplier = 1.725;
  else if (activity.includes("Extremely")) multiplier = 1.9;

  // Calculate BMR
  let bmr = 0;
  if (gender === "Male") {
    bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  } else {
    bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  }

  const totalCalories = bmr * multiplier;

  resultBox.classList.remove("d-none", "alert-danger");
  resultBox.classList.add("alert-success");
  resultBox.innerHTML = `✅ Your estimated daily calorie need is <strong>${totalCalories.toFixed(0)} kcal</strong>.`;
}

// Attach calculator form
const calcForm = document.querySelector(".calc-section form");
if (calcForm) calcForm.addEventListener("submit", calculateCalories);

// ===== FOOD TRACKER (Single dropdown, multiple entries) =====
let totalCalories = 0;
let foodsEaten = [];

function trackFood(event) {
  event.preventDefault();

  const foodSelect = document.getElementById("food");
  const quantityInput = document.getElementById("quantity");
  const notes = document.getElementById("notes").value;
  const output = document.getElementById("foodResult");
  const listDiv = document.getElementById("foodList");

  const selected = foodSelect.options[foodSelect.selectedIndex];
  if (!selected || selected.disabled) {
    output.textContent = "⚠️ Please select a valid food item.";
    output.className = "alert alert-danger";
    return;
  }

  const qty = quantityInput.value ? parseInt(quantityInput.value) : 1;
  const calories = parseFloat(selected.value) * qty;

  foodsEaten.push(`${selected.text} × ${qty} = ${calories} kcal`);
  totalCalories += calories;

  listDiv.innerHTML = `<strong>Items added:</strong><br>${foodsEaten.join("<br>")}`;

  output.className = "alert alert-success mt-3";
  output.innerHTML = `
    🔥 <strong>Total Calories:</strong> ${totalCalories} kcal
    ${notes ? `<br><em>Notes:</em> ${notes}` : ""}
  `;

  // reset selection
  foodSelect.selectedIndex = 0;
  quantityInput.value = "";
  notes.value = "";
}

const foodForm = document.getElementById("foodForm");
if (foodForm) foodForm.addEventListener("submit", trackFood);
// ===== CONTACT FORM =====
function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const contactResult = document.getElementById("contactResult");

  if (!name || !email || !message) {
    contactResult.classList.remove("alert-success");
    contactResult.classList.add("alert-danger");
    contactResult.textContent = "⚠️ Please fill all fields!";
    contactResult.classList.remove("d-none");
    return;
  }

  contactResult.classList.remove("d-none", "alert-danger");
  contactResult.classList.add("alert-success");
  contactResult.innerHTML = `✅ Thank you, <strong>${name}</strong>! Your message has been sent successfully.`;
}

const contactForm = document.querySelector("section form");
if (contactForm && document.title.includes("Contact")) {
  contactForm.addEventListener("submit", handleContactForm);
}
