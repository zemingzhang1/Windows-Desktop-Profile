function generateExplorerHTML() {
  // Create a div to hold the explorer window
  const explorerDiv = document.createElement('div');
  explorerDiv.className = 'explorer_win';
  explorerDiv.id = 'explorerID';
  
  // Create the tool, icon, buttons, saves, address, and tabs divs
  const toolDiv = document.createElement('div');
  toolDiv.className = 'tool';
  toolDiv.id = 'toolID';
  explorerDiv.appendChild(toolDiv);
  
  const iconDiv = document.createElement('div');
  iconDiv.className = 'icon';
  iconDiv.id = 'iconID';
  explorerDiv.appendChild(iconDiv);
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';
  buttonsDiv.id = 'buttonsID';
  explorerDiv.appendChild(buttonsDiv);
  
  const savesDiv = document.createElement('div');
  savesDiv.className = 'saves';
  savesDiv.id = 'savesID';
  explorerDiv.appendChild(savesDiv);
  
  const addressDiv = document.createElement('div');
  addressDiv.className = 'address';
  addressDiv.id = 'addressID';
  
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.className = 'search';
  input.id = 'searchID';
  input.type = 'text';
  input.placeholder = 'Search...';
  form.appendChild(input);
  
  const button = document.createElement('button');
  button.className = 'url_submit';
  button.type = 'submit';
  button.textContent = 'Go';
  form.appendChild(button);
  
  addressDiv.appendChild(form);
  explorerDiv.appendChild(addressDiv);
  
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'tabs';
  tabsDiv.id = 'tabsID';
  explorerDiv.appendChild(tabsDiv);
  return explorerDiv;
}

function generateFooter(){
  // Create the first footer element
  const contianer = document.createElement('div');
  contianer.setAttribute('id', 'footerContID');
  
  const footer1Element = document.createElement('div');
  footer1Element.setAttribute('class', 'footer1');
  footer1Element.setAttribute('id', 'footer1ID');
  
  // Create the second footer element
  const footer2Element = document.createElement('div');
  footer2Element.setAttribute('class', 'footer2');
  footer2Element.setAttribute('id', 'footer2ID');

  contianer.appendChild(footer1Element);
  contianer.appendChild(footer2Element);
  
  return contianer;
}
