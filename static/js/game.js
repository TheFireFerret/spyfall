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

    var ysource = $("#your-template").html();
    var ytemplate = Handlebars.compile(ysource);


    //load players
    ref.child("players/").orderByChild("name").on("child_added", function (snapshot) {
        var json = snapshot.val();
        //console.log(json);
        // console.log(json.name)
        json.key = snapshot.key();
        $('#playerList').append(template(json));
    });

    //remove players
    ref.child("players/").on("child_removed", function (snapshot) {
        //var json = snapshot.val();
        //console.log(json);
        //console.log(snapshot.key());

        // console.log(json.name)
        $('#' + snapshot.key()).replaceWith();
    });

    //update players / roles
    ref.child("players/").orderByChild("name").on("child_changed", function (snapshot) {
        var json = snapshot.val();
        var key = snapshot.key();
        json.key = key;
        //console.log(json);
        $('#' + snapshot.key()).replaceWith(template(json));

        //update your own info
        if (key === playerData.id) {
            $('#playerInfo').empty().append(ytemplate(json));
            if (json.time != '-1') {
                countDown(json.time);
                //console.log(json.time);
            }
        }
    });
}


function loadLocations() {
    var source = $("#location-template").html();
    var template = Handlebars.compile(source);


    //load locations
    rules.child("locations/").on("child_added", function (snapshot) {
        $('#locationList').append(template(snapshot.val()));
    });
}

function strikethroughToggle(string){
    var ele = document.getElementById(string);
    var dec = $(ele).css("text-decoration");

    var isStruck = (dec == "line-through");

    if (isStruck) {
        ele.style.setProperty("text-decoration", "none");

    } else {
        ele.style.setProperty("text-decoration", "line-through");
    }
}


function joinGame() {
    var name = prompt("Enter your name");
    if (!name) {
        return;
    }

    //TODO say no if the game is full

    //ref.once("value", function (snapshot) {
    //    var count = snapshot.child(id);
    //    //console.log(roomExists);
    //
    //    //find an open key
    //    while (roomExists) {
    //        id = ID();
    //        roomExists = snapshot.child(id).exists();
    //    }
    //});

    playerData.id = ref.child("players/").push({
        name: name,
        time: '-1'
    }).key();

    playerData.name = name;


    //only remove yourself
    //console.log(playerData.id);
    ref.child("players/" + playerData.id).onDisconnect().remove();

    ref.child("players/").on("child_removed", function (snapshot) {
        if (!snapshot) {
            ref.onDisconnect().remove();
        }
    });

    $("#playerInfo").text(name);
    //var ysource = $("#your-template").html();
    //var ytemplate = Handlebars.compile(source);
    //
    //$('#playerInfo').append(ytemplate(json));


}

//function clearGame(){
//    ref.child("players/").orderByChild("name").on("value", function (snapshot) {
//        snapshot.forEach(function (snap) {
//            var json = snap.val();
//            //console.log(json);
//
//        });
//    });
//}

function startGame() {
    var players = [];
    var roles = [];

    //choose location randomly
    var currentLocation = {
        id: 0,
        name: '',
        roleID: 0,
        role: ''
    };

    //var rand = Math.floor(Math.random() * 30);
    var rand = 0;
    rules.child("locations/").on("child_added", function (snapshot) {
        //snapshot.forEach(function (loc) {
        if (snapshot.key() == rand) {
            currentLocation.id = snapshot.key();
            currentLocation.name = snapshot.val().name;
            //console.log(snapshot.val().roles.slice());
            roles = snapshot.val().roles.slice();

            //console.log(snapshot.val());
        }
        //});
    });


    //assign jobs

    var playerCount = 0;
    //get players
    ref.child("players/").on("child_added", function (snapshot) {
        var json = snapshot.val();
        var key = snapshot.key();
        players.push(key);
        playerCount++;
    });

    //console.log(roles);
    //assign spy
    var spyPlayer = Math.floor(Math.random() * playerCount);
    ref.child("players/" + players[spyPlayer]).update({
        location: {
            id: currentLocation.id,
            locName: "???",
            roleID: 0,
            role: roles[0]
        }
    });

    delete players[spyPlayer];

    roles = roles.slice(1);
    roles = shuffle(roles);

    var i = 1;
    players.forEach(function (playerID) {
        //console.log(playerID);
        ref.child("players/" + playerID).update({
            location: {
                id: currentLocation.id,
                locName: currentLocation.name,
                roleID: i,
                role: roles[i]
            }
        });
        i++;
    });


    //display info


    //start timer
    var now = new Date();
    var end = new Date(now.getTime() + playerCount * 60000);
    //console.log(end);
    //countDown(end);

    storeEndTimes(end);
}

function newGame() {
    location.reload();
}

function storeEndTimes(end) {
    //set end time
    ref.child("players/").orderByChild("name").on("value", function (snapshot) {
        snapshot.forEach(function (snap) {
            var playerID = snap.key();
            ref.child("players/" + playerID).update({
                time: end.toString()
            });
        });
    });
}


function countDown(dt) {
    if (dt === -1) {
        return;
    }
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    //var _day = _hour * 24;
    var timer;


    function showRemaining() {
        var now = new Date();
        var distance = end - now;

        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'Game Over!';
            endGame();

            return;
        }

        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#countdown').text(minutes + ":" + seconds);
    }

    showRemaining();
    timer = setInterval(showRemaining, 1000);
}


function endGame() {
    //storeEndTimes(-1);

    // Announce Spy
    ref.child("players/").orderByChild("name").on("value", function (snapshot) {
        snapshot.forEach(function (snap) {
            var json = snap.val();
            //console.log(json);
            if (json.location.roleID === 0) {
                alert(json.name + " is the spy!");
                //console.log(json.name);
                location.reload();
                return true;
            }
        });
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function isSafari() {
    return navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
}

function sharePopup(gameID) {
    if (isSafari()) {
        alert(window.location);
    } else {
        alert("CHROME!!");

    }
}