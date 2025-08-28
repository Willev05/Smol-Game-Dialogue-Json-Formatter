document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loadFromFile").addEventListener("change", onFileLoad);
    document.getElementById("addInitiatingCharacterBtn").addEventListener("click", onInitiatingCharacterAdded);
    document.getElementById("selectInitiatingCharacter").addEventListener("change", onInitiatingCharacterChanged);
    document.getElementById("addDialogueCharacterBtn").addEventListener("click", onDialogueCharacterAdded);
});

async function onFileLoad(event){
    jsonObject = await loadJson(event);
    initiatingCharacterList = Object.keys(jsonObject.Data);
    updateSceneName();
    updateInitializingCharactersList();
}

function onInitiatingCharacterAdded(event){
    let characterName = document.getElementById("initialCreatorInBox").value;
    if (Object.keys(jsonObject.Data).includes(characterName)){
        alert("Initiating character " + characterName + " is already in the list!");
        return;
    }

    let initiatingCharacterDialogue = {
        Characters: [],
        Dialogues: {}
    }

    jsonObject.Data[characterName] = initiatingCharacterDialogue;
    console.log(jsonObject);
    updateInitializingCharactersList();
}

function onInitiatingCharacterChanged(event){
    selectedInitialCharacter = document.getElementById("selectInitiatingCharacter").value;
    updateCharactersList();
}

function onDialogueCharacterAdded(event){
    let characterName = document.getElementById("characterCreatorNameInBox").value;
    let characterExpression = document.getElementById("characterCreatorExpressionInBox").value;
    let characterRootNodeName = document.getElementById("characterCreatorRootNodeNameInBox").value;

    let newCharacter = {
        RootNodeName: characterRootNodeName,
        Name: characterName,
        Expression: characterExpression
    }

    jsonObject.Data[selectedInitialCharacter].Characters.push(newCharacter);

    updateCharactersList();
}