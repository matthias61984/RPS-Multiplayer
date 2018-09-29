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
    connectedRef.on("value", function(snap) {
        if (snap.val()) {
          var con = connectionsRef.push(true);
          con.onDisconnect().remove();
        }
      });
    
    $("#nameEntry").on("click", function(event) {
        event.preventDefault();
        var input = $("input").val().trim();
        connectionsRef.on("value", function(snap) {
            if ($("#player1name").val("Donkey1") == true) {
                usersRef.set({
                    player1: input,
                    wins: 0,
                    losses: 0,
                })
                $("#player1name").text(input);
            } else {
                usersRef.set({
                    player2: input,
                    wins: 0,
                    losses: 0,
                })
                $("#player2name").text(input);
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