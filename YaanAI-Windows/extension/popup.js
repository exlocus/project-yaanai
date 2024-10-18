function saveSelectedModel() {
  const modelSelect = document.getElementById('modelSelect');
  chrome.storage.sync.set({ selectedModel: modelSelect.value });
}

function restoreSelectedModel() {
  chrome.storage.sync.get('selectedModel', (data) => {
      const modelSelect = document.getElementById('modelSelect');
      modelSelect.value = data.selectedModel || 'gpt_4o';
  });
}

document.getElementById('autoSolve').addEventListener('change', function() {
  chrome.storage.sync.set({ autoSolve: this.checked });
});

chrome.storage.sync.get('autoSolve', (data) => {
  document.getElementById('autoSolve').checked = data.autoSolve;
});

document.getElementById('modelSelect').addEventListener('change', saveSelectedModel);

window.addEventListener('load', restoreSelectedModel);
