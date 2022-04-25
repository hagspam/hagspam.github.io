////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

// This is an array to keep track of all the constacts that have been entered.
var characterList = [];

// This is an internal ID that we give each new contact object.  
var nextCharacterId = 1000;


/************************************************/
function Character(name, attributes, race, job, gender, rightHanded) {
    this.id = nextCharacterId++;
    this.name = name;
    this.attributes = attributes;
    this.race = race;
    this.job = job;
    this.gender = gender;
    this.rightHanded = rightHanded;
}

/************************************************/
function modelCreateCharacter(name, attributes, race, job, gender, rightHanded) {
    var newCharacter = new Character(
        name,
        attributes,
        race,
        job,
        gender,
        rightHanded);

    // Add the new Character object to the model.
    characterList.push(newCharacter);

    // Return the new Character
    return newCharacter;
}

/************************************************/
function modelReadAllCharacters() {
    return characterList;
}


/************************************************/
function modelReadCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            return characterList[x];
        }
    }

    return null;
}


/************************************************/
function modelUpdateCharacter(id, name, attributes, race, job, gender, rightHanded) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            characterList[x].name = name;
            characterList[x].attributes = attributes;
            characterList[x].race = race;
            characterList[x].job = job;
            characterList[x].gender = gender;
            characterList[x].rightHanded = rightHanded;

            return characterList[x];
        }
    }

    return null;
}

/************************************************/
function modelDeleteCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            characterList.splice(x, 1);
        }
    }
}
