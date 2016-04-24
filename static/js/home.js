function createGame() {
    var ref = new Firebase("https://spyfallgame.firebaseio.com/rooms/");

    var id = ID();
    //console.log(id);


    ref.once("value", function (snapshot) {
        var roomExists = snapshot.child(id).exists();
        //console.log(roomExists);

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
            0: {
                name: "AIRPLANE", roles: {
                    0: "Spy",
                    1: "First Class Passenger",
                    2: "Air Marshall",
                    3: "Mechanic",
                    4: "Economy Class Passenger",
                    5: "Stewardess",
                    6: "Co-Pilot",
                    7: "Captain"
                }
            },
            1: {
                name: "AMUSEMENT PARK", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            2: {
                name: "BANK", roles: {
                    0: "Spy",
                    1: "Armored Car Driver",
                    2: "Manager",
                    3: "Consultant",
                    4: "Customer",
                    5: "Robber",
                    6: "Security Guard",
                    7: "Teller"
                }
            },
            3: {
                name: "BEACH", roles: {
                    0: "Spy",
                    1: "Beach Waitress",
                    2: "Kite Surfer",
                    3: "Lifeguard",
                    4: "Thief",
                    5: "Beach Goer",
                    6: "Beach Photographer",
                    7: "Ice Cream Truck Driver"
                }
            },
            4: {
                name: "CARNIVAL", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            5: {
                name: "CASINO", roles: {
                    0: "Spy",
                    1: "Bartender",
                    2: "Head Security Guard",
                    3: "Bouncer",
                    4: "Manager",
                    5: "Hustler",
                    6: "Dealer",
                    7: "Gambler"
                }
            },
            6: {
                name: "CIRCUS TENT", roles: {
                    0: "Spy",
                    1: "Acrobat",
                    2: "Animal Trainer",
                    3: "Magician",
                    4: "Visitor",
                    5: "Fire Eater",
                    6: "Clown",
                    7: "Juggler"
                }
            },
            7: {
                name: "CORPORATE PARTY", roles: {
                    0: "Spy",
                    1: "Entertainer",
                    2: "Manager",
                    3: "Unwelcomed Guest",
                    4: "Owner",
                    5: "Secretary",
                    6: "Accountant",
                    7: "Delivery Boy"
                }
            },
            8: {
                name: "CRUSADER ARMY", roles: {
                    0: "Spy",
                    1: "Monk",
                    2: "Imprisoned Arab",
                    3: "Servant",
                    4: "Bishop",
                    5: "Squire",
                    6: "Archer",
                    7: "Knight"
                }
            },
            9: {
                name: "DAY SPA", roles: {
                    0: "Spy",
                    1: "Customer",
                    2: "Stylist",
                    3: "Masseuse",
                    4: "Manicurist",
                    5: "Makeup Artist",
                    6: "Dermatologist",
                    7: "Beautician"
                }
            },
            10: {
                name: "EMBASSY", roles: {
                    0: "Spy",
                    1: "Security Guard",
                    2: "Secretary",
                    3: "Ambassador",
                    4: "Government Official",
                    5: "Tourist",
                    6: "Refugee",
                    7: "Diplomat"
                }
            },
            10: "Spy",
            1: {
                name: "HOSPITAL", roles: {
                    0: "Spy",
                    1: "Nurse",
                    2: "Doctor",
                    3: "Anesthesiologist",
                    4: "Intern",
                    5: "Patient",
                    6: "Therapist",
                    7: "Surgeon"
                }
            },
            12: {
                name: "HOTEL", roles: {
                    0: "Spy",
                    1: "Doorman",
                    2: "Security Guard",
                    3: "Manager",
                    4: "Housekeeper",
                    5: "Customer",
                    6: "Bartender",
                    7: "Bellman"
                }
            },
            13: {
                name: "MILITARY BASE", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            14: {
                name: "MOVIE STUDIO", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            15: {
                name: "NIGHTCLUB", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            16: {
                name: "OCEAN LINER", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            17: {
                name: "PASSENGER TRAIN", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            18: {
                name: "PIRATE SHIP", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            19: {
                name: "POLAR STATION", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            20: {
                name: "POLICE STATION", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            20: "Spy",
            1: {
                name: "RESTAURANT", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            22: {
                name: "SCHOOL", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            23: {
                name: "SERVICE STATION", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            24: {
                name: "SPACE STATION", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            25: {
                name: "SUBMARINE", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            26: {
                name: "SUPERMARKET", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            27: {
                name: "THEATER", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            28: {
                name: "UNIVERSITY", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            },
            29: {
                name: "ZOO", roles: {
                    0: "Spy",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: ""
                }
            }
        }
    });
}