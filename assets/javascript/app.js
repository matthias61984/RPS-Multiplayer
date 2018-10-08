// Initialize Firebase
var config = {
    apiKey: "AIzaSyDvrSqX7KcnqxgNufqE3gnV1LAULzmyTrs",
    authDomain: "homework-c1eed.firebaseapp.com",
    databaseURL: "https://homework-c1eed.firebaseio.com",
    projectId: "homework-c1eed",
    storageBucket: "homework-c1eed.appspot.com",
    messagingSenderId: "216750042287"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();
var usersRef = ref.child("users");

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var userIam;
connectedRef.on("value", function (snap) {
    var con;
    if (snap.val()) {
        database.ref("/connections").once("value").then(ss => {
            if (ss.val() === null) {
                con = connectionsRef.push("player1");
                con.onDisconnect().remove();
                userIam="player1"
            } else if (Object.values(ss.val()).includes("player1")) {
                con = connectionsRef.push("player2");
                con.onDisconnect().remove();
                userIam="player2"
            } else {
                con = connectionsRef.push("player1");
                con.onDisconnect().remove();
                userIam="player1"
            }
            console.log(ss.val(), "data")
            console.log(userIam)
        })
        // var con = connectionsRef.push("true");
    }
});

$("#nameEntry").on("click", function (event) {
    event.preventDefault();
    var input = $("input").val().trim();
    connectionsRef.on("value", function (snap) {
        if (userIam = "player2") {
            usersRef.push({
                player2: input,
                wins: 0,
                losses: 0,
            })
            $("#player2name").text(input);
        } else if (userIam = "player1") {
            usersRef.push({
                player1: input,
                wins: 0,
                losses: 0,
            })
            $("#player1name").text(input);
        }
    });
    $("input").val("");
})

//    var clickCounter = 0;

// $("#click-button").on("click", function() {
//     clickCounter++;
//     database.ref().set({
//         clickCount: clickCounter
//     });
// });

// database.ref().on("value", function(snapshot) {
//     console.log(snapshot.val());
//     $("#click-value").text(snapshot.val().clickCount);
//     clickCounter = snapshot.val().clickCount;
// }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });