////////////////////////////////////////////////////////////////////////////////
///   P a g e  E v e n t   H a n d l e r s
////////////////////////////////////////////////////////////////////////////////

/************************************************/
function onPageLoad () {
    // Wire up all button handlers
    document.getElementById('newBtn').onclick = function() {
        onNewClick();
    };
    document.getElementById('cancelBtn').onclick = function() {
        onFormCancel();
    };
    document.getElementById('rerollBtn').onclick = function() {
        onRerollClick();
    }

    modelCreateCharacter("John Smith", [10,10,10,10,10,10], "Human", "Wizard", 1, true);
    modelCreateCharacter("Sarah Jensen", [12,8,14,16,8,6], "Orc", "Barbarian", 0, true);
    modelCreateCharacter("Ricardo Torres", [8,16,18,16,4,6], "Dwarf", "Monk", 1, true);
    modelCreateCharacter("Amy Perkins", [12,12,12,12,12,12], "Halfling", "Fighter", 0, false);

    var items = modelReadAllCharacters();
    
    for (var i = 0; i < items.length; i++){
        addTableRow(items[i]);
        
    }
    clearInputForm();
}

/************************************************/
function onNewClick() {
    // Set the header text.
    document.getElementById('formTitle').innerHTML = "New Character";
    document.getElementById('newBtn').innerHTML + "You Clicked Me!";
    reroll();

    document.getElementById('characterEditArea').style.display='block';
    document.getElementById('charactersListArea').style.display='none';
    document.getElementById('rerollBtn').style.display='block';
    
    document.getElementById('saveBtn').onclick = function() {
        onFormSave();
    };
    
}

/************************************************/
function onFormCancel() {
    clearInputForm();
}

function onRerollClick() {
    reroll();
}

function reroll() {
    var form = document.forms['characterEditForm'];
    form.str.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    form.dex.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    form.con.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    form.int.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    form.wis.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    form.cha.value = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
}

/************************************************/
function onFormSave(id) {
    // Validate the data in all the controls.
    if (!validateForm())
        return;

    var form = document.forms['characterEditForm'];
    if (id) {
         var editedCharacter = modelUpdateCharacter(
            id,
            form.nameEdit.value,
            [form.str.value, form.dex.value, form.con.value, form.int.value, form.wis.value, form.cha.value],
            form.raceEdit.value,
            form.classEdit.value,
            form.genderRadio.value,
            form.rightHanded.checked);
        
        updateTableRow(editedCharacter);
    }
    else {
        // Get the data from the form controls, and
        // create a new Character object.
        var newCharacter = modelCreateCharacter(
            form.nameEdit.value,
            [form.str.value, form.dex.value, form.con.value, form.int.value, form.wis.value, form.cha.value],
            form.raceEdit.value,
            form.classEdit.value,
            form.genderRadio.value,
            form.rightHanded.checked);

        // Add the new character to the view
        addTableRow(newCharacter);
        
    }
    // Clear the input form and all errors.
    clearInputForm()
}

/************************************************/
function onItemDelete(id) {
    // Fetch the student record from the model
    var character = modelReadCharacter(id);
    if (character == null) {
        alert("Error: unable to find character ID " + id)
    }

    if (!confirm("Are you sure you want to delete " + character.name + "?"))
        return;

    modelDeleteCharacter(id);

    var tr = document.getElementById('row' + character.id);
    tr.remove();
}

/************************************************/
function onItemEdit(itemId) {
    // Set the header text.
    document.getElementById('formTitle').innerHTML = "Edit Character";

    var form = document.forms['characterEditForm'];

    var item = modelReadCharacter(itemId);

    form.nameEdit.value,
    [form.str.value, form.dex.value, form.con.value, form.int.value, form.wis.value, form.cha.value],
    form.raceEdit.value,
    form.classEdit.value,
    form.genderRadio.selectedIndex,
    form.rightHanded.checked

    form.nameEdit.value = item.name;
    form.str.value = item.attributes[0];
    form.dex.value = item.attributes[1];
    form.con.value = item.attributes[2];
    form.int.value = item.attributes[3];
    form.wis.value = item.attributes[4];
    form.cha.value = item.attributes[5];
    form.classEdit.value = item.job;
    form.raceEdit.value = item.race;
    form.genderRadio.value = item.gender;
    form.rightHanded.checked = item.rightHanded;

    document.getElementById('saveBtn').onclick = function() {
        onFormSave(itemId);
    };

    document.getElementById('characterEditArea').style.display='block';
    document.getElementById('charactersListArea').style.display='none';
    document.getElementById('rerollBtn').style.display='none';
}


////////////////////////////////////////////////////////////////////////////////
///   B u s i n e s s   L o g i c
////////////////////////////////////////////////////////////////////////////////

/************************************************/
function clearInputForm() {
    // Hide the form, show the character list.
    document.getElementById('characterEditArea').style.display='none';
    document.getElementById('charactersListArea').style.display='block';

    // Reset all form controls
    var form = document.forms['characterEditForm'];

    form.nameEdit.value = '';
    form.raceEdit.value = 'Human';
    form.classEdit.value = 'Fighter';
    form.genderRadio.value = 0;
    form.rightHanded.checked = true;

    // Reset all validation errors
    document.getElementById('nameError').innerHTML = '';
}

/************************************************/
function validateForm() {
    var form = document.forms['characterEditForm'];

    var validated = true;
    
    // Name textbox
    if (form.nameEdit.value == "") {
        document.getElementById("nameError").innerHTML = "Name not given.";
        validated = false;
    }
    else
        document.getElementById("nameError").innerHTML = "";

    // Return the final result
    return validated;
}

function updateTableRow(character) {
    var id = 'row' + character.id;
    var gender = "Female";
    var tr = document.getElementById(id);
    if(character.gender == 1)
        gender = "Male";
    console.log(character.gender);
    tr.childNodes[0].innerHTML = character.name;
    tr.childNodes[1].innerHTML = character.race;
    tr.childNodes[2].innerHTML = character.job;
    tr.childNodes[3].innerHTML = gender;
}

function addTableRow(character) {
    var table = document.getElementById("charactersTable");
    // Compose a new row, and set its id attribute.  This helps us
    // if the user wants to change the student's info later.
    var row = table.insertRow(table.rows.length);
    row.id = "row" + character.id;

    var cell = row.insertCell(0);
    cell.innerText = character.name;

    cell = row.insertCell(1);
    cell.innerText = character.race;

    cell = row.insertCell(2);
    cell.innerText = character.job;

    cell = row.insertCell(3);
    cell.innerText = character.gender? "Male" : "Female";

    cell = row.insertCell(4);
    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.type = "button";
    editBtn.onclick = function() {
        onItemEdit(character.id);
    }
    cell.appendChild(editBtn);

    cell = row.insertCell(5);
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.type = "button";
    deleteBtn.onclick = function() {
        onItemDelete(character.id);
    }
    cell.appendChild(deleteBtn);
}