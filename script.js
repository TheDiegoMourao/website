document.querySelectorAll('.folder').forEach(folder => {

  let offsetX = 0, offsetY = 0;
  let isDragging = false;
  let hasMoved = false;
  let startX = 0, startY = 0;

  // -------------------------------------------
  // MOBILE: Tap opens folder, no drag at all
  // -------------------------------------------
  if (window.innerWidth < 768) {
    folder.addEventListener("click", () => {
      window.location.href = folder.dataset.link;
    });
    return; // Do NOT attach desktop drag events
  }

  // -------------------------------------------
  // DESKTOP: Drag + safe click logic
  // -------------------------------------------
  folder.addEventListener('mousedown', e => {
    isDragging = true;
    hasMoved = false;

    startX = e.clientX;
    startY = e.clientY;

    offsetX = e.clientX - folder.offsetLeft;
    offsetY = e.clientY - folder.offsetTop;

    folder.style.transition = "none";
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    if (dx > 3 || dy > 3) {
      hasMoved = true;
    }

    folder.style.left = (e.clientX - offsetX) + "px";
    folder.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;

    // Click (no drag)
    if (!hasMoved) {
      window.location.href = folder.dataset.link;
      return;
    }

    // Snap back to original position on desktop
    folder.style.transition = "0.25s ease";
    folder.style.left = folder.dataset.originalLeft;
    folder.style.top = folder.dataset.originalTop;
  });

});
