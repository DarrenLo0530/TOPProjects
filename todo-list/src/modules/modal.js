function attachModalListeners() {
  const modals = document.querySelectorAll('.modal');

  modals.forEach((modal) => {
    const modalButton = document.querySelector(`[data-toggle=${modal.id}]`);
    modalButton.onclick = () => { modal.style.display = 'flex'; };

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

export default attachModalListeners;
