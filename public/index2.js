import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3PHP8N26-yXnelG-7MdHerrbdy646HbQ",
    authDomain: "forms-e6b1b.firebaseapp.com",
    databaseURL: "https://forms-e6b1b-default-rtdb.firebaseio.com", // Added databaseURL
    projectId: "forms-e6b1b",
    storageBucket: "forms-e6b1b.appspot.com",
    messagingSenderId: "351846427381",
    appId: "1:351846427381:web:8fa2e58d8fe913a35a73bc",
    measurementId: "G-NLDRYGBYM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save data to Firebase
function saveData() {
    console.log("saveData function called"); // Debugging log

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Validate form data
    if (!name || !email) {
        alert("Please fill out all fields.");
        return;
    }

    const formData = { name, email };
    const usersRef = ref(database, "users"); // Reference the 'users' node

    // Push data to Firebase
    push(usersRef, formData)
        .then(() => {
            alert("Data saved successfully!");
            console.log("Data saved:", formData);
        })
        .catch((error) => {
            console.error("Error saving data:", error.message, error.code);
        });
}

// Attach saveData function to form submission
document.getElementById("dataForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    saveData();
});
