document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loadFromFile").addEventListener("change", onFileLoad);
});

async function onFileLoad(event){
    jsonObject = await loadJson(event);
    initiatingCharacterList = Object.keys(jsonObject.Data);
    updateInitializingCharactersList();
}