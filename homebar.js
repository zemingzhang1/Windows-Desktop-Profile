function generateSmallBar(id, img, name) {
  let parentDiv = document.getElementsByClassName('small_icons_bars_container')[0];
  let newElement = document.createElement('div');
  newElement.setAttribute('class', 'small_icons_bars');
  newElement.setAttribute('id', id);
  
  const icon = document.createElement('img');
  icon.className = 'icon_img';
  icon.src = img;
  
  let text = document.createElement('div');
  text.className = 'ellipsis-text';
  text.textContent = name;
  
  newElement.appendChild(icon);
  newElement.appendChild(text);
  parentDiv.appendChild(newElement);
  return newElement;
}

function unMin(smBar){
  smBar.onclick = () => {
    const curId = smBar.id.replace(/ smallBar ID/g, "");    
    const parentDiv = document.getElementById(curId);
    if (parentDiv.style.display === "none") {
      parentDiv.style.display = "block";
    }
    else {
      parentDiv.style.display = "none";
    }
  };
}


function deleteSmallBar(id){
  let parentDiv = document.getElementsByClassName('small_icons_bars_container')[0];
  // Get the child div element to be removed
  const childDiv = document.getElementById(id);
  // Remove the child div element from the parent div
  parentDiv.removeChild(childDiv);
}