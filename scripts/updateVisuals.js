function updateSceneName(){
    let textBox = document.getElementById("sceneNameTextBox");
    textBox.value = sceneName;
}

function updateInitializingCharactersList(){
    let selectionInput = document.getElementById("selectInitiatingCharacter");
    selectionInput.replaceChildren();

    Object.keys(jsonObject.Data).forEach((val, i) => {
        let newChoice = document.createElement("option");
        newChoice.value = val;
        newChoice.text = val;
        selectionInput.appendChild(newChoice);
    });
}