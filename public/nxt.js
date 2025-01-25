// Firebase configuration
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
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Function to handle form submission
  function submitFeedback() {
    const formData = new FormData(document.getElementById('feedback-form'));
    const feedback = {};
  
    // Iterate over form fields and collect data
    formData.forEach((value, key) => {
      feedback[key] = value;
    });
  
    // Validate that all questions are answered
    if (Object.keys(feedback).length < 19) {
      alert("Please provide a rating for all questions.");
      return;
    }
  
    // Store feedback in Firebase
    database.ref('users').push(feedback)
      .then(() => {
        alert("Thank you for your feedback!");
        document.getElementById('feedback-form').reset(); // Reset the form after submission
      })
      .catch((error) => {
        console.error("Error storing feedback: ", error);
        alert("There was an error submitting your feedback. Please try again later.");
      });
  }
  