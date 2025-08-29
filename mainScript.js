document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loadFromFile").addEventListener("change", onFileLoad);
    document.getElementById("addInitiatingCharacterBtn").addEventListener("click", onInitiatingCharacterAdded);
    document.getElementById("selectInitiatingCharacter").addEventListener("change", onInitiatingCharacterChanged);
    document.getElementById("addDialogueCharacterBtn").addEventListener("click", onDialogueCharacterAdded);
    document.getElementById("saveToFile").addEventListener("click", saveJson);
    document.getElementById("sceneNameTextBox").addEventListener("change", onSceneNameChanged);
    document.getElementById("addDialogueBlockBtn").addEventListener("click", onDialogueBlockCreated);
    document.getElementById("selectDialogueBlock").addEventListener("change", onDialogueBlockChanged);
    document.getElementById("addDialogueChoiceBtn").addEventListener("click", onDialogueChoiceCreated);
    document.getElementById("delInitiatingCharacterBtn").addEventListener("click", onInitiatingCharacterDeleted);
    document.getElementById("delDialogueCharacterBtn").addEventListener("click", onDialogueCharacterDeleted);
    document.getElementById("delDialogueBlockBtn").addEventListener("click", onDialogueBlockDeleted);
    document.getElementById("delDialogueChoiceBtn").addEventListener("click", onDialogueChoiceDeleted);
});

function checkIfStillExist()
{
    try 
    {
        jsonObject.Data[selectedInitialCharacter].Characters;
    }
    catch (e)
    {
        selectedInitialCharacter = "";
        selectedDialogueBlock = -1;

        updateInitializingCharactersList();
        updateCharactersList();
        updateDialogueBlocksList();
        updateChoicesList();

        return;
    }

    try 
    {
        jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices;
    }
    catch (e)
    {
        selectedDialogueBlock = -1;

        updateDialogueBlocksList();
        updateChoicesList();

        return;
    }
}

async function onFileLoad(event){
    jsonObject = await loadJson(event);
    initiatingCharacterList = Object.keys(jsonObject.Data);
    updateSceneName();
    updateInitializingCharactersList();
    //console.log(jsonObject);
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
    updateDialogueBlocksList();
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

function onSceneNameChanged(event)
{
    sceneName = event.target.value;
}

function onDialogueBlockCreated(event)
{
    let dialogueBlockID = document.getElementById("blockCreatorInBox").value;
    if (Object.keys(jsonObject.Data[selectedInitialCharacter].Dialogues).includes(dialogueBlockID)){
        alert("Dialogue block with ID " + dialogueBlockID + " is already in the list!");
        return;
    }

    let dialogueBlock = {
        Choices: [],
        Lines: []
    }

    jsonObject.Data[selectedInitialCharacter].Dialogues[dialogueBlockID] = dialogueBlock;
    console.log(jsonObject);
    updateDialogueBlocksList();
}

function onDialogueBlockChanged(event){
    selectedDialogueBlock = document.getElementById("selectDialogueBlock").value;
    updateChoicesList();
}

function onDialogueChoiceCreated(event)
{
    let choiceText = document.getElementById("choiceCreatorTextInBox").value;
    let choiceDestination = document.getElementById("choiceCreatorDestinationInBox").value;
    if (jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices.length >= 4){
        alert("There are already 4 choices in the list!");
        return;
    }

    let choice = {
        Text: choiceText,
        Destination: choiceDestination
    }

    jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices.push(choice);
    console.log(jsonObject);
    updateChoicesList();
}

function onInitiatingCharacterDeleted()
{
    let characterName = document.getElementById("initialDeleteInBox").value;
    if (!Object.keys(jsonObject.Data).includes(characterName)) 
    {
        alert("Initiating Character with this name does not exist!");
        //console.log(Object.keys(jsonObject.Data));
        return;
    }

    if (!confirm("Are you sure you want to delete this initiating chracter?")) return;

    delete jsonObject.Data[characterName];

    checkIfStillExist();
}

function onDialogueCharacterDeleted()
{
    let characterIndex = document.getElementById("characterDeleteInBox").value;
    if (jsonObject.Data[selectedInitialCharacter].Characters.length <= characterIndex) 
    {
        alert("Character with this index does not exist!");
        //console.log(Object.keys(jsonObject.Data));
        return;
    }

    if (!confirm("Are you sure you want to delete this dialogue chracter? The program wont check to see if they are referenced by any dialogue. PLEASE check yourself or add back.")) return;

    jsonObject.Data[selectedInitialCharacter].Characters.splice(characterIndex, 1);

    updateCharactersList();
}

function onDialogueBlockDeleted()
{
    let blockID = document.getElementById("blockDeleteInBox").value;
    if (!Object.keys(jsonObject.Data[selectedInitialCharacter].Dialogues).includes(blockID)) 
    {
        alert("Dialogue with this index does not exist!");
        //console.log(Object.keys(jsonObject.Data[selectedInitialCharacter].Dialogues));
        //console.log(blockID);
        return;
    }

    if (!confirm("Are you sure you want to delete this dialogue block? You wont get back the lines or choices.")) return;

    delete jsonObject.Data[selectedInitialCharacter].Dialogues[blockID];

    checkIfStillExist();

    updateDialogueBlocksList();
    updateChoicesList();
}

function onDialogueChoiceDeleted()
{
    let choiceIndex = document.getElementById("choiceDeleteInBox").value;
    if (jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices.length <= choiceIndex) 
    {
        alert("Choice with this index does not exist!");
        //console.log(Object.keys(jsonObject.Data));
        return;
    }

    if (!confirm("Are you sure you want to delete this dialogue choice?")) return;

    jsonObject.Data[selectedInitialCharacter].Dialogues[selectedDialogueBlock].Choices.splice(choiceIndex, 1);

    updateChoicesList();
}