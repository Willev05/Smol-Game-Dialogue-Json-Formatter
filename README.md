# Smol Game Dialogue Editor
A dialogue editor for my project smol game, written in javascript. 
The user interface is not a priority for now, and probably wont ever be.\

Access online [here](https://willev05.github.io/Smol-Game-Dialogue-Json-Formatter/).

## How to use this tool
Simply import a json dialogue file. If an older file format version was imported, the program will update it automatically. 
From there, you can start modifying the dialogue. \
\
Select an initiating character, and from there you can modify the dialogue. You can add characters to the list if you want them to be able to speak in this context. You can also modify a dialogue block by typing in text and specifying who is talking.

### What is the scene name?
Simply the Godot scene root node name with which the dialogue is linked with. Every file contains the dialogue for one specific scene. 

### What is initiating character?
This is the Godot node name for the character which you are interacting with to begin conversation. Select a specific initiating character to view their possible dialogue.

### What is characters?
This is the list of all characters which can be part of conversation initiated by the currently selected initiating character. Each entry will contain the display name, the character's node name and the expression. The latter 2 are for getting the portrait model. 
The display name can be different from the character's actual name (thanks to the node name) and the expression can be modified to load a different portrait. If you want to have the same character with a differing portrait, you have to create a new entry with a different expression.
Example:\
`Characters: [
{Name: "Test Character", CharacterNodeName: "TestNPC", Expression: "Neutral"},
{Name: "Test Character", CharacterNodeName: "TestNPC", Expression: "Sad"}
]`

### What is dialogues?
This is a dictionary of all possible dialogues, for this initiating character, in this scene. Each entry in this dictionary will link to an array, containing the lines for this specific dialogue. The key is simply an identifier for use in the code. 
Each line of dialogue contains CharacterIndex, the 0 based index for the speaking character and the Text, simply the words being spoken.
