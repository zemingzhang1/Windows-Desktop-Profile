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
    
  const questionButton = document.createElement('button');
  questionButton.className = 'windows-button';
  questionButton.style = 'padding:0; height:16px;width:16px;position:relative;margin-right:3px;';
  
  const questionImage = document.createElement('img');
  questionImage.src = 'images/question-icon1.png';
  questionImage.style = 'position:absolute;left:1px;top:0px;';

  closeButton.appendChild(closeImage);
  questionButton.appendChild(questionImage);
  header.appendChild(title);
  header.appendChild(closeButton);
  header.appendChild(questionButton);
  
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
  contentContainer.appendChild(iconWrap);
  form.appendChild(header);
  form.appendChild(contentContainer);
  
  return [form, questionButton, closeButton, content];
}

function makePDF(src){
  const embed = document.createElement('embed');
  embed.src = src;
  embed.style.width = "425px";
  embed.style.height = "250px";
  return embed;
}

function addFullScreen(questionButton, draggable, embed) {
  questionButton.onclick = () => {
    draggable.left = 0;
    draggable.top = 25;
    embed.style.width = (display_full.offsetWidth - 50) + "px";
    embed.style.height = (display_full.offsetHeight- 90) + "px";
  }; 
}

function addExit(closeButton){
  closeButton.onclick = () => {
    const parentDiv = closeButton.parentNode.parentNode.parentNode;
    cells[parentDiv.id]['running'] = false;
    parentDiv.parentNode.removeChild(parentDiv);
  };
}

function open(event) {
  if (!cells[event.target.id]['running']){
    const src = cells[event.target.id]['src'];
    const embed = makePDF(src);
    const contentDisp = makeDisp(embed);
    const disp = contentDisp[0];
    const fullScreenButton = contentDisp[1]; 
    const closeButton = contentDisp[2];
    const content = contentDisp[3];
    
    const div = document.createElement("div");
    div.id = event.target.id;
    div.style.position = "absolute";
    div.appendChild(disp);
    
    const resizableContent = makeResizable(div);
    const resizable = resizableContent[0];
    const resizers = resizableContent[1];
    
    document.getElementById("display_full").appendChild(resizable);
    const draggable = makeDraggable(resizable);
    
    addExit(closeButton);
    addFullScreen(fullScreenButton, draggable, content);
    makeDivResizable(resizable, content, draggable);
    
    cells[event.target.id]['running'] = true;
  }
}
