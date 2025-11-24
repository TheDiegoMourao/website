document.querySelectorAll('.folder').forEach(folder => {

  let offsetX = 0, offsetY = 0;
  let isDragging = false;
  let hasMoved = false;   // NEW: track whether the folder moved
  let startX = 0, startY = 0;

  folder.addEventListener('mousedown', e => {
    if (window.innerWidth < 768) return;  // disable drag on mobile
    isDragging = true;
    hasMoved = false;

    startX = e.clientX;
    startY = e.clientY;

    offsetX = e.clientX - folder.offsetLeft;
    offsetY = e.clientY - folder.offsetTop;

    folder.style.transition = "none"; // no animation during drag
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    // If moved more than 3px, count as dragging
    if (dx > 3 || dy > 3) {
      hasMoved = true;
    }

    folder.style.left = (e.clientX - offsetX) + "px";
    folder.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;

    // If dragging happened → don't open the folder
    if (!hasMoved) {
      window.location.href = folder.dataset.link;
    }
  });
  
  
});

// inside your mousedown event:
