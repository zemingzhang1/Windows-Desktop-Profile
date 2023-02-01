function img_create(src, alt, title,id) {
  var img = document.createElement('img');
  img.src = src;
  img.id = id;
  console.log(title);
  if ( alt != null ) img.alt = alt;
  if ( title != null ) img.title = title;
  return img;
}

function div_create(col,row,info,img) {
  var div = document.createElement("div");
  div.style.cursor = "move";
  div.appendChild(img_create(img,col,row,info));
  div.innerHTML += info.toString();
  div.id = info.toString();
  return div;
}

function makeDraggable(item){
  var draggable = new PlainDraggable(item);
  draggable.snap = {step: 25};
  draggable.containment = {left: 0, top: 0, width: '180%', height: '180%'};
  return draggable;
}

let cells = {'Resume/CV':{'img':'images/message_file.png','running':false, 'src':'https://zays-gitlab.github.io/resume/'},'First Webpage':{'img':'images/url.png', 'running':false, 'src':'https://simple-data-a-simple-web-project-full-version.zaysgitlab.repl.co/'},'Statistical ML Final': {'img':'images/document.png', 'running':false, 'src':'https://me.zemingzhang.com/EAS508-Statistical-Learning/FINAL.html'},'Python Final PJ': {'img':'images/document.png', 'running':false, 'src':'https://me.zemingzhang.com/Team-14-EAS-503-Project/Credit%20Defaulter%20Analysis%20and%20Prediction.html'},'Stat ML Final PJ': {'img':'images/document.png', 'running':false, 'src':'https://me.zemingzhang.com/SIIM-ISIC-Melanoma-Classification/Melanoma'},'Linkedin Picture':{'img':'images/image_file.png', 'running':false,'src':'https://media.licdn.com/dms/image/C4E03AQH6-c88_w5uLA/profile-displayphoto-shrink_800_800/0/1643819722737?e=1680739200&v=beta&t=JZJZ-Yhl6CcD9l9zYx_riWOBILwvK02vODl2IEf0TE0'},'Testing Picture':{'img':'images/kodak_image.png', 'running':false,'src':'images/Subject.png'},'Internet Explorer':{'img':'images/internet.png', 'running':false, 'src':'https://www.openasapp.com/embedding-an-iframe-step-by-step/'}};

function load_cells(){
  cols = 1;
  rows = 1;
  disp = document.getElementById("display");
  
  for (const [key, value] of Object.entries(cells)) {
    info = key;
    img = value['img'];
    disp.appendChild(div_create(cols,rows,info,img));
    rows+=1;
  }
  
  for (const [key, value] of Object.entries(cells)) {
    info = key;
    b = document.getElementById(info);
    addClickEvent(b);
    makeDraggable(b);
  }
}







