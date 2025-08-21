function updateSceneName(){
    let textBox = document.getElementById("sceneNameTextBox");
    textBox.value = sceneName;
}

function updateInitializingCharactersList(){
    let selectionInput = document.getElementById("selectInitiatingCharacter");
    let pleaseSelectEntry = document.createElement("option");
    pleaseSelectEntry.text = "Please Select...";
    selectionInput.replaceChildren(pleaseSelectEntry);

    Object.keys(jsonObject.Data).forEach((val) => {
        let newChoice = document.createElement("option");
        newChoice.value = val;
        newChoice.text = val;
        selectionInput.appendChild(newChoice);
    });
}

function updateCharactersList(){
    let charactersList = document.getElementById("charactersList");
    charactersList.replaceChildren();

    jsonObject.Data[selectedInitialCharacter].Characters.forEach((val) => {
        let newCharacter = document.createElement("li");
        newCharacter.textContent = val.Name + ", " + val.Expression;
        charactersList.appendChild(newCharacter);
    });
}