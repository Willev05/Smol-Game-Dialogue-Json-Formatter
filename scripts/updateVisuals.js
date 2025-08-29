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

    if (selectedInitialCharacter != "")
    {
        selectionInput.value = selectedInitialCharacter;
    }
}

function updateCharactersList(){
    let charactersList = document.getElementById("charactersList");
    charactersList.replaceChildren();

    if (selectedInitialCharacter == "") return;
    let characterIndex = 0;

    jsonObject.Data[selectedInitialCharacter].Characters.forEach((val) => {
        let newCharacter = document.createElement("li");
        newCharacter.textContent = characterIndex + ": " + val.Name + ", " + val.Expression + " (" + val.RootNodeName + ")";
        charactersList.appendChild(newCharacter);
        characterIndex++;
    });
}

function updateDialogueBlocksList()
{
    let selectionInput = document.getElementById("selectDialogueBlock");
    let pleaseSelectEntry = document.createElement("option");
    pleaseSelectEntry.text = "Please Select...";
    selectionInput.replaceChildren(pleaseSelectEntry);

    if (selectedInitialCharacter == "") return;

    Object.keys(jsonObject.Data[selectedInitialCharacter].Dialogues).forEach((val) => {
        let newChoice = document.createElement("option");
        newChoice.value = val;
        newChoice.text = val;
        selectionInput.appendChild(newChoice);
    });

    if (selectedDialogueBlock != -1)
    {
        selectionInput.value = selectedDialogueBlock;
    }
}

function updateChoicesList(){
    let choicesList = document.getElementById("choicesList");
    choicesList.replaceChildren();

    if (selectedDialogueBlock == -1 || selectedInitialCharacter == "") return;

    let choiceIndex = 0;

    jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices.forEach((val) => {
        let newChoice = document.createElement("li");
        newChoice.textContent = choiceIndex + ": " + val.Text + ", Destination: " + val.Destination;
        choicesList.appendChild(newChoice);
        choiceIndex++;
    });
}