chrome.action.onClicked.addListener(async (tab) => {
  const stored = await chrome.storage.local.get("editingEnabled");
  const currentState = stored.editingEnabled || false;

  const newState = !currentState;

  await chrome.storage.local.set({ editingEnabled: newState });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (enabled) => {
      document.designMode = enabled ? "on" : "off";
      alert(`Editing Mode ${enabled ? "Enabled" : "Disabled"}`);
    },
    args: [newState]
  });
});
