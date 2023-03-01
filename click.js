function addClickEvent(div){
  div.addEventListener("dblclick", (event) => {
    console.log(event.target.id);
    open(event);
  });
}

function makeDisp(content){
  const form = document.createElement('div');
  form.className = 'form windows js-windows windows-form';
  form.id = 'form';
  
  const header = document.createElement('header');
  header.className = 'js-winheader windows-header';
  header.style = 'padding-right:3px;';
  
  const title = document.createElement('span');
  title.id = 'title';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'windows-button';
  closeButton.style = 'padding:0; height:16px;width:16px;position:relative;';
  
  const closeImage = document.createElement('img');
  closeImage.src = 'images/close-icon.png';
  closeImage.style = 'position:absolute;left:1px;top:0px;';
    
  const sizeButton = document.createElement('button');
  sizeButton.className = 'windows-button';
  sizeButton.style = 'padding:0; height:16px;width:16px;position:relative;margin-right:3px;';
  
  const sizeImage = document.createElement('img');
  sizeImage.src = 'images/full.png';
  sizeImage.style = 'position:absolute;left:0px;top:1px;';

  const minButton = document.createElement('button');
  minButton.className = 'windows-button';
  minButton.style = 'padding:0; height:16px;width:16px;position:relative;margin-right:3px;';
  
  const minImage = document.createElement('img');
  minImage.src = 'images/min.png';
  minImage.style = 'position:absolute;left:1px;top:1px;';
  
  closeButton.appendChild(closeImage);
  sizeButton.appendChild(sizeImage);
  minButton.appendChild(minImage);
  header.appendChild(title);
  header.appendChild(closeButton);
  header.appendChild(sizeButton);
  header.appendChild(minButton);

  const contentContainer = document.createElement('div');
  contentContainer.className = 'form-content';
  contentContainer.style = 'height:100%;';
  
  const iconWrap = document.createElement('div');
  iconWrap.className = 'icon-wrap';
  
  const outerContainer = document.createElement('div');
  outerContainer.className = 'icon-outer-container';
  
  const innerContainer = document.createElement('div');
  innerContainer.className = 'icon-inner-container';
  innerContainer.id = 'content';
  innerContainer.style = 'padding: 1px; text-align:center;';
  
  innerContainer.appendChild(content);
  outerContainer.appendChild(innerContainer);
  iconWrap.appendChild(outerContainer);
  contentContainer.appendChild(generateExplorerHTML());
  contentContainer.appendChild(iconWrap);
  contentContainer.appendChild(generateFooter());
  form.appendChild(header);
  form.appendChild(contentContainer);
  
  return [form, closeButton, sizeButton, minButton, content];
}

function makePDF(src){
  const embed = document.createElement('embed');
  embed.src = src;
  embed.style.width = "425px";
  embed.style.height = "250px";
  return embed;
}

function addFullScreen(sizeButton, draggable, embed) {
  sizeButton.onclick = () => {
    const parentDiv = sizeButton.parentNode.parentNode.parentNode;
    const buttonImage = sizeButton.querySelector("img");
    if (buttonImage.src.includes("full.png")){
      cells[parentDiv.id]['shape']['left'] = draggable.left;
      cells[parentDiv.id]['shape']['top'] = draggable.top;
      cells[parentDiv.id]['shape']['width'] = embed.style.width;
      cells[parentDiv.id]['shape']['height'] = embed.style.height;    
      draggable.left = 0;
      draggable.top = 25;
      embed.style.width = (display_full.offsetWidth - 50) + "px";
      embed.style.height = (display_full.offsetHeight- 172) + "px";
      const buttonImage = sizeButton.querySelector("img");
      buttonImage.src = "images/shrink.png";
    }
    else{
      draggable.left = cells[parentDiv.id]['shape']['left'];
      draggable.top = cells[parentDiv.id]['shape']['top'];
      embed.style.width = cells[parentDiv.id]['shape']['width'];
      embed.style.height = cells[parentDiv.id]['shape']['height'];
      buttonImage.src = "images/full.png";
    }
  };
}

function addExit(closeButton){
  closeButton.onclick = () => {
    const parentDiv = closeButton.parentNode.parentNode.parentNode;
    cells[parentDiv.id]['running'] = false;
    parentDiv.parentNode.removeChild(parentDiv);
    deleteSmallBar(parentDiv.id + " smallBar ID");
  };
}

function addMin(minButton) {
  minButton.onclick = () => {
    const parentDiv = minButton.parentNode.parentNode.parentNode;
    parentDiv.style.display = "none";
  };
}

function open(event) {
  const curID = event.target.id.replace(/ Icon/g, "");
  if (!cells[curID]['running']){
    if (curID == 'First Webpage'){
      showSign("It may take some time for the webpage to fully load. [about 30 seconds to 1 minute]");
    }
    const src = cells[curID]['src'];
    const embed = makePDF(src);
    const contentDisp = makeDisp(embed);
    const disp = contentDisp[0];
    const closeButton = contentDisp[1]; 
    const fullScreenButton = contentDisp[2];
    const minButton = contentDisp[3];
    const content = contentDisp[4];
    
    addMin(minButton);
    
    const div = document.createElement("div");

    div.id = curID;
    div.style.position = "absolute";
    div.appendChild(disp);
    
    const resizableContent = makeResizable(div);
    const resizable = resizableContent[0];
    const resizers = resizableContent[1];
    
    document.getElementById("display_full").appendChild(resizable);
    const draggable = makeDraggable(resizable);
    const icon = cells[curID]["icon"];
    const smBar = generateSmallBar(curID + " smallBar ID", icon, curID);
    unMin(smBar);
    addExit(closeButton);
    addFullScreen(fullScreenButton, draggable, content);
    makeDivResizable(resizable, content, draggable);
    
    cells[curID]['running'] = true;
  }
}
