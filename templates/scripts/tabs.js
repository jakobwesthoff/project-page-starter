document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    const tabs = button.closest('.tabs');
    tabs.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    tabs.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    button.classList.add('active');
    tabs.querySelector(`.tab-panel[data-tab="${tab}"]`).classList.add('active');
  });
});
