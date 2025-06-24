document.getElementById('toggleEdit').addEventListener('click', async () => {
  const stored = await chrome.storage.local.get("editingEnabled");
  const newState = !(stored.editingEnabled || false);

  await chrome.storage.local.set({ editingEnabled: newState });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (enabled) => {
      document.designMode = enabled ? "on" : "off";
      alert(`Editing Mode ${enabled ? "Enabled" : "Disabled"}`);
    },
    args: [newState]
  });
});
