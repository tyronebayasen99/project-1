var firebaseConfig = {
    apiKey: "AIzaSyBBKQgmkoGusn-CCK6_b2Pp5mh0uaeT0Sc",
    authDomain: "project-food-48382.firebaseapp.com",
    databaseURL: "https://project-food-48382.firebaseio.com",
    projectId: "project-food-48382",
    storageBucket: "project-food-48382.appspot.com",
    messagingSenderId: "392755218679",
    appId: "1:392755218679:web:2f531484e721ae0c346bf2",
    measurementId: "G-PLG5EV7X6P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// var database = firebase.database();
const auth = firebase.auth();
const db = firebase.firestore();
var userSignIn = localStorage.getItem("userSignin");

let userSignin;
if (localStorage.getItem("userSignin") === "true" || localStorage.getItem("userSignin") === "false") {
    userSignin = localStorage.getItem("userSignin")
    console.log(userSignin);
}


$("#logout").hide();

// Listen for auth status change
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user)
    } else {
        console.log('user logged out');
    }
});

function checkAccount() {
    if (userSignIn === 'true') {
        $("#login").hide();
        $("#signup").hide();
        $("#logout").show();
    }
  };
  
  checkAccount();



// Signup
$('#signup-btn').on('click', function () {
    // grabbing user info
    const email = $('#signup-email').val().trim();
    const password = $('#signup-pass').val().trim();

    console.log(email, password);

    // sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        userSignin = "true";
        if (userSignin === "true") {
            hideNav();
            localStorage.setItem("userSignin", "true");
        }

    });

    $('.modal').modal('hide');

    $('.validate').val('');

    
});

// Login
$('#login-btn').on('click', function () {
    const email = $('#login-email').val().trim();
    const password = $('#login-pass').val().trim();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
    });

    $('.modal').modal('hide');

    $('.validate').val('');
    checkAccount()
});

// Logout
$('#logout').on('click', function () {
    auth.signOut().then(cred => {

        $("#signup").show();
        $("#login").show();
        $("#logout").hide();
        
    });
});
