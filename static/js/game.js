var ref = new Firebase("https://spyfallgame.firebaseio.com/rooms/" + groupKey);
var rules = new Firebase("https://spyfallgame.firebaseio.com/rules/");

var playerData = {
    name: '',
    id: 0
};


function loadGame() {
    loadLocations();
    loadPlayers();
}

function loadPlayers() {
    var source = $("#player-template").html();
    var template = Handlebars.compile(source);


    //load locations
    ref.orderByChild("name").on("child_added", function (snapshot) {
        var json = snapshot.val();
        //console.log(json);
        // console.log(json.name)
        var key = snapshot.key();
        json.key = key;
        $('#playerList').append(template(json));
    });

    ref.on("child_removed", function (snapshot) {
        var json = snapshot.val();
        //console.log(json);
        //console.log(snapshot.key());

        // console.log(json.name)
        $('#' + snapshot.key()).replaceWith();
    });
}

function loadLocations() {
    var source = $("#location-template").html();
    var template = Handlebars.compile(source);


    //load locations
    rules.child("locations/").on("child_added", function (snapshot) {
        //var json = snapshot.val();
        //console.log(json);
        // console.log(json.name)
        $('#locationList').append(template(snapshot.val()));
    });
}

function joinGame() {
    var name = prompt("Enter your name");
    if (!name) {
        return;
    }
    playerData.id = ref.push({
        name: name
    }).key();

    playerData.name = name;

    //if 0 players, close room
    //ref.onDisconnect().remove();

    //else only remove yourself
    console.log(playerData.id);
    ref.child(playerData.id).onDisconnect().remove();


    $("#playerInfo").text(name);
}


function startGame() {
    //choose location randomly
    var currentLocation = {
        id: 0,
        name: ''
    };

    var rand = Math.floor(Math.random() * 30);
    rules.child("locations/").on("child_added", function (snapshot) {
        snapshot.forEach(function (loc) {
            if (snapshot.key() == rand) {
                currentLocation.id = snapshot.key();
                currentLocation.name = loc.val();
            }
        });
    });

    ref.update({
        location: {
            id: currentLocation.id,
            locName: currentLocation.name
        }
    });

    //assign jobs
    //start timer
    //display info


}

function leaveGame() {

}


function timer(endTime) {

}

function endGame() {

}