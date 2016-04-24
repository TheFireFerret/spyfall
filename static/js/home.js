function createGame() {
    var ref = new Firebase("https://spyfallgame.firebaseio.com/rooms/");

    var id = ID();
    console.log(id);


    ref.once("value", function (snapshot) {
        var roomExists = snapshot.child(id).exists();
        console.log(roomExists);

        //find an open key
        while (roomExists) {
            id = ID();
            roomExists = snapshot.child(id).exists();
        }
    });


    window.location.replace("/room/" + id);

}

function rules() {
    var rules = new Firebase("https://spyfallgame.firebaseio.com/rules/");
    rules.set({
        maxPlayers: 8,
        locations: {
            0: {name: "AIRPLANE"},
            1: {name: "AMUSEMENT PARK"},
            2: {name: "BANK"},
            3: {name: "BEACH"},
            4: {name: "CARNIVAL"},
            5: {name: "CASINO"},
            6: {name: "CIRCUS TENT"},
            7: {name: "CORPORATE PARTY"},
            8: {name: "CRUSADER ARMY"},
            9: {name: "DAY SPA"},
            10: {name: "EMBASSY"},
            11: {name: "HOSPITAL"},
            12: {name: "HOTEL"},
            13: {name: "MILITARY BASE"},
            14: {name: "MOVIE STUDIO"},
            15: {name: "NIGHTCLUB"},
            16: {name: "OCEAN LINER"},
            17: {name: "PASSENGER TRAIN"},
            18: {name: "PIRATE SHIP"},
            19: {name: "POLAR STATION"},
            20: {name: "POLICE STATION"},
            21: {name: "RESTAURANT"},
            22: {name: "SCHOOL"},
            23: {name: "SERVICE STATION"},
            24: {name: "SPACE STATION"},
            25: {name: "SUBMARINE"},
            26: {name: "SUPERMARKET"},
            27: {name: "THEATER"},
            28: {name: "UNIVERSITY"},
            29: {name: "ZOO"}
        }
    });
}