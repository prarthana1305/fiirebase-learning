/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
  apiKey: "AIzaSyDpB2b--kgnT1zhCTH7Ed1HSNHAyYJYoJg",
  authDomain: "moody-74c6f.firebaseapp.com",
  projectId: "moody-74c6f",
  storageBucket: "moody-74c6f.firebasestorage.app",
  messagingSenderId: "804142543015",
  appId: "1:804142543015:web:67ce958a80e3d973ab2b82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(); //initialize the Firebase Authentication service
//   console.log("Firebase initialized", app)

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");
const signInWithGoogleButtonEl = document.getElementById(
  "sign-in-with-google-btn"
);
const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");
const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");
const signOutButtonEl = document.getElementById("sign-out-btn");
const userProfilePictureEl = document.getElementById("user-profile-picture");
const userGreetingEl = document.getElementById("user-greeting");
const displayNameInputEl = document.getElementById("display-name-input");
const photoURLInputEl = document.getElementById("photo-url-input");

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);
signOutButtonEl.addEventListener("click", authSignOut);

/* === Main Code === */
showLoggedOutView();

/* === Functions === */

/* = Functions - Firebase - Authentication = */
onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showProfilePicture(userProfilePictureEl, user);
    showUserGreeting(userGreetingEl, user);
  } else {
    showLoggedOutView();
  }
});

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //   showLoggedInView();
      clearAuthFields();
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error creating account:", error);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
      //   showLoggedInView();
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      //   showLoggedOutView();
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
    });
}

function authSignInWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in with Google");
      // showLoggedInView();
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
    });
}

function showProfilePicture(imgElement, user) {
  const photoURL = user.photoURL;

  if (photoURL) {
    imgElement.src = photoURL;
  } else {
    imgElement.src = "assets/providers/default-profile-picture.webp";
  }
}

function showUserGreeting(element, user) {
  const displayName = user.displayName;
  if (displayName) {
    element.innerText = `Welcome, ${displayName}!`;
  } else {
    element.innerText = "Hey friend , how are you!";
  }
}

function authUpdateProfile() {
  const newDisplayName = displayNameInputEl.value;
  const newPhotoURL = photoURLInputEl.value;
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: newDisplayName,
    photoURL: newPhotoURL,
  })
    .then(() => {
      console.log("Profile updated successfully");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showView(viewLoggedOut);
}

function showLoggedInView() {
  hideView(viewLoggedOut);
  showView(viewLoggedIn);
}

function showView(view) {
  view.style.display = "flex";
}

function hideView(view) {
  view.style.display = "none";
}

function clearInputField(field) {
  field.value = "";
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}
