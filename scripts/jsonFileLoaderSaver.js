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
        sceneName = file.name;
    })
    }