function loadJson(event) {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!confirm("Are you sure you want to overwrite the current working dialog?")) return;

      const reader = new FileReader();

      reader.onload = e => {
          try {
            resolve(JSON.parse(e.target.result));
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
        sceneName = file.name.substring(0, file.name.lastIndexOf("."));;
    })
  }

function saveJson(event) {
  const jsonString = JSON.stringify(jsonObject, null, 4);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = sceneName + ".json";
  //document.body.appendChild(a); // Append to body (optional, but good practice for visibility if needed)
  a.click();
  //document.body.removeChild(a); // Remove after click if it was appended
  URL.revokeObjectURL(url);
}