function makeDivResizable(div, embed, draggable) {
  const resizers = div.querySelectorAll('.resizer')[0];
  const element = embed;
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  const currentResizer = resizers;
  
  currentResizer.addEventListener('mousedown', function(e) {
    e.stopPropagation();
    original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  })
  
  function resize(e) {
    if (currentResizer.classList.contains('bottom-right')) {
      const width = original_width + (e.pageX - original_mouse_x);
      const height = original_height + (e.pageY - original_mouse_y);
      if (width > minimum_size) {
        element.style.width = width + 'px';
        // draggable.style.width = width + 'px';
      }
      if (height > minimum_size) {
        element.style.height = height + 'px';
        // draggable.style.height = height + 'px';
      }
    }
  }
  
  function stopResize() {
    window.removeEventListener('mousemove', resize)
  }
  // draggable.position();
}

function makeResizable(div){
  const resizable = div;
  resizable.classList.add('resizable');
  
  const resizers = document.createElement('div');
  resizers.classList.add('resizers');
  
  const bottomRight = document.createElement('div');
  bottomRight.classList.add('resizer', 'bottom-right');
  
  // add the style to the divs 
  resizable.style.top = '0px';
  resizable.style.left = '0px';
  bottomRight.style.width = '8px';
  bottomRight.style.height = '8px';
  bottomRight.style.borderRadius = '0%';
  bottomRight.style.background = 'white';
  bottomRight.style.border = '2px solid #4286f4';
  bottomRight.style.position = 'absolute';
  bottomRight.style.right = '2px';
  bottomRight.style.bottom = '2px';
  bottomRight.style.cursor = 'nwse-resize';
  bottomRight.style.zIndex = '1';
  

  resizers.appendChild(bottomRight);
  resizable.appendChild(resizers);
  
  return [resizable, resizers, bottomRight];
}

  

