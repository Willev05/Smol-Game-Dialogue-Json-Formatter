document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loadFromFile").addEventListener("change", onFileLoad);
    document.getElementById("addInitiatingCharacterBtn").addEventListener("click", onInitiatingCharacterAdded);
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

    let dialogueBlock = {
        Characters: [],
        Dialogues: {}
    }

    jsonObject.Data[characterName] = dialogueBlock;
    console.log(jsonObject);
    updateInitializingCharactersList();
}