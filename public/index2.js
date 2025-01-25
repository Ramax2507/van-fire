import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3PHP8N26-yXnelG-7MdHerrbdy646HbQ",
    authDomain: "forms-e6b1b.firebaseapp.com",
    databaseURL: "https://forms-e6b1b-default-rtdb.firebaseio.com",
    projectId: "forms-e6b1b",
    storageBucket: "forms-e6b1b.appspot.com",
    messagingSenderId: "351846427381",
    appId: "1:351846427381:web:8fa2e58d8fe913a35a73bc",
    measurementId: "G-NLDRYGBYM6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Google Sign-In
const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save user session
        const userRef = ref(database, `users/${user.uid}`);
        await set(userRef, {
            email: user.email,
            displayName: user.displayName,
            loginTime: new Date().toISOString(),
        });

        // Update UI
        document.getElementById("message").innerText = `Hello, ${user.displayName}! You are now signed in.`;
        document.getElementById("userInfo").innerHTML = `<p>Email: ${user.email}</p>`;
        document.getElementById("formPrompt").style.display = "block";
        document.getElementById("dataForm").style.display = "block";
    } catch (error) {
        console.error("Error signing in:", error);
        document.getElementById("message").innerText = `Error: ${error.message}`;
    }
};

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("message").innerText = `Welcome back, ${user.displayName}!`;
        document.getElementById("userInfo").innerHTML = `<p>Email: ${user.email}</p>`;
        document.getElementById("formPrompt").style.display = "block";
        document.getElementById("dataForm").style.display = "block";
    } else {
        document.getElementById("message").innerText = "You are not signed in.";
        document.getElementById("formPrompt").style.display = "none";
        document.getElementById("dataForm").style.display = "none";
    }
});

// Save form data
document.getElementById("dataForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Please fill out all fields.");
        return;
    }

    const responses = {};
    for (let i = 1; i <= 1; i++) { // Update 1 to the number of questions in your form
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        responses[`q${i}`] = selectedOption ? selectedOption.value : null;
    }

    const user = auth.currentUser;
    if (user) {
        try {
            await push(ref(database, `formResponses/${user.uid}`), {
                name,
                email,
                responses,
            });
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("An error occurred while saving your data. Please try again.");
        }
    } else {
        alert("User not authenticated.");
    }
});

// Attach event listener for Google Sign-In
window.googleSignIn = googleSignIn;