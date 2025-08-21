function updateInitializingCharactersList(){
    let selectionInput = document.getElementById("selectInitiatingCharacter");
    selectionInput.replaceChildren();

    initiatingCharacterList.forEach((val, i) => {
        let newChoice = document.createElement("option");
        newChoice.value = val;
        newChoice.text = val;
        selectionInput.appendChild(newChoice);
    })
}