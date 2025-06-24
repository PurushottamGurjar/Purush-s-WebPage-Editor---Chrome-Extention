chrome.storage.local.get("editingEnabled", (data) => {
  const isEnabled = data.editingEnabled || false;
  document.designMode = isEnabled ? "on" : "off";
});
